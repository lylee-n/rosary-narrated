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

    // Default size for Hail Mary beads - reduced to prevent overlap
    let beadClasses = "w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110"

    if (element.type === "cross") {
      // Minimalist cross styling
      beadClasses =
        "w-6 h-8 cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-white text-base font-normal relative"
    } else if (element.type === "mystery") {
      beadClasses = "w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110"
    } else if (element.type === "stem") {
      beadClasses = "w-3.5 h-3.5 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110"
    }

    if (isActive) {
      beadClasses += " bg-[#FFE552] border-[#FFE552] text-black scale-125"
    } else if (isCompleted) {
      beadClasses += " bg-green-500 border-green-500"
    } else {
      beadClasses += " bg-white/20 border-white/40 hover:bg-white/30"
    }

    return (
      <div key={element.id} className={beadClasses} onClick={() => onBeadClick(element.id)} title={element.title}>
        {element.type === "cross" && (
          <div className="relative">
            {/* Minimalist cross - vertical line */}
            <div className="absolute w-0.5 h-5 bg-current left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            {/* Minimalist cross - horizontal line */}
            <div className="absolute w-3 h-0.5 bg-current left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-1"></div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="lg:w-[35%] flex items-center justify-center">
      {/* Container with dark overlay and blur matching prayer card - extended height */}
      <div className="relative rounded-lg overflow-hidden">
        {/* Dark overlay and blur background */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md rounded-lg" />

        {/* Rosary content - flipped upside down so cross is at bottom - extended container height */}
        <div className="relative z-10 px-6 py-8 h-[650px] lg:h-[600px] transform rotate-180 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Cross - now at bottom due to rotation */}
            <div className="flex justify-center mb-4">
              {rosaryElements
                .filter((el) => el.type === "cross")
                .map((element, index) => (
                  <div key={element.id} className="transform rotate-180">
                    {renderBead(element, index)}
                  </div>
                ))}
            </div>

            {/* Stem beads (3 Hail Marys + 1 Our Father) */}
            <div className="flex flex-col items-center space-y-2 mb-6">
              {rosaryElements
                .filter((el) => el.type === "stem")
                .map((element, index) => (
                  <div key={element.id} className="transform rotate-180">
                    {renderBead(element, index)}
                  </div>
                ))}
            </div>

            {/* Main rosary loop - adjusted radius to fit better */}
            <div className="relative w-44 h-44">
              {/* Circular arrangement of decades */}
              <div className="absolute inset-0">
                {rosaryElements
                  .filter((el) => el.type === "mystery" || el.type === "hail-mary")
                  .map((element, index) => {
                    const totalBeads = rosaryElements.filter(
                      (el) => el.type === "mystery" || el.type === "hail-mary",
                    ).length
                    const angle = (index / totalBeads) * 2 * Math.PI - Math.PI / 2
                    const radius = 75 // Slightly reduced radius
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

            {/* Final prayers */}
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
