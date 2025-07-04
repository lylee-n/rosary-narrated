"use client"

import type React from "react"
import { useState, useCallback } from "react"

import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SpeakersSection } from "@/components/sections/speakers"
import { ScheduleSection } from "@/components/sections/schedule"
import { VenueSection } from "@/components/sections/venue"
import { SponsorsSection } from "@/components/sections/sponsors"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { PrivacySection } from "@/components/sections/privacy"

type View = "HOME" | "ABOUT" | "SPEAKERS" | "SCHEDULE" | "VENUE" | "SPONSORS" | "CONTACT" | "PRIVACY"

export const AppLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("HOME")

  const renderContent = useCallback((view: View) => {
    switch (view) {
      case "HOME":
        return <HeroSection />
      case "ABOUT":
        return <AboutSection />
      case "SPEAKERS":
        return <SpeakersSection />
      case "SCHEDULE":
        return <ScheduleSection />
      case "VENUE":
        return <VenueSection />
      case "SPONSORS":
        return <SponsorsSection />
      case "CONTACT":
        return <ContactSection />
      case "PRIVACY":
        return <PrivacySection />
      default:
        return <HeroSection />
    }
  }, [])

  return (
    <>
      <main>{renderContent(currentView)}</main>
      <Footer onViewChange={setCurrentView} />
    </>
  )
}
