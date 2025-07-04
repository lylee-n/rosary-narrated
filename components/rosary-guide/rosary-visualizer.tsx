"use client"

import type { RosaryElement } from "@/types"

interface RosaryVisualizerProps {
  rosaryElements: RosaryElement[]
  currentStepId: string
  onBeadClick: (stepId: string) => void
}

export function RosaryVisualizer({ rosaryElements, currentStepId, onBeadClick }: RosaryVisualizerProps) {
  const renderBead = (element: RosaryElement) => {
    const isActive = element.id === currentStepId
    let beadClasses = ""

    switch (element.type) {
      case "cross":
        beadClasses =
          "w-7 h-7 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-white text-sm font-normal relative shadow-lg"
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
      case "spacer":
        // Spacers are non-interactive and invisible
        beadClasses = "w-1.5 h-1.5 rounded-full bg-transparent border-transparent"
        break
      default:
        beadClasses = "w-2.5 h-2.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
        break
    }

    if (isActive) {
      beadClasses += " bg-[#FFE552] border-[#FFE552] text-black scale-125"
    } else if (element.type !== "spacer") {
      beadClasses += " bg-white/20 border-white/40 hover:bg-white/30"
    }

    return (
      <div
        key={element.id}
        className={beadClasses}
        onClick={element.type !== "spacer" ? () => onBeadClick(element.id) : undefined}
        title={element.type !== "spacer" ? element.title : ""}
      >
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
    const mainBeadsSource = rosaryElements.filter((el) => el.type === "mystery" || el.type === "hail-mary")
    const mainBeads = mainBeadsSource.filter((bead, index, self) => index === self.findIndex((b) => b.id === bead.id))

    // Find M1 and rotate the array to start with it. This is a more robust way to handle positioning.
    const m1Index = mainBeads.findIndex((bead) => bead.id === "M1/Final")
    const rotatedBeads = m1Index !== -1 ? [...mainBeads.slice(m1Index), ...mainBeads.slice(0, m1Index)] : mainBeads

    const enhancedBeads: RosaryElement[] = []

    for (const currentBead of rotatedBeads) {
      if (currentBead.type === "mystery") {
        enhancedBeads.push({
          id: `spacer-before-${currentBead.id}`,
          type: "spacer" as const,
          title: "",
          content: [],
        })
      }

      enhancedBeads.push(currentBead)

      if (currentBead.type === "mystery") {
        enhancedBeads.push({
          id: `spacer-after-${currentBead.id}`,
          type: "spacer" as const,
          title: "",
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
                .map((element) => (
                  <div key={element.id} className="transform rotate-180">
                    {renderBead(element)}
                  </div>
                ))}
            </div>

            <div className="flex flex-col items-center space-y-2 mb-6">
              {rosaryElements
                .filter((el) => el.type === "stem")
                .map((element) => (
                  <div key={element.id} className="transform rotate-180">
                    {renderBead(element)}
                  </div>
                ))}
            </div>

            <div className="relative w-44 h-44">
              <div className="absolute inset-0">
                {enhancedMainBeads.map((element, index) => {
                  const totalBeads = enhancedMainBeads.length
                  // The array is now rotated, so M1 is at index 1 (after its spacer).
                  // We position the bead at index 1 at the top of the circle (-90deg).
                  const angle = ((index - 1) / totalBeads) * 2 * Math.PI - Math.PI / 2

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
                      {renderBead(element)}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 mt-6">
              {rosaryElements
                .filter((el) => el.type === "final")
                .map((element) => (
                  <div key={element.id} className="transform rotate-180">
                    {renderBead(element)}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
