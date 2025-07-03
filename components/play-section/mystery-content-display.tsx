"use client"

import { memo } from "react"
import type { Mystery } from "@/types"

interface MysteryContentDisplayProps {
  mystery: Mystery
  className?: string
}

export const MysteryContentDisplay = memo(function MysteryContentDisplay({
  mystery,
  className = "",
}: MysteryContentDisplayProps) {
  return (
    <div className={`space-y-4 lg:space-y-6 ${className}`}>
      <div>
        <strong className="text-[#82FAFA] block mb-1 lg:mb-2 font-inter text-sm lg:text-base">Significance:</strong>
        <p className="font-inter text-white leading-relaxed text-xs lg:text-sm">{mystery.significance}</p>
      </div>
      <div>
        <strong className="text-[#82FAFA] block mb-1 lg:mb-2 font-inter text-sm lg:text-base">Reflection:</strong>
        <p className="font-inter text-white leading-relaxed text-xs lg:text-sm">{mystery.reflection}</p>
      </div>
    </div>
  )
})
