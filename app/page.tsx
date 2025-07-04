"use client"

import dynamic from "next/dynamic"
import { AppProvider, useApp } from "@/components/app-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const loadingComponent = () => (
  <div className="flex-grow flex items-center justify-center">
    <LoadingSpinner />
  </div>
)

const WhatSection = dynamic(() => import("@/components/sections/what").then((mod) => mod.WhatSection), {
  loading: loadingComponent,
})
const WhySection = dynamic(() => import("@/components/sections/why").then((mod) => mod.WhySection), {
  loading: loadingComponent,
})
const FoundationSection = dynamic(
  () => import("@/components/sections/foundation").then((mod) => mod.FoundationSection),
  { loading: loadingComponent },
)
const HowSection = dynamic(() => import("@/components/sections/how").then((mod) => mod.HowSection), {
  loading: loadingComponent,
})
const CommunitySection = dynamic(() => import("@/components/sections/community").then((mod) => mod.CommunitySection), {
  loading: loadingComponent,
})
const SupportSection = dynamic(() => import("@/components/sections/support").then((mod) => mod.SupportSection), {
  loading: loadingComponent,
})
const PrivacyPolicySection = dynamic(
  () => import("@/components/sections/privacy-policy").then((mod) => mod.PrivacyPolicySection),
  { loading: loadingComponent },
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
