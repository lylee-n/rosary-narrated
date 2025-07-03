"use client"

import { useState, useEffect, useCallback } from "react"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { getMysterySetForDay, getMysterySetForDayName, buildRosaryElements, rosarySequence } from "@/lib/rosary-utils"
import type { RosaryElement } from "@/types"

export const useRosaryState = () => {
  const [currentStepId, setCurrentStepId] = useState("cross")
  const [previousStepId, setPreviousStepId] = useState<string | null>(null)
  const [currentMysterySet, setCurrentMysterySet] = useState<number>(1)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [currentDay, setCurrentDay] = useState("")

  // Get current day of week
  useEffect(() => {
    const today = new Date()
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    setCurrentDay(dayNames[today.getDay()])
  }, [])

  useEffect(() => {
    const dayOfWeek = new Date().getDay()
    const mysterySetNumber = getMysterySetForDay(dayOfWeek)
    setCurrentMysterySet(mysterySetNumber)
    setSelectedDay(currentDay)
  }, [currentDay])

  const mysteryData = rosaryMysteriesDataEn[currentMysterySet as keyof typeof rosaryMysteriesDataEn]
  const rosaryElements: RosaryElement[] = buildRosaryElements(mysteryData)

  const displayStepData = rosaryElements.find((el) => el.id === currentStepId) || {}

  const handleDayClick = useCallback((day: string) => {
    const mysterySetNumber = getMysterySetForDayName(day)
    setSelectedDay(day)
    setCurrentMysterySet(mysterySetNumber)
    setPreviousStepId(null)
    setCurrentStepId("cross")
  }, [])

  const handleBeadClick = useCallback(
    (stepId: string) => {
      setPreviousStepId(currentStepId)
      setCurrentStepId(stepId)
    },
    [currentStepId],
  )

  const handleNext = useCallback(() => {
    const currentIndex = rosarySequence.indexOf(currentStepId)
    let nextIndex

    if (currentStepId === "5.10") {
      nextIndex = rosarySequence.length - 1
    } else if (currentStepId === "M1/Final" && previousStepId === "5.10") {
      nextIndex = 0
    } else {
      nextIndex = (currentIndex + 1) % rosarySequence.length
    }

    setPreviousStepId(currentStepId)
    setCurrentStepId(rosarySequence[nextIndex])
  }, [currentStepId, previousStepId])

  return {
    currentStepId,
    selectedDay,
    currentDay,
    rosaryElements,
    displayStepData,
    handleDayClick,
    handleBeadClick,
    handleNext,
  }
}
</merged_code>
