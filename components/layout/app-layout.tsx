"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { FloatingSupportButton } from "@/components/ui/floating-support-button"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* 
        THE FIX: Changed `z-0` to `z-[-1]`.
        This places the global background at the very bottom of the stacking order,
        ensuring it can never cover up any other content, including other fixed backgrounds.
      */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{
          backgroundImage: "url('/images/background.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translateZ(0)",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-[104px] md:pt-20">{children}</main>
        <Footer />
        <FloatingSupportButton />
      </div>
    </div>
  )
}
