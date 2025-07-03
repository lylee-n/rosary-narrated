"use client"

import { useApp } from "@/components/app-provider"
import { BookOpen, Church, Handshake, Heart, HelpCircle, Rss, Sparkles } from "lucide-react"
import type { NavItem } from "@/lib/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Header() {
  const { currentView, setView } = useApp()

  const navItems: NavItem[] = [
    { name: "WHAT", label: "What", icon: Sparkles },
    { name: "WHY", label: "Why", icon: HelpCircle },
    { name: "FOUNDATION", label: "Foundation", icon: Church },
    { name: "HOW", label: "How", icon: BookOpen },
    { name: "COMMUNITY", label: "Community", icon: Handshake },
    { name: "BLOGS", label: "Blogs", icon: Rss },
    { name: "SUPPORT", label: "Support", icon: Heart },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* This div creates the background. It's solid on mobile for performance and blurred on desktop. */}
      <div className="absolute inset-0 bg-black/95 md:bg-black/80 md:backdrop-blur-sm" />

      <div className="relative container mx-auto px-4">
        {/* --- DESKTOP HEADER (UNCHANGED) --- */}
        <div className="hidden md:flex items-center justify-between h-20">
          <div className="text-2xl font-bold font-sora text-white">
            Rosary<span className="text-[#FFE552]"> narrated</span>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setView(item.name)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === item.name
                      ? "text-black bg-[#FFE552]"
                      : item.name === "FOUNDATION" || item.name === "HOW"
                        ? "text-white/80 hover:text-white hover:bg-white/10 shadow-[0_0_25px_rgba(255,229,82,0.7)] border border-[#FFE552]/50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="w-0" />
        </div>

        {/* --- MOBILE HEADER (STABILIZED & HYDRATION-SAFE) --- */}
        <div className="md:hidden flex flex-col items-center justify-center space-y-4 py-3 h-[104px]">
          {/* Row 1: Logo */}
          <div className="text-xl font-bold font-sora text-white">
            Rosary<span className="text-[#FFE552]"> narrated</span>
          </div>
          {/* Row 2: Icon Navigation */}
          <TooltipProvider delayDuration={0}>
            <nav className="flex items-center justify-center space-x-2">
              {navItems.map((item) => {
                const isActive = currentView === item.name
                const isHighlighted = item.name === "FOUNDATION" || item.name === "HOW"
                const isGrayed = !isActive && !isHighlighted

                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setView(item.name)}
                        className={`p-2 rounded-full transition-colors ${
                          isActive
                            ? "bg-[#FFE552]"
                            : isHighlighted
                              ? "hover:bg-white/10 shadow-[0_0_20px_rgba(255,229,82,0.9)] border-2 border-[#FFE552]/70"
                              : "hover:bg-white/10"
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 transition-colors ${
                            isActive ? "text-black" : isGrayed ? "text-white/40" : "text-white/80"
                          }`}
                        />
                        <span className="sr-only">{item.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 text-white border-gray-700">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </nav>
          </TooltipProvider>
        </div>
      </div>
    </header>
  )
}
