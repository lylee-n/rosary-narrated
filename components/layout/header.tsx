"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Home, HelpCircle, Play, Heart, Mail } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useApp } from "@/components/app-provider"

export function Header() {
  const { setView, currentView } = useApp()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigationItems = [
    { icon: Home, label: "ABOUT", view: "ABOUT" as const },
    { icon: HelpCircle, label: "WHY", view: "WHY" as const },
    { icon: Play, label: "PRAY", view: "PLAY" as const },
    { icon: Heart, label: "SUPPORT", view: "SUPPORT" as const },
    { icon: Mail, label: "CONTACT", view: "CONTACT" as const },
  ]

  const supportButtonElement = (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={() => setView("SUPPORT")}
        className="relative group transition-all duration-300 hover:scale-105"
        aria-label="Support Us"
      >
        <Heart size={48} className="fill-[#FFE552] text-[#FFE552] drop-shadow-lg" />
        <span className="absolute inset-0 flex items-center justify-center text-black text-xs font-bold leading-tight px-1 pt-1">
          Support
          <br />
          Us
        </span>
      </button>
    </div>
  )

  return (
    <>
      {isMounted && createPortal(supportButtonElement, document.body)}

      <header className="w-full flex flex-col items-center">
        <div className="w-full flex justify-start px-8 pt-4">
          <div className="backdrop-blur-sm bg-black/20 rounded-lg px-4 py-2">
            <LanguageToggle />
          </div>
        </div>

        <nav className="flex justify-center mt-4">
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
                  <Icon size={22} />
                </button>

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
    </>
  )
}
