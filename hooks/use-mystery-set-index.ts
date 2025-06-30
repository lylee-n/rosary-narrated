"use client"

import type React from "react"

import { createContext, useCallback, useContext, useState } from "react"

/**
 * Context + hook pair that keeps track of the currently-selected
 * mystery-set index (0 = Joyful, 1 = Sorrowful, etc.).
 *
 * Keeping this in context lets every component that cares about
 * the selection share the same source of truth without prop drilling.
 */

interface MysterySetIndexContextValue {
  selectedMysterySetIndex: number
  setSelectedMysterySetIndex: (index: number) => void
}

const MysterySetIndexContext = createContext<MysterySetIndexContextValue | null>(null)

export function MysterySetIndexProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState(0)

  // memoised setter so consumers are stable across renders
  const setIndex = useCallback((index: number) => {
    setSelectedMysterySetIndex(index)
  }, [])

  return (
    <MysterySetIndexContext.Provider value={{ selectedMysterySetIndex, setSelectedMysterySetIndex: setIndex }}>
      {children}
    </MysterySetIndexContext.Provider>
  )
}

/**
 * Simple consumer hook.  Falls back to local state if the
 * provider isn’t mounted (e.g. during isolated component tests).
 */
export default function useMysterySetIndex() {
  const ctx = useContext(MysterySetIndexContext)
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState(0)

  if (ctx) return ctx

  // Fallback – isolated usage without provider
  return { selectedMysterySetIndex, setSelectedMysterySetIndex }
}
