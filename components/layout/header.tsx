"use client"

import { useApp } from "@/components/app-provider"
import { BookOpen, Church, Handshake, Heart, HelpCircle, Menu, Rss, Sparkles } from "lucide-react"
import type { NavItem } from "@/lib/types"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

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

  const handleNavItemClick = (viewName: NavItem["name"]) => {
    setView(viewName)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - always visible */}
          <div className="text-2xl font-bold font-sora text-white">
            Rosary<span className="text-[#FFE552]"> narrated</span>
          </div>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavItemClick(item.name)}
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

          {/* Mobile Navigation - hamburger menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-white">
                  <Menu size={24} />
                  <span className="sr-only">Open menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/90 border-l-gray-800 text-white">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold font-sora text-white">
                    Rosary<span className="text-[#FFE552]"> narrated</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <button
                        onClick={() => handleNavItemClick(item.name)}
                        className={`text-lg py-2 px-4 rounded-md text-left ${
                          currentView === item.name ? "bg-[#FFE552] text-black" : "text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </button>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Empty div for desktop layout spacing, ensures logo is left and nav is centered */}
          <div className="hidden md:block w-0" />
        </div>
      </div>
    </header>
  )
}
