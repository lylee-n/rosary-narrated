"use client"

import { AppProvider, useApp } from "@/components/app-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { HowSection } from "@/components/sections/how"
import { WhySection } from "@/components/sections/why"
import { FoundationSection } from "@/components/sections/foundation"
import { CommunitySection } from "@/components/sections/community"
import { SupportSection } from "@/components/sections/support"
import { WhatSection } from "@/components/sections/what"
import { PrivacyPolicySection } from "@/components/sections/privacy-policy"

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
      case "SUPPORT":
        return <SupportSection />
      case "PRIVACY":
        return <PrivacyPolicySection />
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
