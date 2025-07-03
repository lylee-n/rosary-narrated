"use client"

import { useState, useCallback } from "react"
import { generateRosaryElements } from "@/lib/rosary-utils"

export function useRosaryState() {
  const rosaryElements = generateRosaryElements()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // Filter out spacer beads for navigation
  const navigableElements = rosaryElements.filter((el) => el.type !== "spacer")
  const currentStep = navigableElements[currentStepIndex] || rosaryElements[0]

  const handleNext = useCallback(() => {
    setCurrentStepIndex((prev) => (prev < navigableElements.length - 1 ? prev + 1 : prev))
  }, [navigableElements.length])

  const handlePrevious = useCallback(() => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const handleBeadClick = useCallback(
    (stepId: string) => {
      const index = navigableElements.findIndex((el) => el.id === stepId)
      if (index !== -1) {
        setCurrentStepIndex(index)
      }
    },
    [navigableElements],
  )

  return {
    rosaryElements,
    currentStep,
    currentStepIndex,
    handleNext,
    handlePrevious,
    handleBeadClick,
  }
}
