"use client"

import { AppProvider, useApp } from "@/components/app-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { HowSection } from "@/components/sections/how"

function MainContent() {
  const { currentView } = useApp()

  return (
    <AppLayout>
      <HowSection />
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
