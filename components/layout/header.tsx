"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useApp } from "@/components/app-provider"
import { BookOpen, Church, CircleHelp, Home, MessageSquareHeart, Sparkles, Users } from "lucide-react"
import { useMobile } from "@/lib/hooks/use-mobile"

const navItems = [
  { href: "foundation", icon: Home, label: "Foundation" },
  { href: "what", icon: CircleHelp, label: "What" },
  { href: "why", icon: Sparkles, label: "Why" },
  { href: "how", icon: Church, label: "How" },
  { href: "community", icon: Users, label: "Community" },
  { href: "blogs", icon: BookOpen, label: "Blogs" },
  { href: "support", icon: MessageSquareHeart, label: "Support" },
]

export function Header() {
  const { view, setView } = useApp()
  const isMobile = useMobile()

  const NavLink = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string
    icon: React.ElementType
    label: string
  }) => {
    const isActive = view === href
    const isSpecialIcon = label === "Foundation" || label === "How"
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`#${href}`}
            onClick={() => setView(href)}
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
              isActive ? "bg-yellow-400/20 text-yellow-400" : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <div
              className={`relative ${
                isActive && isSpecialIcon ? "shadow-[0_0_15px_5px_rgba(250,204,21,0.5)] rounded-full" : ""
              }`}
            >
              <Icon className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-20 py-2 md:py-0">
            <div className="flex items-center">
              <Image
                src="/images/rosary-narrated-logo.png"
                alt="Rosary Narrated"
                width={isMobile ? 40 : 50}
                height={isMobile ? 40 : 50}
                className="mr-3"
              />
              <h1 className="text-xl md:text-2xl font-bold text-white font-sora">Rosary Narrated</h1>
            </div>
            <nav className="flex items-center justify-center space-x-2 md:space-x-3 mt-2 md:mt-0">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
