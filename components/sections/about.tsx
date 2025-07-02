"use client"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"
import { useRosaryState } from "@/hooks/use-rosary-state"
import { DailyMysterySelector } from "@/components/rosary-guide/daily-mystery-selector"
import { RosaryVisualizer } from "@/components/rosary-guide/rosary-visualizer"
import { PrayerDetailsPanel } from "@/components/rosary-guide/prayer-details-panel"

// Define the types for our rosary elements
type RosaryElement = {
  id: string
  type: "cross" | "stem" | "mystery" | "hail-mary" | "final"
  title: string
  content: { subtitle: string; text: string }[]
}

// Mystery set mapping based on day of week
const getMysterySetForDay = (dayOfWeek: number): number => {
  // dayOfWeek: 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
  switch (dayOfWeek) {
    case 1: // Monday
    case 6: // Saturday
      return 1 // Joyful Mysteries
    case 2: // Tuesday
    case 5: // Friday
      return 3 // Sorrowful Mysteries
    case 3: // Wednesday
    case 0: // Sunday
      return 4 // Glorious Mysteries
    case 4: // Thursday
      return 2 // Luminous Mysteries
    default:
      return 1 // Default to Joyful
  }
}

// Get mystery set for a specific day name
const getMysterySetForDayName = (dayName: string): number => {
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

export function AboutSection() {
  const { setView } = useApp()
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

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-32">
          <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12 md:mb-16">
            How to Pray the Rosary
          </h2>
          <DailyMysterySelector currentDay={currentDay} selectedDay={selectedDay} onDayClick={handleDayClick} />
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-6 gap-4 lg:items-start mb-32">
          <RosaryVisualizer
            rosaryElements={rosaryElements}
            currentStepId={currentStepId}
            onBeadClick={handleBeadClick}
          />
          <PrayerDetailsPanel stepData={displayStepData} onNextClick={handleNext} />
        </div>

        <div className="text-center mb-32">
          <CustomButton onClick={() => setView("COMMUNITY")} size="lg" variant="yellow">
            <span className="hidden md:inline">Join the community</span>
            <span className="md:hidden">Community</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
