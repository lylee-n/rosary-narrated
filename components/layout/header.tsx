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
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-2xl font-bold font-sora text-white">
            Rosary<span className="text-[#FFE552]"> narrated</span>
          </div>

          {/* Desktop Navigation (Unchanged) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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

          {/* Mobile Icon Navigation */}
          <div className="md:hidden">
            <TooltipProvider delayDuration={0}>
              <nav className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setView(item.name)}
                        className={`p-2 rounded-full transition-colors ${
                          currentView === item.name ? "bg-[#FFE552]" : "hover:bg-white/10"
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 ${currentView === item.name ? "text-black" : "text-white/80"}`}
                        />
                        <span className="sr-only">{item.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/80 text-white border-gray-700">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  )
}
