"use client"

import { useState } from "react"
import { LanguageToggle } from "@/components/language-toggle"
import { useApp } from "@/components/app-provider"
import { useTranslations } from "@/hooks/use-translations"
import { NAV_ITEMS } from "@/constants"

export function Header() {
  const { setView, currentView } = useApp()
  const t = useTranslations()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  return (
    <header className="w-full flex flex-col items-center">
      <div className="w-full flex justify-end px-8 pt-4">
        <div className="backdrop-blur-sm rounded-lg px-4 py-2">
          <LanguageToggle />
        </div>
      </div>

      <nav className="flex justify-center mt-4">
        <ul className="flex items-center space-x-10 md:space-x-12">
          {NAV_ITEMS.map(({ icon: Icon, label, name }) => {
            const translatedLabel = t.nav[label.toLowerCase() as keyof typeof t.nav] || label
            const isPrayIcon = name === "PLAY"

            return (
              <li key={name} className="relative">
                <button
                  onClick={() => setView(name)}
                  onMouseEnter={() => setHoveredIcon(name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className={`flex flex-col items-center space-y-2 transition-all duration-300 relative ${
                    currentView === name
                      ? isPrayIcon
                        ? "text-[#FFE552]"
                        : "text-[#FFE552]"
                      : isPrayIcon
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                  } ${
                    isPrayIcon && (hoveredIcon === name || currentView === name)
                      ? "drop-shadow-[0_0_8px_rgba(255,229,82,0.6)]"
                      : isPrayIcon
                        ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        : ""
                  }`}
                  aria-label={translatedLabel}
                >
                  <Icon size={22} className={isPrayIcon ? "fill-current" : ""} />
                </button>

                {hoveredIcon === name && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap z-[60] shadow-lg">
                    {translatedLabel}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
