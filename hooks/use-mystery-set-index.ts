"use client"

import { useState, useCallback } from "react"

export function useMysterySetIndex(initialIndex = 0) {
  const [mysterySetIndex, setMysterySetIndex] = useState(initialIndex)

  const updateMysterySetIndex = useCallback((index: number) => {
    setMysterySetIndex(index)
  }, [])

  return {
    mysterySetIndex,
    setMysterySetIndex: updateMysterySetIndex,
  }
}
