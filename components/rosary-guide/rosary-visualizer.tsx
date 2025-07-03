"use client"

import type { RosaryElement } from "@/types"

interface RosaryVisualizerProps {
  rosaryElements: RosaryElement[]
  currentStepId: string
  onBeadClick: (stepId: string) => void
}

export function RosaryVisualizer({ rosaryElements, currentStepId, onBeadClick }: RosaryVisualizerProps) {
  // Create spacer beads to prevent overlap
  const createSpacerBeads = () => {
    const spacerBeads = [
      { id: "1.11", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "2.0", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "2.11", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "3.0", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "3.11", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "4.0", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "4.11", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "5.0", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "5.11", type: "spacer" as const, title: "Spacer", content: [] },
      { id: "1.0", type: "spacer" as const, title: "Spacer", content: [] },
    ]
    return spacerBeads
  }

  // Check if a bead is a spacer bead
  const isSpacerBead = (beadId: string) => {
    const spacerIds = ["1.11", "2.0", "2.11", "3.0", "3.11", "4.0", "4.11", "5.0", "5.11", "1.0"]
    return spacerIds.includes(beadId)
  }

  const renderBead = (
    element: RosaryElement | { id: string; type: "spacer"; title: string; content: any[] },
    index: number,
  ) => {
    const isActive = element.id === currentStepId
    const isCompleted = false // You might want to track completed steps
    const isSpacer = element.type === "spacer"

    // Halved size for Hail Mary beads - reduced to prevent overlap
    let beadClasses = "w-1.5 h-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"

    if (element.type === "cross") {
      // Circular cross styling - thinner border, yellow when active
      beadClasses =
        "w-7 h-7 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-white text-sm font-normal relative shadow-lg"
    } else if (element.type === "mystery") {
      beadClasses = "w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110"
    } else if (element.type === "stem") {
      // Thinner border for stem beads
      beadClasses = "w-3.5 h-3.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110"
    } else if (element.type === "spacer") {
      // Transparent spacer beads
      beadClasses =
        "w-1.5 h-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:scale-110 opacity-0"
    }

    if (isActive && !isSpacer) {
      if (element.type === "cross") {
        beadClasses += " bg-[#FFE552] border-[#FFE552] text-black scale-125"
      } else {
        beadClasses += " bg-[#FFE552] border-[#FFE552] text-black scale-125"
      }
    } else if (isCompleted && !isSpacer) {
      beadClasses += " bg-green-500 border-green-500"
    } else if (!isSpacer) {
      if (element.type === "cross") {
        beadClasses += " bg-amber-800 border-amber-600"
      } else {
        beadClasses += " bg-white/20 border-white/40 hover:bg-white/30"
      }
    }

    return (
      <div
        key={element.id}
        className={beadClasses}
        onClick={() => !isSpacer && onBeadClick(element.id)}
        title={element.title}
      >
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

  // Combine rosary elements with spacer beads
  const getAllBeads = () => {
    const spacerBeads = createSpacerBeads()
    const mysteryAndHailMaryBeads = rosaryElements.filter((el) => el.type === "mystery" || el.type === "hail-mary")

    // Insert spacer beads at appropriate positions
    const allBeads: (RosaryElement | { id: string; type: "spacer"; title: string; content: any[] })[] = []

    mysteryAndHailMaryBeads.forEach((bead, index) => {
      allBeads.push(bead)

      // Add spacer beads after specific beads
      if (bead.id === "1.10") {
        allBeads.push(spacerBeads.find((s) => s.id === "1.11")!)
        allBeads.push(spacerBeads.find((s) => s.id === "2.0")!)
      } else if (bead.id === "2.10") {
        allBeads.push(spacerBeads.find((s) => s.id === "2.11")!)
        allBeads.push(spacerBeads.find((s) => s.id === "3.0")!)
      } else if (bead.id === "3.10") {
        allBeads.push(spacerBeads.find((s) => s.id === "3.11")!)
        allBeads.push(spacerBeads.find((s) => s.id === "4.0")!)
      } else if (bead.id === "4.10") {
        allBeads.push(spacerBeads.find((s) => s.id === "4.11")!)
        allBeads.push(spacerBeads.find((s) => s.id === "5.0")!)
      } else if (bead.id === "5.10") {
        allBeads.push(spacerBeads.find((s) => s.id === "5.11")!)
        allBeads.push(spacerBeads.find((s) => s.id === "1.0")!)
      }
    })

    return allBeads
  }

  return (
    <div className="lg:w-[35%] flex items-center justify-center">
      {/* Container with glass-like effect - changed to bg-white/10 */}
      <div className="relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
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

            {/* Main rosary loop with spacer beads */}
            <div className="relative w-44 h-44">
              {/* Circular arrangement of decades with spacers */}
              <div className="absolute inset-0">
                {getAllBeads().map((element, index) => {
                  const totalBeads = getAllBeads().length
                  const angle = (index / totalBeads) * 2 * Math.PI - Math.PI / 2
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
