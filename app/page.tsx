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

  // This will now definitively render the correct component based on the state.
  // By setting the default state to "WHAT", we ensure WhatSection is loaded.
  return (
    <AppLayout>
      {currentView === "WHAT" && <WhatSection />}
      {currentView === "WHY" && <WhySection />}
      {currentView === "FOUNDATION" && <FoundationSection />}
      {currentView === "HOW" && <HowSection />}
      {currentView === "COMMUNITY" && <CommunitySection />}
      {currentView === "BLOGS" && <BlogsSection />}
      {currentView === "SUPPORT" && <SupportSection />}
    </AppLayout>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  )
}
