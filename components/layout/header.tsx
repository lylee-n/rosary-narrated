"use client"

import Image from "next/image"
import { useApp } from "@/components/app-provider"
import { cn } from "@/lib/utils"

const navItems = [
  { key: "ABOUT", label: "ABOUT" },
  { key: "WHY", label: "WHY" },
  { key: "PRAY", label: "PRAY" },
  { key: "COMMUNITY", label: "COMMUNITY" },
  { key: "SUPPORT", label: "SUPPORT" },
] as const

export function Header() {
  const { view, setView } = useApp()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/rosary-narrated-logo.png"
              alt="Rosary Narrated"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key as any)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-[#FFE552]",
                  view === item.key ? "text-[#FFE552]" : "text-white",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-[#FFE552] transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
