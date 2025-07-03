"use client"
import { RosaryVisualizer } from "./rosary-visualizer"
import { PrayerDetailsPanel } from "./prayer-details-panel"
import { useRosaryState } from "@/hooks/use-rosary-state"
import { Button } from "@/components/ui/button"

export function RosaryGuide() {
  const { rosaryElements, currentStep, handleNext, handlePrevious, handleBeadClick } = useRosaryState()

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      {/* Rosary Visualizer */}
      <RosaryVisualizer rosaryElements={rosaryElements} currentStepId={currentStep.id} onBeadClick={handleBeadClick} />

      {/* Prayer Details Panel */}
      <div className="lg:w-[65%]">
        <PrayerDetailsPanel currentStep={currentStep} />

        {/* Navigation Controls */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="text-white border-white/40 hover:bg-white/10 bg-transparent"
          >
            Previous
          </Button>
          <Button onClick={handleNext} className="bg-[#FFE552] text-black hover:bg-[#FFE552]/90">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
