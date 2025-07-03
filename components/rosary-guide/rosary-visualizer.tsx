"use client"

import { Cross } from "lucide-react"
import { useRosaryLayout } from "@/hooks/use-rosary-layout"
import { rosaryConnections } from "@/lib/rosary-utils"
import type { RosaryElement } from "@/types"

interface RosaryVisualizerProps {
  rosaryElements: RosaryElement[]
  currentStepId: string
  onBeadClick: (id: string) => void
}

export const RosaryVisualizer = ({ rosaryElements, currentStepId, onBeadClick }: RosaryVisualizerProps) => {
  const { getRosaryElementPosition } = useRosaryLayout()

  const getLineCoords = (id1: string, id2: string) => {
    const pos1 = getRosaryElementPosition(id1)
    const pos2 = getRosaryElementPosition(id2)
    const x1 = Number.parseFloat(pos1.left.replace("%", ""))
    const y1 = Number.parseFloat(pos1.top.replace("%", ""))
    const x2 = Number.parseFloat(pos2.left.replace("%", ""))
    const y2 = Number.parseFloat(pos2.top.replace("%", ""))
    return { x1, y1, x2, y2 }
  }

  return (
    <div className="lg:w-[35%] flex justify-center items-start">
      {/* Container with dark overlay and blur matching prayer card */}
      <div className="relative rounded-lg overflow-hidden">
        {/* Dark overlay and blur background */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md rounded-lg" />

        {/* Rosary content */}
        <div className="relative z-10 w-full h-[600px] p-6">
          {rosaryElements.map((element) => {
            const position = getRosaryElementPosition(element.id)
            const isSelected = currentStepId === element.id
            const isMystery = element.type === "mystery"
            const isCross = element.type === "cross"
            const isFinal = element.id === "M1/Final"
            const isStem = element.type === "stem"

            // Check if this is one of the M1-M5 mystery beads
            const isMysteryBead = ["M1", "M2", "M3", "M4", "M5"].includes(element.id)

            return (
              <button
                key={element.id}
                onClick={() => onBeadClick(element.id)}
                className={`absolute ${isMystery || isCross || isFinal ? "w-5 h-5" : "w-3.5 h-3.5"} rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
                  isSelected
                    ? "bg-transparent border-[#FFE552] text-[#FFE552] scale-110 shadow-lg"
                    : isMysteryBead
                      ? "bg-transparent border-[#FFE552] text-[#FFE552] hover:bg-[#FFE552] hover:text-black hover:scale-105"
                      : isMystery || isCross || isFinal
                        ? "bg-gray-600 border-gray-500 text-white hover:scale-105"
                        : isStem
                          ? "bg-transparent border-gray-600 text-gray-400 hover:border-gray-400 hover:scale-105"
                          : "bg-transparent border-gray-600 text-transparent hover:border-gray-400 hover:scale-105"
                }`}
                style={{ top: position.top, left: position.left }}
              >
                {isCross ? (
                  <Cross size={10} />
                ) : element.type === "hail-mary" ? (
                  ""
                ) : (
                  <span className="text-[8px] font-bold">{element.id.length > 3 ? "M1" : element.id}</span>
                )}
              </button>
            )
          })}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: -10 }}
          >
            {rosaryConnections.map(([id1, id2], index) => (
              <line key={`${id1}-${id2}-${index}`} {...getLineCoords(id1, id2)} stroke="#6B7280" strokeWidth="0.3" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
