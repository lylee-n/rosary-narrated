"use client"

import { PerspectiveButton } from "@/components/ui/perspective-button"
import type { Perspective } from "@/types"

interface MultiSelectProps {
  /* ORIGINAL API (kept for backward compatibility) */
  selectedPerspectives: Perspective[]
  onPerspectiveToggle: (perspective: Perspective) => void
}

interface SingleSelectProps {
  /* NEW API used by MysteryContentDisplay */
  currentPerspective: Perspective | null
  onSelect: (perspective: Perspective) => void
}

type PerspectiveSelectorProps =
  | (MultiSelectProps & { className?: string })
  | (SingleSelectProps & { className?: string })

export function PerspectiveSelector(props: PerspectiveSelectorProps) {
  const { className = "" } = props as { className?: string }
  const perspectives: Perspective[] = ["3", "7", "12"]

  const isMulti = "selectedPerspectives" in props

  const isSelected = (p: Perspective) =>
    isMulti ? props.selectedPerspectives.includes(p) : props.currentPerspective === p

  const handleClick = (p: Perspective) => {
    if (isMulti) {
      props.onPerspectiveToggle(p)
    } else {
      props.onSelect(p)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {isMulti && (
        <h3 className="text-white font-sora text-lg font-semibold mb-4">Select your preferred perspectives set</h3>
      )}

      <div className="flex flex-wrap gap-3">
        {perspectives.map((p) => (
          <PerspectiveButton key={p} perspective={p} isSelected={isSelected(p)} onClick={() => handleClick(p)} />
        ))}
      </div>
    </div>
  )
}
