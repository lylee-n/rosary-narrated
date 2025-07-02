"use client"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"
import { useRosaryState } from "@/hooks/use-rosary-state"
import { DailyMysterySelector } from "@/components/rosary-guide/daily-mystery-selector"
import { RosaryVisualizer } from "@/components/rosary-guide/rosary-visualizer"
import { MYSTERY_IMAGES } from "@/constants"

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

// Get background image based on mystery set
const getMysteryBackgroundImage = (mysterySet: number): string => {
  // Mystery sets: 1 = Joyful, 2 = Luminous, 3 = Sorrowful, 4 = Glorious
  // MYSTERY_IMAGES array: [0] = Joyful, [1] = Luminous, [2] = Sorrowful, [3] = Glorious
  return MYSTERY_IMAGES[mysterySet - 1] || MYSTERY_IMAGES[0]
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

  // Get the current mystery set number
  const currentMysterySet = getMysterySetForDayName(selectedDay || currentDay)

  // Get the background image for the current mystery set
  const backgroundImage = getMysteryBackgroundImage(currentMysterySet)

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
          <div className="lg:w-[65%] flex items-start justify-center">
            <div
              className="bg-white/5 border border-[#FFE552]/50 rounded-2xl p-5 backdrop-blur-sm w-full h-[650px] lg:h-[600px] flex flex-col relative overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {displayStepData && (
                <>
                  <div className="flex items-center space-x-3 mb-4 flex-shrink-0 relative z-10">
                    <div className="w-7 h-7 bg-[#FFE552] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {displayStepData.type === "cross" ? (
                        <span className="text-[10px]">✝</span>
                      ) : displayStepData.type === "hail-mary" ? (
                        ""
                      ) : (
                        <span className="text-[10px]">{displayStepData.id.length > 3 ? "M1" : displayStepData.id}</span>
                      )}
                    </div>
                    <h4 className="text-white font-sora text-lg font-bold">{displayStepData.title}</h4>
                  </div>
                  <div className="flex-1 overflow-y-auto mb-4 relative z-10">
                    <div className="space-y-4">
                      {displayStepData.content.map((item, index) => (
                        <div key={index}>
                          <h5 className="text-[#FFE552] font-sora text-base font-semibold mb-2">{item.subtitle}</h5>
                          <p className="text-gray-300 font-inter text-sm leading-relaxed whitespace-pre-line">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center flex-shrink-0 relative z-10">
                    <CustomButton onClick={handleNext} size="md" variant="yellow">
                      Next
                    </CustomButton>
                  </div>
                </>
              )}
            </div>
          </div>
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
