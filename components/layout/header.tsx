"use client"

import { useState } from "react"
import { LanguageToggle } from "@/components/language-toggle"
import { useApp } from "@/components/app-provider"
import { useTranslations } from "@/hooks/use-translations"
import { BookOpen, Compass, Menu, X, Home, HelpCircle, Users, BookText, Heart } from "lucide-react"

export function Header() {
  const { setView, currentView } = useApp()
  const t = useTranslations()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Main navigation items (core functionality only)
  const mainNavItems = [
    { name: "FOUNDATION", label: "Foundation", icon: BookOpen },
    { name: "HOW", label: "How", icon: Compass },
  ]

  // Sidebar navigation items
  const sidebarNavItems = [
    { name: "WHAT", label: "What", icon: Home },
    { name: "WHY", label: "Why", icon: HelpCircle },
    { name: "COMMUNITY", label: "Community", icon: Users },
    { name: "BLOGS", label: "Blogs", icon: BookText },
    { name: "SUPPORT", label: "Support", icon: Heart },
  ]

  return (
    <>
      <header className="w-full flex flex-col items-center">
        {/* Top bar with menu and language toggle */}
        <div className="w-full flex justify-between items-center px-8 pt-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-[#FFE552] transition-colors p-2 rounded-lg hover:bg-white/10"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <div className="backdrop-blur-sm rounded-lg px-4 py-2">
            <LanguageToggle />
          </div>
        </div>

        {/* Main Navigation - Only Foundation and How */}
        <nav className="flex justify-center mt-6">
          <div className="flex items-center space-x-6">
            {mainNavItems.map(({ icon: Icon, label, name }) => {
              const isActive = currentView === name
              const isHovered = hoveredIcon === name

              return (
                <div key={name} className="relative">
                  <button
                    onClick={() => setView(name)}
                    onMouseEnter={() => setHoveredIcon(name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    className={`flex flex-col items-center space-y-2 transition-all duration-300 px-4 py-3 rounded-xl ${
                      isActive
                        ? "text-[#FFE552] bg-white/10 backdrop-blur-sm"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    aria-label={label}
                  >
                    <Icon size={24} />
                    <span className="text-sm font-medium">{label}</span>
                  </button>

                  {isHovered && !isActive && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap z-[60] shadow-lg">
                      {label}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>
      </header>

      {/* Left Sidebar */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)} />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-lg border-r border-white/10 z-50 transform transition-transform duration-300">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-white text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Sidebar Navigation */}
              <nav className="flex-1 p-6">
                <div className="space-y-2">
                  {sidebarNavItems.map(({ icon: Icon, label, name }) => {
                    const isActive = currentView === name

                    return (
                      <button
                        key={name}
                        onClick={() => {
                          setView(name)
                          setSidebarOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          isActive ? "bg-[#FFE552] text-black" : "text-gray-300 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{label}</span>
                      </button>
                    )
                  })}
                </div>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-white/10">
                <div className="text-gray-400 text-sm">
                  <p className="font-medium text-white mb-1">Rosary Course</p>
                  <p>Deepen your prayer life</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
