"use client"

import { memo } from "react"

interface MysteryBeadProps {
  index: number
  isExpanded: boolean
  isOtherExpanded: boolean
  onClick: () => void
  animationDelay: number
}

export const MysteryBead = memo(function MysteryBead({
  index,
  isExpanded,
  isOtherExpanded,
  onClick,
  animationDelay,
}: MysteryBeadProps) {
  return (
    <div
      className="flex-1 relative animate-[beadReveal_0.8s_ease-out] opacity-0"
      style={{
        animationDelay: `${animationDelay}s`,
        animationFillMode: "forwards",
      }}
    >
      <div
        className={`w-8 h-8 lg:w-10 lg:h-10 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-gray-900 text-sm lg:text-base cursor-pointer transition-all duration-300 mx-auto mb-3 lg:mb-4 ${
          isExpanded
            ? "scale-125 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
            : isOtherExpanded
              ? "hover:scale-110 opacity-30"
              : "hover:scale-110"
        }`}
        onClick={onClick}
        style={{ marginTop: "25px" }}
      >
        {index + 1}
      </div>
    </div>
  )
})
