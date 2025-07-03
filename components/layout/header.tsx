"use client"

import { useApp } from "@/components/app-provider"
import { CustomButton } from "@/components/ui/custom-button"
import { BookOpen, Church, Handshake, Heart, HelpCircle, Rss, Sparkles } from "lucide-react"
import type { NavItem } from "@/lib/types"

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
          <div className="text-2xl font-bold font-sora text-white">
            Rosary<span className="text-[#FFE552]">.narrated</span>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setView(item.name)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === item.name
                    ? "text-black bg-[#FFE552]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block">
            <CustomButton variant="yellow" size="sm">
              Pray Now
            </CustomButton>
          </div>
        </div>
      </div>
    </header>
  )
}
