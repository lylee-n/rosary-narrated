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
        {/* `isolation-auto` is not a standard tailwind class, so we use a style tag.
            `isolation: isolate` creates a new stacking context, which is the key to this fix.
            It ensures the z-[-1] on the background does not interfere with the content's own layering.
            This is the modern, correct way to solve this without hacks. */}
        <div className="relative flex flex-col min-h-screen" style={{ isolation: "isolate" }}>
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
