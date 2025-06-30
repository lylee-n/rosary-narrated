"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X, Home, HelpCircle, Play, Users, Heart } from "lucide-react"
import { useApp } from "@/components/app-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { view, setView } = useApp()

  const navItems = [
    { id: "ABOUT", label: "About", icon: Home },
    { id: "WHY", label: "Why", icon: HelpCircle },
    { id: "PLAY", label: "Pray", icon: Play },
    { id: "COMMUNITY", label: "Community", icon: Users },
    { id: "SUPPORT", label: "Support", icon: Heart },
  ]

  const handleNavClick = (viewId: string) => {
    setView(viewId)
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/rosary-narrated-logo.png"
              alt="Rosary Narrated"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-white font-sora text-xl font-bold">Rosary Narrated</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = view === item.id
              const isPrayIcon = item.id === "PLAY"

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-all duration-300 ${
                      isPrayIcon
                        ? isActive || view === "PLAY"
                          ? "fill-current text-[#FFE552] drop-shadow-[0_0_8px_rgba(255,229,82,0.6)]"
                          : "fill-current text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:text-[#FFE552] hover:drop-shadow-[0_0_8px_rgba(255,229,82,0.6)]"
                        : ""
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = view === item.id
                const isPrayIcon = item.id === "PLAY"

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`transition-all duration-300 ${
                        isPrayIcon
                          ? isActive || view === "PLAY"
                            ? "fill-current text-[#FFE552] drop-shadow-[0_0_8px_rgba(255,229,82,0.6)]"
                            : "fill-current text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                          : ""
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
