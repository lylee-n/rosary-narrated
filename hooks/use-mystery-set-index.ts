"use client"

import { useState, useCallback } from "react"

/**
 * Hook to manage the currently selected mystery set index
 * 0 = Joyful, 1 = Luminous, 2 = Sorrowful, 3 = Glorious
 */
export function useMysterySetIndex(initialIndex = 0) {
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState(initialIndex)

  const selectMysterySet = useCallback((index: number) => {
    if (index >= 0 && index <= 3) {
      setSelectedMysterySetIndex(index)
    }
  }, [])

  const selectNextMysterySet = useCallback(() => {
    setSelectedMysterySetIndex((prev) => (prev + 1) % 4)
  }, [])

  const selectPreviousMysterySet = useCallback(() => {
    setSelectedMysterySetIndex((prev) => (prev - 1 + 4) % 4)
  }, [])

  return {
    selectedMysterySetIndex,
    selectMysterySet,
    selectNextMysterySet,
    selectPreviousMysterySet,
  }
}

export default useMysterySetIndex
