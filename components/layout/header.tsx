"use client"

import { useState } from "react"
import { LanguageToggle } from "@/components/language-toggle"
import { useApp } from "@/components/app-provider"
import { useTranslations } from "@/hooks/use-translations"
import { BookOpen, Compass, Users, Heart, Menu, X } from "lucide-react"

export function Header() {
  const { setView, currentView } = useApp()
  const t = useTranslations()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Primary navigation items (core functionality)
  const primaryNavItems = [
    { name: "FOUNDATION", label: "Learn", icon: BookOpen, description: "Master the Rosary" },
    { name: "HOW", label: "Practice", icon: Compass, description: "Guided Prayer" },
  ]

  // Secondary navigation items (supporting features)
  const secondaryNavItems = [
    { name: "WHAT", label: "About", icon: null },
    { name: "WHY", label: "Why", icon: null },
    { name: "COMMUNITY", label: "Community", icon: Users },
    { name: "BLOGS", label: "Insights", icon: null },
    { name: "SUPPORT", label: "Support", icon: Heart },
  ]

  const NavButton = ({ item, isPrimary = false }: { item: any; isPrimary?: boolean }) => {
    const isActive = currentView === item.name
    const isHovered = hoveredIcon === item.name

    return (
      <button
        onClick={() => setView(item.name)}
        onMouseEnter={() => setHoveredIcon(item.name)}
        onMouseLeave={() => setHoveredIcon(null)}
        className={`
          relative group transition-all duration-300 
          ${
            isPrimary
              ? `px-6 py-3 rounded-xl font-semibold text-sm
               ${
                 isActive
                   ? "bg-gradient-to-r from-[#FFE552] to-[#FFE552]/80 text-black shadow-lg shadow-[#FFE552]/25"
                   : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
               }`
              : `px-3 py-2 text-sm font-medium
               ${isActive ? "text-[#FFE552]" : "text-gray-300 hover:text-white"}`
          }
        `}
        aria-label={item.label}
      >
        <div className="flex items-center gap-2">
          {item.icon && <item.icon size={isPrimary ? 18 : 16} />}
          <span>{item.label}</span>
        </div>

        {isPrimary && item.description && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs opacity-60">
            {item.description}
          </div>
        )}

        {/* Hover tooltip for secondary items */}
        {!isPrimary && isHovered && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap z-[60] shadow-lg">
            {item.label}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
          </div>
        )}
      </button>
    )
  }

  return (
    <header className="w-full">
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col items-center">
        {/* Language Toggle */}
        <div className="w-full flex justify-end px-8 pt-4">
          <div className="backdrop-blur-sm rounded-lg px-4 py-2">
            <LanguageToggle />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col items-center mt-6 space-y-6">
          {/* Primary Actions (Core Features) */}
          <div className="flex items-center gap-4">
            {primaryNavItems.map((item) => (
              <NavButton key={item.name} item={item} isPrimary={true} />
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="flex items-center space-x-6">
            {secondaryNavItems.map((item) => (
              <NavButton key={item.name} item={item} isPrimary={false} />
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-white font-bold text-lg">Rosary Course</div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 z-50">
            <div className="px-4 py-6 space-y-4">
              {/* Primary Actions */}
              <div className="space-y-3 pb-4 border-b border-white/10">
                <div className="text-[#FFE552] text-sm font-semibold uppercase tracking-wide">Core Features</div>
                {primaryNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setView(item.name)
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                      ${
                        currentView === item.name
                          ? "bg-[#FFE552] text-black"
                          : "bg-white/5 text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <item.icon size={20} />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm opacity-70">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Secondary Navigation */}
              <div className="space-y-2">
                <div className="text-gray-400 text-sm font-semibold uppercase tracking-wide">More</div>
                {secondaryNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setView(item.name)
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-all
                      ${
                        currentView === item.name ? "text-[#FFE552]" : "text-gray-300 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {item.icon && <item.icon size={18} />}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
