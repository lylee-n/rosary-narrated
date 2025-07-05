"use client"

import { useState, useEffect, useMemo } from "react"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import {
  getMysterySetForDay,
  getMysterySetForDayName,
  buildRosaryElements,
  getDynamicM1Content,
  getDynamicCrossContent,
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

  const handlePrevious = () => {
    const currentIndex = rosarySequence.indexOf(currentStepId)
    let prevIndex

    if (currentStepId === "cross") {
      // If at the beginning, go to the final M1/Final
      prevIndex = rosarySequence.length - 1
      setPreviousStepId("5.10") // Set context for Final Prayer
    } else if (currentStepId === "M1/Final" && previousStepId !== "5.10") {
      // If at M1/Final but not from Final Prayer context, go to S5
      prevIndex = rosarySequence.indexOf("S5")
      setPreviousStepId(null)
    } else if (currentStepId === "M1/Final" && previousStepId === "5.10") {
      // If at Final Prayer, go back to 5.10
      prevIndex = rosarySequence.indexOf("5.10")
      setPreviousStepId("5.9")
    } else {
      // Normal case: go to previous bead
      prevIndex = currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = rosarySequence.length - 1
      }
      
      // Set appropriate previous context
      if (prevIndex === 0) {
        setPreviousStepId(null)
      } else {
        const prevPrevIndex = prevIndex - 1
        setPreviousStepId(prevPrevIndex >= 0 ? rosarySequence[prevPrevIndex] : null)
      }
    }

    setCurrentStepId(rosarySequence[prevIndex])
  }

  const currentStepData = rosaryElements.find((element) => element.id === currentStepId)
  const displayStepData = useMemo(() => {
    if (currentStepId === "M1/Final") {
      const title = previousStepId === "5.10" ? "Final Prayer" : "First Mystery"
      return { ...currentStepData!, title, content: getDynamicM1Content(previousStepId, mysteryData) }
    }
    if (currentStepId === "cross") {
      const title = previousStepId === "M1/Final" ? "Prayer After the Rosary" : "Make the Sign of the Cross"
      return { ...currentStepData!, title, content: getDynamicCrossContent(previousStepId) }
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
    handlePrevious,
  }
}
