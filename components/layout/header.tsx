"use client"

import { useApp } from "@/components/app-provider"
import { Button } from "@/components/ui/button"

export function Header() {
  const { view, setView } = useApp()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/images/rosary-narrated-logo.png" alt="Rosary Narrated" className="h-8 w-8" />
            <span className="text-xl font-bold">
              <span className="text-white">Rosary </span>
              <span className="text-[#FFE552]">narrated</span>
            </span>
          </div>

          {/* Centered Navigation */}
          <nav className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-8">
              <Button
                variant="ghost"
                onClick={() => setView("WHAT")}
                className={`text-white hover:text-[#FFE552] transition-colors ${
                  view === "WHAT" ? "text-[#FFE552]" : ""
                }`}
              >
                What
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView("WHY")}
                className={`text-white hover:text-[#FFE552] transition-colors ${
                  view === "WHY" ? "text-[#FFE552]" : ""
                }`}
              >
                Why
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView("FOUNDATION")}
                className={`text-white hover:text-[#FFE552] transition-colors ${
                  view === "FOUNDATION" ? "text-[#FFE552]" : ""
                } shadow-[0_0_25px_rgba(255,229,82,0.7)] border border-[#FFE552]/50`}
              >
                Foundation
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView("HOW")}
                className={`text-white hover:text-[#FFE552] transition-colors ${
                  view === "HOW" ? "text-[#FFE552]" : ""
                } shadow-[0_0_25px_rgba(255,229,82,0.7)] border border-[#FFE552]/50`}
              >
                How
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView("COMMUNITY")}
                className={`text-white hover:text-[#FFE552] transition-colors ${
                  view === "COMMUNITY" ? "text-[#FFE552]" : ""
                }`}
              >
                Community
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView("BLOGS")}
                className={`text-white hover:text-[#FFE552] transition-colors ${
                  view === "BLOGS" ? "text-[#FFE552]" : ""
                }`}
              >
                Blogs
              </Button>
              <Button
                variant="ghost"
                onClick={() => setView("SUPPORT")}
                className={`text-white hover:text-[#FFE552] transition-colors ${
                  view === "SUPPORT" ? "text-[#FFE552]" : ""
                }`}
              >
                Support
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
