"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { FloatingSupportButton } from "@/components/ui/floating-support-button"
import { AppProvider } from "@/components/app-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <TooltipProvider>
        {/* Global Background Layer */}
        {/* This div is fixed to the viewport, sits at the very bottom of the z-index stack, and ignores all clicks. */}
        <div className="fixed inset-0 z-[-1] bg-[url('/images/background.gif')] bg-cover bg-center pointer-events-none" />

        {/* Content Layer */}
        {/* This div contains all the interactive content and establishes the main stacking context. */}
        <div className="relative z-0 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingSupportButton />
          <Toaster />
        </div>
      </TooltipProvider>
    </AppProvider>
  )
}
