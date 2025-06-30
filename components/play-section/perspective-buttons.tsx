"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import type { PerspectiveType } from "@/types"

interface PerspectiveButtonsProps {
  selectedPerspective: PerspectiveType
  onPerspectiveChange: (perspective: PerspectiveType) => void
  disabled?: boolean
}

export const PerspectiveButtons = memo(function PerspectiveButtons({
  selectedPerspective,
  onPerspectiveChange,
  disabled = false,
}: PerspectiveButtonsProps) {
  const perspectives: { value: PerspectiveType; label: string }[] = [
    { value: 3, label: "3 years old" },
    { value: 7, label: "7 years old" },
    { value: 12, label: "12 years old" },
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {perspectives.map(({ value, label }) => (
        <Button
          key={value}
          variant={selectedPerspective === value ? "default" : "outline"}
          size="sm"
          onClick={() => onPerspectiveChange(value)}
          disabled={disabled}
          className={`
            transition-all duration-200
            ${
              selectedPerspective === value
                ? "bg-[#82FAFA] text-black hover:bg-[#82FAFA]/90"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }
          `}
        >
          {label}
        </Button>
      ))}
    </div>
  )
})
