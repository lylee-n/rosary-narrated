"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RosaryVisualizer } from "@/components/rosary-guide/rosary-visualizer"
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with blur effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background.gif')",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row h-screen">
        {/* Left side - Rosary Visualizer */}
        <RosaryVisualizer rosaryElements={rosaryElements} currentStepId={currentStepId} onBeadClick={handleBeadClick} />

        {/* Right side - Prayer Details */}
        <div className="lg:w-[65%] flex items-center justify-center p-4">
          <div className="relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl w-full max-w-2xl">
            <div className="relative z-10 p-6">
              {/* Day Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Select Mystery Set</h3>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <Button
                      key={day}
                      variant={selectedDay === day ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleDayClick(day)}
                      className={
                        selectedDay === day
                          ? "bg-[#FFE552] text-black hover:bg-[#FFE552]/90"
                          : "border-white/40 text-white hover:bg-white/10"
                      }
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Current Step Display */}
              {displayStepData && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-4">{displayStepData.title}</h2>
                  <div className="space-y-4">
                    {displayStepData.content.map((item, index) => (
                      <div key={index} className="text-white">
                        <h3 className="text-lg font-semibold mb-2">{item.subtitle}</h3>
                        <p className="text-white/90 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button onClick={handleNext} className="bg-[#FFE552] text-black hover:bg-[#FFE552]/90">
                  Next Prayer
                </Button>
                <div className="text-white/70 text-sm">Current: {currentStepId}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
