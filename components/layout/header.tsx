"use client"

import { useApp } from "@/components/app-provider"
import { BookOpen, Church, Handshake, Heart, HelpCircle, Menu, Rss, Sparkles } from "lucide-react"
import type { NavItem } from "@/lib/types"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

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

  const handleNavClick = (viewName: string) => {
    setView(viewName)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="text-2xl font-bold font-sora text-white">
            Rosary<span className="text-[#FFE552]"> narrated</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  currentView === item.name
                    ? "bg-[#FFE552] text-black"
                    : item.name === "FOUNDATION" || item.name === "HOW"
                      ? "border border-[#FFE552]/50 text-white/80 shadow-[0_0_25px_rgba(255,229,82,0.8)] hover:bg-white/10 hover:text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/90 border-l-gray-800 text-white">
                <div className="grid gap-4 py-6">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <button
                        onClick={() => handleNavClick(item.name)}
                        className={`-mx-3 flex items-center gap-4 rounded-lg px-3 py-2 text-base font-semibold ${
                          currentView === item.name ? "bg-[#FFE552] text-black" : "hover:bg-white/10"
                        }`}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        {item.label}
                      </button>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
