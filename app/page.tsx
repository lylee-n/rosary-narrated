"use client"

import { AppProvider } from "@/components/app-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { AboutSection } from "@/components/sections/about"
import { WhySection } from "@/components/sections/why"
import { PlaySection } from "@/components/sections/play"
import { CommunitySection } from "@/components/sections/community"
import { SupportSection } from "@/components/sections/support"
import { WhatSection } from "@/components/sections/what"
import { BlogsSection } from "@/components/sections/blogs"
import { useApp } from "@/components/app-provider"

function MainContent() {
  const { currentView } = useApp()

  const renderCurrentView = () => {
    switch (currentView) {
      case "WHAT":
        return <WhatSection />
      case "WHY":
        return <WhySection />
      case "PLAY":
        return <PlaySection />
      case "ABOUT":
        return <AboutSection />
      case "COMMUNITY":
        return <CommunitySection />
      case "BLOGS":
        return <BlogsSection />
      case "SUPPORT":
        return <SupportSection />
      default:
        return <WhatSection />
    }
  }

  return <AppLayout>{renderCurrentView()}</AppLayout>
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  )
}
