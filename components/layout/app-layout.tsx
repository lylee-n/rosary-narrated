"use client"

import type React from "react"

import { Header } from "./header"
import { Footer } from "./footer"
import { ErrorBoundary } from "@/components/ui/error-boundary"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <ErrorBoundary>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}
