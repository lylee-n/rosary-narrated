"use client"

import { Cross } from "lucide-react"
import { cn } from "@/lib/utils"
import type { RosaryElement } from "@/types"

interface RosaryVisualizerProps {
  rosaryElements: RosaryElement[]
  currentStepId: string
  onBeadClick: (id: string) => void
}

export const RosaryVisualizer = ({ rosaryElements, currentStepId, onBeadClick }: RosaryVisualizerProps) => {
  const renderBead = (element: RosaryElement, index: number) => {
    const isActive = element.id === currentStepId
    const isClickable = element.type !== "spacer"

    // Make spacer beads completely transparent
    if (element.type === "spacer") {
      return <div key={element.id} className="w-4 h-4 opacity-0 pointer-events-none" />
    }

    const baseClasses = "rounded-full transition-all duration-200 flex items-center justify-center text-xs font-bold"

    let sizeClasses = "w-4 h-4"
    let colorClasses = "bg-white/20 border border-white/30"

    if (element.type === "mystery") {
      sizeClasses = "w-6 h-6"
      colorClasses = isActive ? "bg-[#FFE552] text-black" : "bg-white/30 border border-white/50"
    } else if (element.type === "cross") {
      sizeClasses = "w-8 h-8"
      colorClasses = isActive ? "bg-[#FFE552] text-black" : "bg-white/30 border border-white/50"
    } else if (element.type === "hail-mary") {
      sizeClasses = "w-3 h-3"
      colorClasses = isActive ? "bg-[#FFE552] text-black" : "bg-white/20 border border-white/30"
    }

    return (
      <button
        key={element.id}
        onClick={() => isClickable && onBeadClick(element.id)}
        className={cn(
          baseClasses,
          sizeClasses,
          colorClasses,
          isClickable ? "cursor-pointer hover:bg-white/40" : "cursor-default",
          isActive && "ring-2 ring-[#FFE552]/50",
        )}
        disabled={!isClickable}
      >
        {element.type === "cross" && <Cross size={12} />}
        {element.type === "mystery" && (
          <span className="text-[10px]">
            {element.id.includes("M1")
              ? "1"
              : element.id.includes("M2")
                ? "2"
                : element.id.includes("M3")
                  ? "3"
                  : element.id.includes("M4")
                    ? "4"
                    : element.id.includes("M5")
                      ? "5"
                      : ""}
          </span>
        )}
      </button>
    )
  }

  // Separate elements into main loop and stem
  const crossElement = rosaryElements.find((el) => el.type === "cross")
  const stemElements = rosaryElements.filter((el) => el.type === "stem")
  const loopElements = rosaryElements.filter((el) => !["cross", "stem"].includes(el.type))

  return (
    <div className="lg:w-[35%] flex items-center justify-center">
      <div className="relative">
        {/* Main Rosary Loop */}
        <div className="relative w-64 h-64">
          {loopElements.map((element, index) => {
            const totalElements = loopElements.length
            const angle = (index * 360) / totalElements - 90 // Start from top
            const radius = 120
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius

            return (
              <div
                key={element.id}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {renderBead(element, index)}
              </div>
            )
          })}
        </div>

        {/* Stem (vertical chain) */}
        <div className="absolute left-1/2 top-full transform -translate-x-1/2 flex flex-col items-center space-y-2">
          {stemElements.map((element, index) => (
            <div key={element.id}>{renderBead(element, index)}</div>
          ))}

          {/* Cross at the bottom */}
          {crossElement && <div className="mt-2">{renderBead(crossElement, 0)}</div>}
        </div>
      </div>
    </div>
  )
}
