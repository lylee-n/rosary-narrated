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
      <div className="relative w-full h-[600px]">
        {rosaryElements.map((element) => {
          const position = getRosaryElementPosition(element.id)
          const isSelected = currentStepId === element.id
          const isMystery = element.type === "mystery"
          const isCross = element.type === "cross"
          const isFinal = element.id === "M1/Final"
          const isStem = element.type === "stem"

          return (
            <button
              key={element.id}
              onClick={() => onBeadClick(element.id)}
              className={`absolute ${isMystery || isCross || isFinal ? "w-5 h-5" : "w-3.5 h-3.5"} rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
                isSelected
                  ? "bg-[#82FAFA] border-[#82FAFA] text-black scale-110 shadow-lg"
                  : "bg-transparent border-[#82FAFA] text-[#82FAFA] hover:bg-[#82FAFA] hover:text-black hover:scale-105"
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
            <line key={`${id1}-${id2}-${index}`} {...getLineCoords(id1, id2)} stroke="#82FAFA" strokeWidth="0.3" />
          ))}
        </svg>
      </div>
    </div>
  )
}
