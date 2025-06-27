"use client"

import { useState } from "react"
import { Home, HelpCircle, Play, Heart, Mail } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useApp } from "@/components/app-provider"

export function Header() {
  const { setView, currentView } = useApp()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const navigationItems = [
    { icon: Home, label: "ABOUT", view: "ABOUT" as const },
    { icon: HelpCircle, label: "WHY", view: "WHY" as const },
    { icon: Play, label: "PRAY", view: "PLAY" as const },
    { icon: Heart, label: "SUPPORT", view: "SUPPORT" as const },
    { icon: Mail, label: "CONTACT", view: "CONTACT" as const },
  ]

  return (
    <header className="w-full flex flex-col items-center space-y-8">
      {/* Language Toggle */}
      <div className="backdrop-blur-sm bg-black/20 rounded-lg px-4 py-2">
        <LanguageToggle />
      </div>

      {/* Navigation Menu */}
      <nav className="flex justify-center">
        <ul className="flex items-center space-x-10 md:space-x-12">
          {navigationItems.map(({ icon: Icon, label, view }) => (
            <li key={view} className="relative">
              <button
                onClick={() => setView(view)}
                onMouseEnter={() => setHoveredIcon(view)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`flex flex-col items-center space-y-2 transition-colors duration-300 ${
                  currentView === view ? "text-[#FFE552]" : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={20} />
              </button>

              {/* Custom Tooltip */}
              {hoveredIcon === view && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap z-[60] shadow-lg">
                  {label}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
