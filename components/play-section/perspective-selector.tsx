"use client"

import { PerspectiveButton } from "@/components/ui/perspective-button"
import type { Perspective } from "@/types"

interface PerspectiveSelectorProps {
  selectedPerspectives: Perspective[]
  onPerspectiveToggle: (perspective: Perspective) => void
  className?: string
}

export function PerspectiveSelector({
  selectedPerspectives,
  onPerspectiveToggle,
  className = "",
}: PerspectiveSelectorProps) {
  const perspectives: Perspective[] = ["3", "7", "12"]

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-white font-sora text-lg font-semibold mb-4">
        Select your preferred perspectives set (3 unique perspectives, 7 unique perspectives, 12 unique perspectives)
      </h3>
      <div className="flex flex-wrap gap-3">
        {perspectives.map((perspective) => (
          <PerspectiveButton
            key={perspective}
            perspective={perspective}
            isSelected={selectedPerspectives.includes(perspective)}
            onClick={() => onPerspectiveToggle(perspective)}
          />
        ))}
      </div>
    </div>
  )
}
