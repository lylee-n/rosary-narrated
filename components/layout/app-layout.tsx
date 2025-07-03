"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { FloatingSupportButton } from "@/components/ui/floating-support-button"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* 
        THE FIX: Added `pointer-events-none` to this div.
        This makes the background visually present but allows clicks and taps to "pass through" 
        to the buttons underneath. This is the key to restoring interactivity.
      */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/background.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translateZ(0)", // This remains to prevent the scroll glitch
        }}
      />
      {/* 
        The rest of the content wrapper. The `pointer-events-auto` class on the FloatingSupportButton's
        container ensures it remains clickable, overriding the parent's setting.
      */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        {/* Main content area with padding to offset the fixed header */}
        <main className="flex-grow pt-[104px] md:pt-20">{children}</main>
        <Footer />
        <FloatingSupportButton />
      </div>
    </div>
  )
}
