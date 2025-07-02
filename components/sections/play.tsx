"use client"

import { useEffect } from "react"
import { useApp } from "@/components/app-provider"
import { useMysterySetIndex } from "@/hooks"
import { PlayModal } from "@/components/play-section/play-modal"
import { MysteryGrid } from "@/components/play-section/mystery-grid"
import { MysteryList } from "@/components/play-section/mystery-list"
import { DesktopMysteryDisplay } from "@/components/play-section/desktop-mystery-display"
import { MobileMysteryDisplay } from "@/components/play-section/mobile-mystery-display"
import { useMobile } from "@/lib/hooks/use-mobile"
import { getMysterySetForDay } from "@/lib/rosary-utils" // Import the utility function

export function PlaySection() {
  const { currentView, setCurrentView, selectedDay, currentMysterySet, setCurrentMysterySet } = useApp()
  const { isMobile } = useMobile()
  const { mysterySetIndex, setMysterySetIndex } = useMysterySetIndex()

  useEffect(() => {
    if (currentView === "PLAY") {
      const initialMysterySet = getMysterySetForDay(selectedDay)
      setCurrentMysterySet(initialMysterySet)
      setMysterySetIndex(0) // Reset to first mystery when entering Play view
    }
  }, [currentView, selectedDay, setCurrentMysterySet, setMysterySetIndex])

  if (!currentMysterySet) {
    return null // Or a loading spinner
  }

  return (
    <section className="w-full py-16">
      {" "}
      {/* Adjusted padding here */}
      <div className="container mx-auto px-4">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold text-center mb-12">
          Pray the Rosary
        </h1>
        <div className="mb-16">
          {isMobile ? (
            <MobileMysteryDisplay mysterySet={currentMysterySet} mysterySetIndex={mysterySetIndex} />
          ) : (
            <DesktopMysteryDisplay mysterySet={currentMysterySet} mysterySetIndex={mysterySetIndex} />
          )}
        </div>
        <div className="mb-16">
          {isMobile ? (
            <MysteryList mysterySet={currentMysterySet} setMysterySetIndex={setMysterySetIndex} />
          ) : (
            <MysteryGrid mysterySet={currentMysterySet} setMysterySetIndex={setMysterySetIndex} />
          )}
        </div>
        <PlayModal />
      </div>
    </section>
  )
}
