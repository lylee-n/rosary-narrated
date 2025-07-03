"use client"

import type React from "react"
import Image from "next/image"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.gif" alt="Background" fill className="object-cover" priority />
      </div>

      {/* Main container */}
      <div className="relative z-10 min-h-screen flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="flex-grow py-12 md:py-20 min-h-[60vh]">{children}</main>
      </div>
    </div>
  )
}
