"use client"

import { useState, useEffect, useMemo } from "react"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import {
  getMysterySetForDay,
  getMysterySetForDayName,
  buildRosaryElements,
  getDynamicM1Content,
  rosarySequence,
} from "@/lib/rosary-utils"

export const useRosaryState = () => {
  const [currentStepId, setCurrentStepId] = useState("cross")
  const [previousStepId, setPreviousStepId] = useState<string | null>(null)
  const [currentMysterySet, setCurrentMysterySet] = useState<number>(1)
  const [selectedDay, setSelectedDay] = useState<string>("")

  const currentDay = useMemo(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[new Date().getDay()]
  }, [])

  useEffect(() => {
    const dayOfWeek = new Date().getDay()
    const mysterySetNumber = getMysterySetForDay(dayOfWeek)
    setCurrentMysterySet(mysterySetNumber)
    setSelectedDay(currentDay)
  }, [currentDay])

  const mysteryData = rosaryMysteriesDataEn[currentMysterySet as keyof typeof rosaryMysteriesDataEn]
  const rosaryElements = useMemo(() => buildRosaryElements(mysteryData), [mysteryData])

  const handleDayClick = (dayName: string) => {
    const mysterySetNumber = getMysterySetForDayName(dayName)
    setSelectedDay(dayName)
    setCurrentMysterySet(mysterySetNumber)
    setPreviousStepId(null)
    setCurrentStepId("cross")
  }

  const handleBeadClick = (id: string) => {
    setPreviousStepId(currentStepId)
    setCurrentStepId(id)
  }

  const handleNext = () => {
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
  }

  const currentStepData = rosaryElements.find((element) => element.id === currentStepId)
  const displayStepData = useMemo(() => {
    if (currentStepId === "M1/Final") {
      return { ...currentStepData!, content: getDynamicM1Content(previousStepId, mysteryData) }
    }
    return currentStepData
  }, [currentStepId, previousStepId, mysteryData, currentStepData])

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
