"use client"

import { useRosaryState } from "@/hooks/use-rosary-state"
import { DailyMysterySelector } from "@/components/rosary-guide/daily-mystery-selector"
import { RosaryVisualizer } from "@/components/rosary-guide/rosary-visualizer"
import { PrayerDetailsPanel } from "@/components/rosary-guide/prayer-details-panel"
import { CustomButton } from "@/components/ui/custom-button"

export function AboutSection() {
  const {
    currentStepId,
    displayStepData,
    rosaryElements,
    mysteryData,
    selectedDay,
    currentDay,
    handleDayClick,
    handleStepClick,
    handleNext,
    setCurrentView,
  } = useRosaryState()

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12">
            How to Pray the Rosary
          </h1>
        </div>

        {/* Daily Mystery Selector */}
        <DailyMysterySelector currentDay={currentDay} selectedDay={selectedDay} onDayClick={handleDayClick} />

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* Left Column - Rosary Visualizer */}
          <div className="w-full xl:w-1/2">
            <RosaryVisualizer
              rosaryElements={rosaryElements}
              currentStepId={currentStepId}
              onBeadClick={handleStepClick}
            />
          </div>

          {/* Right Column - Prayer Details */}
          <div className="w-full xl:w-1/2">
            <PrayerDetailsPanel stepData={displayStepData} onNextClick={handleNext} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <CustomButton onClick={() => setCurrentView("WHY")} size="lg">
            Why Pray the Rosary?
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
