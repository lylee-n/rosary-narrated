"use client"

import type { RosaryElement } from "@/types"

interface RosaryVisualizerProps {
  rosaryElements: RosaryElement[]
  currentStepId: string
  onBeadClick: (stepId: string) => void
}

export function RosaryVisualizer({ rosaryElements, currentStepId, onBeadClick }: RosaryVisualizerProps) {
  const renderBead = (element: RosaryElement, index: number) => {
    const isActive = element.id === currentStepId
    const isCompleted = false // You might want to track completed steps

    let beadClasses = "w-1.5 h-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"

    if (element.type === "cross") {
      beadClasses =
        "w-7 h-7 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-white text-sm font-normal relative shadow-lg"
    } else if (element.type === "mystery") {
      beadClasses = "w-5 h-5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
    } else if (element.type === "stem") {
      beadClasses = "w-3.5 h-3.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
    } else if (element.type === "spacer") {
      beadClasses =
        "w-1.5 h-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110 bg-transparent border-transparent opacity-30"
    }

    if (isActive) {
      beadClasses += " bg-[#FFE552] border-[#FFE552] text-black scale-125"
    } else if (isCompleted) {
      if (element.type !== "spacer") {
        beadClasses += " bg-green-500 border-green-500"
      }
    } else {
      if (element.type !== "spacer") {
        beadClasses += " bg-white/20 border-white/40 hover:bg-white/30"
      }
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

  const getEnhancedRosaryElements = () => {
    const mainBeads = rosaryElements.filter((el) => el.type === "mystery" || el.type === "hail-mary")
    const enhancedBeads: RosaryElement[] = []

    for (let i = 0; i < mainBeads.length; i++) {
      const currentBead = mainBeads[i]

      if (currentBead.type === "mystery") {
        const prevDecade = currentBead.id.startsWith("M1") ? "5" : String(Number.parseInt(currentBead.id.charAt(1)) - 1)
        enhancedBeads.push({
          id: `${prevDecade}.11`,
          type: "spacer" as const,
          title: `Spacer before ${currentBead.id}`,
          content: [],
        })
      }

      enhancedBeads.push(currentBead)

      if (currentBead.type === "mystery") {
        const currentDecade = currentBead.id.charAt(1)
        enhancedBeads.push({
          id: `${currentDecade}.0`,
          type: "spacer" as const,
          title: `Spacer after ${currentBead.id}`,
          content: [],
        })
      }
    }

    return enhancedBeads
  }

  const enhancedMainBeads = getEnhancedRosaryElements()

  return (
    <div className="lg:w-[35%] flex items-center justify-center">
      <div className="relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
        <div className="relative z-10 px-6 py-8 h-[650px] lg:h-[600px] transform rotate-180 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-center mb-4">
              {rosaryElements
                .filter((el) => el.type === "cross")
                .map((element, index) => (
                  <div key={element.id} className="transform rotate-180">
                    {renderBead(element, index)}
                  </div>
                ))}
            </div>

            <div className="flex flex-col items-center space-y-2 mb-6">
              {rosaryElements
                .filter((el) => el.type === "stem")
                .map((element, index) => (
                  <div key={element.id} className="transform rotate-180">
                    {renderBead(element, index)}
                  </div>
                ))}
            </div>

            <div className="relative w-44 h-44">
              <div className="absolute inset-0">
                {enhancedMainBeads.map((element, index) => {
                  const totalBeads = enhancedMainBeads.length
                  const m1Index = enhancedMainBeads.findIndex((bead) => bead.id === "M1")

                  // Calculate the angle for each bead, with M1 positioned at the top.
                  // We treat M1 as the starting point (index 0) for the angle calculation.
                  const effectiveIndex = (index - (m1Index !== -1 ? m1Index : 0) + totalBeads) % totalBeads
                  const angle = (effectiveIndex / totalBeads) * 2 * Math.PI - Math.PI / 2

                  const radius = 75
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <div
                      key={element.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 rotate-180"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                    >
                      {renderBead(element, index)}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 mt-6">
              {rosaryElements
                .filter((el) => el.type === "final")
                .map((element, index) => (
                  <div key={element.id} className="transform rotate-180">
                    {renderBead(element, index)}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
