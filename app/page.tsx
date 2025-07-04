"use client"

import dynamic from "next/dynamic"
import { AppProvider, useApp } from "@/components/app-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const WhatSection = dynamic(() => import("@/components/sections/what").then((mod) => mod.WhatSection), {
  loading: () => <LoadingSpinner />,
})
const WhySection = dynamic(() => import("@/components/sections/why").then((mod) => mod.WhySection), {
  loading: () => <LoadingSpinner />,
})
const FoundationSection = dynamic(
  () => import("@/components/sections/foundation").then((mod) => mod.FoundationSection),
  {
    loading: () => <LoadingSpinner />,
  },
)
const HowSection = dynamic(() => import("@/components/sections/how").then((mod) => mod.HowSection), {
  loading: () => <LoadingSpinner />,
})
const CommunitySection = dynamic(() => import("@/components/sections/community").then((mod) => mod.CommunitySection), {
  loading: () => <LoadingSpinner />,
})
const SupportSection = dynamic(() => import("@/components/sections/support").then((mod) => mod.SupportSection), {
  loading: () => <LoadingSpinner />,
})
const PrivacyPolicySection = dynamic(
  () => import("@/components/sections/privacy-policy").then((mod) => mod.PrivacyPolicySection),
  { loading: () => <LoadingSpinner /> },
)

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
