"use client"

import { useState, useMemo } from "react"
import { rosaryData } from "@/lib/rosary-data-en"

export type RosaryElement = {
  id: string
  type: "cross" | "stem" | "mystery" | "hail-mary" | "final" | "spacer"
  title: string
  content: { subtitle: string; text: string }[]
}

export const useRosaryState = () => {
  const [currentStepId, setCurrentStepId] = useState("cross")
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  // Get current day of week
  const currentDay = useMemo(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[new Date().getDay()]
  }, [])

  // Generate rosary elements from data
  const rosaryElements = useMemo(() => {
    const elements: RosaryElement[] = []

    // Add cross
    elements.push({
      id: "cross",
      type: "cross",
      title: rosaryData.cross.title,
      content: rosaryData.cross.content,
    })

    // Add stem beads (3 Hail Marys + 1 Our Father)
    rosaryData.stem.forEach((step, index) => {
      elements.push({
        id: step.id,
        type: "stem",
        title: step.title,
        content: step.content,
      })
    })

    // Add main rosary beads (5 decades with mysteries and Hail Marys)
    for (let decade = 1; decade <= 5; decade++) {
      // Add mystery bead
      const mysteryId = `M${decade}`
      elements.push({
        id: mysteryId,
        type: "mystery",
        title: `${decade}. Mystery`,
        content: [], // Will be filled dynamically
      })

      // Add 10 Hail Mary beads for this decade
      for (let hail = 1; hail <= 10; hail++) {
        elements.push({
          id: `${decade}.${hail}`,
          type: "hail-mary",
          title: `Hail Mary ${hail}`,
          content: rosaryData.hailMary.content,
        })
      }
    }

    // Add final prayers
    rosaryData.final.forEach((step) => {
      elements.push({
        id: step.id,
        type: "final",
        title: step.title,
        content: step.content,
      })
    })

    return elements
  }, [])

  // Get display data for current step
  const displayStepData = useMemo(() => {
    const element = rosaryElements.find((el) => el.id === currentStepId)
    if (!element) return null

    // For mystery beads, get dynamic content based on selected day
    if (element.type === "mystery") {
      const mysteryNumber = Number.parseInt(element.id.replace("M", ""))
      const dayToUse = selectedDay || currentDay
      const mysterySet = getMysterySetForDay(dayToUse)
      const mysteries = rosaryData.mysteries[mysterySet - 1]?.mysteries || []
      const mystery = mysteries[mysteryNumber - 1]

      if (mystery) {
        return {
          ...element,
          title: mystery.title,
          content: mystery.content,
        }
      }
    }

    return element
  }, [currentStepId, rosaryElements, selectedDay, currentDay])

  // Get mystery set for a day
  const getMysterySetForDay = (dayName: string): number => {
    switch (dayName) {
      case "Monday":
      case "Saturday":
        return 1 // Joyful Mysteries
      case "Tuesday":
      case "Friday":
        return 3 // Sorrowful Mysteries
      case "Wednesday":
      case "Sunday":
        return 4 // Glorious Mysteries
      case "Thursday":
        return 2 // Luminous Mysteries
      default:
        return 1 // Default to Joyful
    }
  }

  // Handle day selection
  const handleDayClick = (day: string) => {
    setSelectedDay(day)
  }

  // Handle bead click
  const handleBeadClick = (stepId: string) => {
    // Skip spacer beads when clicking
    const element = rosaryElements.find((el) => el.id === stepId)
    if (element?.type === "spacer") return

    setCurrentStepId(stepId)
  }

  // Handle next button
  const handleNext = () => {
    const currentIndex = rosaryElements.findIndex((el) => el.id === currentStepId)
    if (currentIndex < rosaryElements.length - 1) {
      let nextIndex = currentIndex + 1
      let nextElement = rosaryElements[nextIndex]

      // Skip spacer beads
      while (nextElement?.type === "spacer" && nextIndex < rosaryElements.length - 1) {
        nextIndex++
        nextElement = rosaryElements[nextIndex]
      }

      if (nextElement && nextElement.type !== "spacer") {
        setCurrentStepId(nextElement.id)
      }
    }
  }

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
