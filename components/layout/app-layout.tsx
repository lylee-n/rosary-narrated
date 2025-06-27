"use client"

import type React from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        transform: "scale(0.85)",
        transformOrigin: "top center",
        width: "117.65%",
        height: "117.65%",
        marginLeft: "-8.825%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.gif" alt="Background" fill className="object-cover" priority />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with fixed positioning from top */}
        <div className="absolute top-0 left-0 right-0 h-32 flex items-center justify-center">
          <Header />
        </div>

        {/* Horizontal line after header */}
        <div className="absolute top-32 left-0 right-0 border-t border-gray-600/30"></div>

        {/* Main content area */}
        <div className="flex-grow pt-40 pb-40">
          <main className="py-10">{children}</main>
        </div>

        {/* Horizontal line before footer */}
        <div className="absolute bottom-40 left-0 right-0 border-t border-gray-600/30"></div>

        {/* Footer with fixed positioning from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </div>
  )
}
