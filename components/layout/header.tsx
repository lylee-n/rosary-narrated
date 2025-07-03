"use client"

import { useApp } from "@/components/app-provider"
import { BookOpen, Church, Handshake, Heart, HelpCircle, Menu, Rss, Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { NavItem } from "@/lib/types"

export function Header() {
  const { currentView, setView } = useApp()
  const [isOpen, setIsOpen] = useState(false)

  const navItems: NavItem[] = [
    { name: "WHAT", label: "What", icon: Sparkles },
    { name: "WHY", label: "Why", icon: HelpCircle },
    { name: "FOUNDATION", label: "Foundation", icon: Church },
    { name: "HOW", label: "How", icon: BookOpen },
    { name: "COMMUNITY", label: "Community", icon: Handshake },
    { name: "BLOGS", label: "Blogs", icon: Rss },
    { name: "SUPPORT", label: "Support", icon: Heart },
  ]

  const handleNavClick = (viewName: string) => {
    setView(viewName)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-2xl font-bold font-sora text-white">
            Rosary<span className="text-[#FFE552]"> narrated</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setView(item.name)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === item.name
                    ? "text-black bg-[#FFE552]"
                    : item.name === "FOUNDATION" || item.name === "HOW"
                      ? "text-white/80 hover:text-white hover:bg-white/10 shadow-[0_0_25px_rgba(255,229,82,0.8)] border border-[#FFE552]/50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-[#FFE552] hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black/95 border-gray-800">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xl font-bold font-sora text-white">
                    Rosary<span className="text-[#FFE552]"> narrated</span>
                  </div>
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.name)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors text-left ${
                        currentView === item.name
                          ? "text-black bg-[#FFE552]"
                          : item.name === "FOUNDATION" || item.name === "HOW"
                            ? "text-white/80 hover:text-white hover:bg-white/10 shadow-[0_0_15px_rgba(255,229,82,0.6)] border border-[#FFE552]/30"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
