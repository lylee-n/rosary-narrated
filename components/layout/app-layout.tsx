"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { FloatingSupportButton } from "@/components/ui/floating-support-button"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/images/background.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main content area - ensure it can scroll properly and has minimum height */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Floating Support Button */}
      <FloatingSupportButton />
    </div>
  )
}
