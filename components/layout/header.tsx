"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    id: "FOUNDATION",
    label: "Foundation",
  },
  {
    id: "HOW",
    label: "How",
  },
  {
    id: "WHY",
    label: "Why",
  },
  {
    id: "IMPACT",
    label: "Impact",
  },
]

export default function Header() {
  const [currentView, setView] = useState("FOUNDATION")

  return (
    <header className="sticky top-0 z-50 bg-[#101010]/90 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="text-lg font-bold text-white">
          Foundation
        </a>
        <nav className="flex items-center space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md",
                currentView === item.id
                  ? "text-[#FFE552] bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5",
                // Add glow effect for Foundation and How buttons
                (item.id === "FOUNDATION" || item.id === "HOW") &&
                  "shadow-[0_0_15px_rgba(255,229,82,0.5)] border border-[#FFE552]/30",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
