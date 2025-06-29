"use client"

import { useApp } from "@/components/app-provider"
import { AboutSection } from "@/components/sections/about"
import { WhySection } from "@/components/sections/why"
import { PlaySection } from "@/components/sections/play"
import { SupportSection } from "@/components/sections/support"
import { CommunitySection } from "@/components/sections/community"

export default function Home() {
  const { currentView } = useApp()

  return (
    <main className="flex-grow">
      {currentView === "ABOUT" && <AboutSection />}
      {currentView === "WHY" && <WhySection />}
      {currentView === "PLAY" && <PlaySection />}
      {currentView === "SUPPORT" && <SupportSection />}
      {currentView === "COMMUNITY" && <CommunitySection />}
    </main>
  )
}
