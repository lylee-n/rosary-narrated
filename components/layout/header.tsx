"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, Twitter, Sun, Moon, Menu, X, Users } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface HeaderProps {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigation = [
    { name: "ABOUT", href: "/about" },
    { name: "BLOG", href: "/blog" },
    { name: "PROJECTS", href: "/projects" },
    { name: "COMMUNITY", href: "/community" },
    { name: "CONTACT", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
        className,
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-2xl">
          My Website
        </Link>
        <div className="hidden md:flex items-center gap-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="hover:underline">
              {item.name}
            </Link>
          ))}
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5" />
          </Link>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-1 rounded-full hover:bg-secondary"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          )}
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container py-4 flex flex-col items-center gap-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="hover:underline">
                {item.name}
                {item.name === "COMMUNITY" && <Users className="h-5 w-5" />}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </Link>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="p-1 rounded-full hover:bg-secondary"
                >
                  {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
