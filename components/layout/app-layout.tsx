"use client"

import type { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
