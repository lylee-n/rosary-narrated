"use client"

import { useApp } from "@/components/app-provider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { BookOpen, Church, HandHelping, Heart, Home, Rss, Sparkles } from "lucide-react"
import Image from "next/image"

const navItems = [
  { view: "foundation", icon: Church, label: "Foundation" },
  { view: "why", icon: Sparkles, label: "Why" },
  { view: "what", icon: Home, label: "What" },
  { view: "how", icon: BookOpen, label: "How" },
  { view: "community", icon: HandHelping, label: "Community" },
  { view: "blogs", icon: Rss, label: "Blogs" },
  { view: "support", icon: Heart, label: "Support" },
]

export function Header() {
  const { view, setView } = useApp()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm"
      style={{ transform: "translateZ(0)" }} // Keep header on its own rendering layer
    >
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex h-20 items-center justify-between">
          <div className="flex items-center space-x-2" onClick={() => setView("foundation")} role="button">
            <Image src="/images/rosary-narrated-logo.png" alt="Rosary Narrated Logo" width={40} height={40} />
            <span className="text-xl font-bold text-white">Rosary Narrated</span>
          </div>
          <TooltipProvider>
            <nav className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Tooltip key={item.view}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "text-white/70 hover:text-white hover:bg-white/10",
                        view === item.view && "text-yellow-400 bg-white/10",
                      )}
                      onClick={() => setView(item.view)}
                    >
                      <item.icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </nav>
          </TooltipProvider>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex flex-col items-center justify-center pt-4 pb-2">
          <div className="flex items-center space-x-2 mb-3" onClick={() => setView("foundation")} role="button">
            <Image src="/images/rosary-narrated-logo.png" alt="Rosary Narrated Logo" width={32} height={32} />
            <span className="text-lg font-bold text-white">Rosary Narrated</span>
          </div>
          <TooltipProvider>
            <nav className="flex w-full justify-around">
              {navItems.map((item) => (
                <Button
                  key={item.view}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "text-white/70 flex-1",
                    view === item.view && "text-yellow-400",
                    (item.view === "foundation" || item.view === "how") &&
                      view === item.view &&
                      "shadow-[0_0_15px_rgba(250,204,21,0.7)] rounded-full",
                  )}
                  onClick={() => setView(item.view)}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              ))}
            </nav>
          </TooltipProvider>
        </div>
      </div>
    </header>
  )
}
