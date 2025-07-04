"use client"
import { useApp } from "@/components/app-provider"
import { useRosaryState } from "@/hooks/use-rosary-state"
import { DailyMysterySelector } from "@/components/rosary-guide/daily-mystery-selector"
import { RosaryVisualizer } from "@/components/rosary-guide/rosary-visualizer"
import { Cross } from "lucide-react"
import { getMysterySetForDayName, getMysteryBackgroundImage } from "@/lib/rosary-utils"
import { Button } from "@/components/ui/button"

export function HowSection() {
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

  // Check if current mystery set is Glorious Mysteries (set 4)
  const isGloriousMysteries = currentMysterySet === 4

  return (
    <section className="w-full">
      {/* --- Top part (Title & Selector) --- */}
      <div className="w-full bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center pt-16 md:pt-24 pb-12 md:pb-16">
            <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12 md:mb-16">
              How to Pray the Rosary
            </h2>
            <DailyMysterySelector currentDay={currentDay} selectedDay={selectedDay} onDayClick={handleDayClick} />
          </div>
        </div>
      </div>

      {/* --- Full Bleed Container with Dynamic Background --- */}
      <div
        className="relative w-full min-h-[800px]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Creates a parallax effect on scroll
        }}
      >
        {/* Dark Overlay ONLY for background image (no blur as specifically requested) */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Centered Content (Rosary + Prayer Card) */}
        <div className="container relative mx-auto px-4 z-10 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-8 lg:items-start">
            <RosaryVisualizer
              rosaryElements={rosaryElements}
              currentStepId={currentStepId}
              onBeadClick={handleBeadClick}
            />
            <div className="lg:w-[65%] flex items-start justify-center">
              {/* The Prayer Card container with glass-like effect - changed to bg-white/10 */}
              <div className="w-full h-[650px] lg:h-[600px] flex flex-col relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
                {/* Prayer card content */}
                <div className="relative z-10 flex flex-col h-full p-6">
                  {displayStepData && (
                    <>
                      <div className="flex items-center space-x-3 mb-4 flex-shrink-0">
                        <div className="w-7 h-7 bg-[#FFE552] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {displayStepData.type === "cross" ? (
                            <Cross size={16} strokeWidth={3} /> // Changed from <span>✝</span> to Lucide Cross icon
                          ) : displayStepData.type === "hail-mary" ? (
                            ""
                          ) : (
                            <span className="text-[10px]">
                              {displayStepData.id.length > 3 ? "M1" : displayStepData.id}
                            </span>
                          )}
                        </div>
                        <h4 className="font-sora text-lg font-bold text-white">{displayStepData.title}</h4>
                      </div>
                      {/* Scrollable container */}
                      <div className="flex-1 overflow-y-auto mb-4">
                        <div className="space-y-4">
                          {displayStepData.content.map((item, index) => (
                            <div key={index}>
                              <h5 className="font-sora text-base font-semibold mb-2 text-[#FFE552]">{item.subtitle}</h5>
                              <p className="font-inter text-sm leading-relaxed whitespace-pre-line text-white">
                                {item.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center flex-shrink-0">
                        <Button
                          onClick={handleNext}
                          variant="yellow"
                          className="font-semibold px-8 py-3 rounded-lg transition-all duration-200 h-auto"
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
