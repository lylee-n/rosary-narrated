"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { FloatingSupportButton } from "@/components/ui/floating-support-button"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Global Background GIF */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/background.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Content wrapper with transparency, allowing the global background to be visible */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        <Header />
        {/* The main content area. The broken padding has been REMOVED from here. */}
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingSupportButton />
      </div>
    </div>
  )
}
