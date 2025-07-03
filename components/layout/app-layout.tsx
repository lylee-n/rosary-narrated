"use client"

import type React from "react"

import { AppProvider } from "@/components/app-provider"
import { FloatingSupportButton } from "@/components/ui/floating-support-button"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Header } from "./header"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <TooltipProvider>
        <div className="relative min-h-screen">
          {/* Animated background - z-[-1] keeps it behind everything */}
          <div
            className="fixed inset-0 z-[-1] bg-[url('/images/background.gif')] bg-cover bg-center pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          />

          <Header />

          {/* Main content area - REMOVED style={{ transform: "translateZ(0)" }} */}
          <main className="relative z-0">{children}</main>

          <FloatingSupportButton />
          <Toaster />
        </div>
      </TooltipProvider>
    </AppProvider>
  )
}
