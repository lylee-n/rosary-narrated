"use client"

import type { RosaryElement } from "@/types"

interface RosaryVisualizerProps {
  rosaryElements: RosaryElement[]
  currentStepId: string
  onBeadClick: (stepId: string) => void
}

export function RosaryVisualizer({ rosaryElements, currentStepId, onBeadClick }: RosaryVisualizerProps) {
  // Helper function to check if a bead is one of the specifically affected beads
  const isAffectedBead = (id: string): boolean => {
    const affectedBeads = [
      "1.1",
      "1.10",
      "2.1",
      "2.10",
      "3.1",
      "3.10",
      "4.1",
      "4.10",
      "5.1",
      "5.10",
      "M1",
      "M2",
      "M3",
      "M4",
      "M5",
    ]
    return affectedBeads.includes(id)
  }

  const renderBead = (element: RosaryElement, index: number) => {
    const isActive = element.id === currentStepId
    const isCompleted = false // You might want to track completed steps

    // Halved size for Hail Mary beads - reduced to prevent overlap
    let beadClasses = "w-1.5 h-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"

    if (element.type === "cross") {
      // Circular cross styling with thinner border
      beadClasses =
        "w-7 h-7 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-white text-sm font-normal relative"
    } else if (element.type === "mystery") {
      beadClasses = "w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110"
    } else if (element.type === "stem") {
      // Thinner border for stem beads
      beadClasses = "w-3.5 h-3.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
    }

    if (isActive) {
      // Cross should also be yellow when active
      if (element.type === "cross") {
        beadClasses += " bg-[#FFE552] border-[#FFE552] text-black scale-125"
      } else {
        beadClasses += " bg-[#FFE552] border-[#FFE552] text-black scale-125"
      }
    } else if (isCompleted) {
      beadClasses += " bg-green-500 border-green-500"
    } else {
      if (element.type === "cross") {
        beadClasses += " bg-white/20 border-white/40 hover:bg-white/30"
      } else {
        beadClasses += " bg-white/20 border-white/40 hover:bg-white/30"
      }
    }

    return (
      <div key={element.id} className={beadClasses} onClick={() => onBeadClick(element.id)} title={element.title}>
        {element.type === "cross" && (
          <div className="relative">
            {/* Vector-style minimalist cross in circle */}
            <div className="absolute w-0.5 h-4 bg-current left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="absolute w-3 h-0.5 bg-current left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-0.5 rounded-full"></div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="lg:w-[35%] flex items-center justify-center">
      {/* Container with glass-like effect matching the prayer card - changed to bg-white/15 */}
      <div className="relative rounded-xl overflow-hidden border border-white/20 bg-white/15 backdrop-blur-sm shadow-2xl">
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

            {/* Main rosary loop - with specific bead positioning */}
            <div className="relative w-44 h-44">
              {/* Circular arrangement of decades */}
              <div className="absolute inset-0">
                {rosaryElements
                  .filter((el) => el.type === "mystery" || el.type === "hail-mary")
                  .map((element, index) => {
                    const totalBeads = rosaryElements.filter(
                      (el) => el.type === "mystery" || el.type === "hail-mary",
                    ).length

                    // Calculate angle for each bead
                    let angle = (index / totalBeads) * 2 * Math.PI - Math.PI / 2

                    // Apply specific adjustments for affected beads
                    if (element.id === "1.1") angle -= 0.05 // Move away from M1
                    if (element.id === "1.10") angle += 0.05 // Move away from M2
                    if (element.id === "2.1") angle -= 0.05 // Move away from M2
                    if (element.id === "2.10") angle += 0.05 // Move away from M3
                    if (element.id === "3.1") angle -= 0.05 // Move away from M3
                    if (element.id === "3.10") angle += 0.05 // Move away from M4
                    if (element.id === "4.1") angle -= 0.05 // Move away from M4
                    if (element.id === "4.10") angle += 0.05 // Move away from M5
                    if (element.id === "5.1") angle -= 0.05 // Move away from M5
                    if (element.id === "5.10") angle += 0.05 // Move away from M1

                    const radius = 75 // Base radius
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
