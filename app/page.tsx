"use client"

import { AppProvider, useApp } from "@/components/app-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { AboutSection } from "@/components/sections/about"
import { WhySection } from "@/components/sections/why"
import { PlaySection } from "@/components/sections/play"
import { SupportSection } from "@/components/sections/support"
import { CommunitySection } from "@/components/sections/community" // Updated import

function AppContent() {
  const { currentView } = useApp()

  const renderCurrentView = () => {
    switch (currentView) {
      case "ABOUT":
        return <AboutSection />
      case "WHY":
        return <WhySection />
      case "PLAY":
        return <PlaySection />
      case "SUPPORT":
        return <SupportSection />
      case "COMMUNITY": // Updated case
        return <CommunitySection />
      default:
        return <AboutSection />
    }
  }

  return <AppLayout>{renderCurrentView()}</AppLayout>
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
