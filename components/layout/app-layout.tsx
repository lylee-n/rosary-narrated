"use client"

import type React from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FloatingSupportButton } from "@/components/ui/floating-support-button"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen relative scroll-container">
      {/* Background Image - covers the entire viewport */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.gif" alt="Background" fill className="object-cover" priority />
      </div>

      {/* Main container for content, centered and with max-width */}
      <div className="relative z-10 min-h-screen flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="w-full py-6 flex-shrink-0">
          <Header />
        </header>
        <div className="border-t border-gray-600/30 flex-shrink-0"></div>

        {/* Main content area - ensure it can scroll properly and has minimum height */}
        <main className="flex-grow py-12 md:py-20 min-h-[60vh] main-content-container">{children}</main>

        {/* Footer */}
        <div className="border-t border-gray-600/30 flex-shrink-0"></div>
        <footer className="w-full py-6 flex-shrink-0 footer-container">
          <Footer />
        </footer>
      </div>

      {/* Floating Support Button */}
      <FloatingSupportButton />
    </div>
  )
}
