"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import type { RosaryElement } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

interface RosaryVisualizerProps {
  rosaryElements: RosaryElement[]
  currentStepId: string
  onBeadClick: (stepId: string) => void
}

export function RosaryVisualizer({ rosaryElements, currentStepId, onBeadClick }: RosaryVisualizerProps) {
  const [isClient, setIsClient] = useState(false)
  const circleContainerRef = useRef<HTMLDivElement>(null)
  const [radius, setRadius] = useState(80)

  useEffect(() => {
    setIsClient(true)

    const updateRadius = () => {
      if (circleContainerRef.current) {
        const containerWidth = circleContainerRef.current.offsetWidth
        // Set radius to be slightly less than half the container width to account for bead size
        setRadius(containerWidth / 2 - 20)
      }
    }

    // Initial radius calculation
    updateRadius()

    // Use ResizeObserver to update radius on container resize
    const resizeObserver = new ResizeObserver(updateRadius)
    if (circleContainerRef.current) {
      resizeObserver.observe(circleContainerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const enhancedMainBeads = useMemo(() => {
    const mainBeadsSource = rosaryElements.filter((el) => el.type === "mystery" || el.type === "hail-mary")
    const mainBeads = mainBeadsSource.filter((bead, index, self) => index === self.findIndex((b) => b.id === bead.id))

    const m1Index = mainBeads.findIndex((bead) => bead.id === "M1/Final")
    const rotatedBeads = m1Index !== -1 ? [...mainBeads.slice(m1Index), ...mainBeads.slice(0, m1Index)] : mainBeads

    const enhancedBeads: RosaryElement[] = []
    for (const currentBead of rotatedBeads) {
      if (currentBead.type === "mystery") {
        enhancedBeads.push({ id: `spacer-before-${currentBead.id}`, type: "spacer", title: "", content: [] })
      }
      enhancedBeads.push(currentBead)
      if (currentBead.type === "mystery") {
        enhancedBeads.push({ id: `spacer-after-${currentBead.id}`, type: "spacer", title: "", content: [] })
      }
    }
    return enhancedBeads
  }, [rosaryElements])

  const renderBead = (element: RosaryElement) => {
    const isActive = element.id === currentStepId
    let beadClasses = ""

    if (element.type === "spacer") {
      // Spacers are invisible and non-interactive
      return <div key={element.id} className="w-1.5 h-1.5" />
    }

    switch (element.type) {
      case "cross":
        beadClasses =
          "w-7 h-7 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-sm font-normal relative shadow-lg"
        break
      case "mystery":
        beadClasses = "w-5 h-5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
        break
      case "stem":
        beadClasses = "w-3.5 h-3.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
        break
      case "hail-mary":
        beadClasses = "w-1.5 h-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
        break
      default:
        beadClasses = "w-2.5 h-2.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
        break
    }

    if (isActive) {
      beadClasses += " bg-[#FFE552] border-[#FFE552] text-gray-800 scale-125"
    } else {
      beadClasses += " bg-white/20 border-white/40 hover:bg-white/30 text-gray-300"
    }

    return (
      <div key={element.id} className={beadClasses} onClick={() => onBeadClick(element.id)} title={element.title}>
        {element.type === "cross" && (
          <div className="relative">
            <div className="absolute w-0.5 h-4 bg-current left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="absolute w-3 h-0.5 bg-current left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-0.5 rounded-full"></div>
          </div>
        )}
      </div>
    )
  }

  if (!isClient) {
    return (
      <div className="lg:w-[35%] flex items-center justify-center p-4">
        <Skeleton className="w-full h-[500px] lg:h-[600px] rounded-xl" />
      </div>
    )
  }

  return (
    <div className="lg:w-[35%] flex items-center justify-center">
      <div className="relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl w-full max-w-md mx-auto">
        <div className="relative z-10 px-4 py-8 min-h-[550px] lg:min-h-[600px] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div
              ref={circleContainerRef}
              className="relative w-[70vw] h-[70vw] max-w-[220px] max-h-[220px] sm:w-60 sm:h-60"
            >
              <div className="absolute inset-0">
                {enhancedMainBeads.map((element, index) => {
                  const totalBeads = enhancedMainBeads.length
                  // Position M1/Final (at index 1 after spacer) at the bottom (+90deg or +PI/2) and flow clockwise
                  const angle = ((index - 1) / totalBeads) * 2 * Math.PI + Math.PI / 2

                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <div
                      key={element.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                    >
                      {renderBead(element)}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 -mt-2">
              {rosaryElements.filter((el) => el.type === "stem").reverse().map(renderBead)}
            </div>

            <div className="flex justify-center mt-4">
              {rosaryElements.filter((el) => el.type === "cross").map(renderBead)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
