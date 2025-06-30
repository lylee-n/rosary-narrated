"use client"
import { PerspectiveButton } from "@/components/ui/perspective-button"
import type { Perspective } from "@/types"

interface PerspectiveSelectorProps {
  perspectives: Perspective[]
  selectedPerspective: Perspective
  onPerspectiveChange: (perspective: Perspective) => void
  className?: string
  variant?: "default" | "compact"
}

export function PerspectiveSelector({
  perspectives,
  selectedPerspective,
  onPerspectiveChange,
  className,
  variant = "default",
}: PerspectiveSelectorProps) {
  const perspectiveLabels: Record<Perspective, string> = {
    theological: "Theological",
    scriptural: "Scriptural",
    personal: "Personal",
    historical: "Historical",
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 justify-center">
        {perspectives.map((perspective) => (
          <PerspectiveButton
            key={perspective}
            label={perspectiveLabels[perspective]}
            isActive={selectedPerspective === perspective}
            onClick={() => onPerspectiveChange(perspective)}
            variant={variant}
          />
        ))}
      </div>
    </div>
  )
}
