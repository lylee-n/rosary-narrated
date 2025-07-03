"use client"

import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useApp } from "@/components/app-provider"
import { useIsMobile } from "@/lib/hooks/use-mobile"
import { Home, HelpCircle, BookOpen, Users, Heart } from "lucide-react"

const navItems = [
  { href: "foundation", icon: Home, label: "Foundation" },
  { href: "why", icon: HelpCircle, label: "Why" },
  { href: "how", icon: BookOpen, label: "How" },
  { href: "community", icon: Users, label: "Community" },
  { href: "support", icon: Heart, label: "Support" },
]

export function Header() {
  const { view, setView } = useApp()
  const isMobile = useIsMobile()

  const handleNavClick = (newView: string) => {
    setView(newView)
  }

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {isMobile ? (
            // Mobile Header
            <div className="flex flex-col items-center justify-center h-[104px] py-2">
              <div className="flex items-center mb-2">
                <Image src="/images/rosary-narrated-logo.png" alt="Rosary Narrated" width={40} height={40} />
                <h1 className="ml-2 text-xl font-bold text-white font-sora">Rosary Narrated</h1>
              </div>
              <nav>
                <ul className="flex items-center space-x-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleNavClick(item.href)}
                            className={`p-2 rounded-full transition-colors duration-200 ${
                              view === item.href
                                ? "bg-yellow-400 text-black"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            } ${(item.href === "foundation" || item.href === "how") && view === item.href ? "shadow-[0_0_15px_rgba(250,204,21,0.7)]" : ""}`}
                          >
                            <item.icon className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ) : (
            // Desktop Header
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="flex items-center" onClick={() => handleNavClick("foundation")}>
                <Image src="/images/rosary-narrated-logo.png" alt="Rosary Narrated" width={48} height={48} />
                <h1 className="ml-3 text-2xl font-bold text-white font-sora">Rosary Narrated</h1>
              </Link>
              <nav>
                <ul className="flex items-center space-x-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                          view === item.href
                            ? "bg-yellow-400 text-black"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        } ${(item.href === "foundation" || item.href === "how") && view === item.href ? "shadow-[0_0_15px_rgba(250,204,21,0.7)]" : ""}`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>
    </TooltipProvider>
  )
}
