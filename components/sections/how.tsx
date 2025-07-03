"use client"

import { useState } from "react"
import { RosaryGuide } from "@/components/rosary-guide/rosary-guide"
import { useRosaryState } from "@/hooks/use-rosary-state"

export function HowSection() {
  const {
    currentStepId,
    selectedDay,
    currentDay,
    rosaryElements,
    displayStepData,
    handleDayClick,
    handleBeadClick,
    handleNext,
  } = useRosaryState()

  const [showPrayerDetails, setShowPrayerDetails] = useState(false)

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">How to Pray the Rosary</h1>
        <p className="text-xl text-white/80">Interactive Rosary Prayer Guide</p>
      </div>
      <RosaryGuide />
    </div>
  )
}
