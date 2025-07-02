"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { WhatSection } from "@/components/sections/what"
import { WhySection } from "@/components/sections/why"
import { PlaySection } from "@/components/sections/play"
import { AboutSection } from "@/components/sections/about"
import { CommunitySection } from "@/components/sections/community"
import { BlogsSection } from "@/components/sections/blogs"
import { SupportSection } from "@/components/sections/support"
import { useApp } from "@/components/app-provider"

export default function Home() {
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
