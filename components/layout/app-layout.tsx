"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { FloatingSupportButton } from "@/components/ui/floating-support-button"
import { AppProvider } from "@/components/app-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AppProvider>
        <div className="relative min-h-screen bg-black text-white">
          {/* Global Background GIF on its own rendering layer */}
          <div
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: "url('/images/background.gif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translateZ(0)",
            }}
          />
          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            {/* Main content area with padding to offset the fixed header */}
            <main className="flex-grow pt-[104px] md:pt-20">{children}</main>
            <Footer />
            <FloatingSupportButton />
          </div>
          <Toaster />
        </div>
      </AppProvider>
    </ThemeProvider>
  )
}
