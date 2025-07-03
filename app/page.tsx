"use client"

import { AppProvider, useApp } from "@/components/app-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { HowSection } from "@/components/sections/how"
import { WhySection } from "@/components/sections/why"
import { FoundationSection } from "@/components/sections/foundation"
import { CommunitySection } from "@/components/sections/community"
import { SupportSection } from "@/components/sections/support"
import { WhatSection } from "@/components/sections/what"
import { BlogsSection } from "@/components/sections/blogs"

function MainContent() {
  const { currentView } = useApp()

  const renderCurrentView = () => {
    switch (currentView) {
      case "WHAT":
        return <WhatSection />
      case "WHY":
        return <WhySection />
      case "FOUNDATION":
        return <FoundationSection />
      case "HOW":
        return <HowSection />
      case "COMMUNITY":
        return <CommunitySection />
      case "BLOGS":
        return <BlogsSection />
      case "SUPPORT":
        return <SupportSection />
      default:
        return <HowSection />
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
