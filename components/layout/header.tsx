"use client"

import { useApp } from "@/components/app-provider"

export function Header() {
  const { view, setView } = useApp()

  const navItems = ["WHAT", "WHY", "HOW", "FOUNDATION", "COMMUNITY", "BLOGS", "SUPPORT"]

  const getButtonClass = (itemView: string) => {
    const baseClass = "capitalize font-sora transition-all duration-300"
    if (view === itemView) {
      return `${baseClass} text-yellow-400`
    }
    return `${baseClass} text-white hover:text-yellow-400`
  }

  const getGlowClass = (itemView: string) => {
    if (itemView === "FOUNDATION" || itemView === "HOW") {
      return "shadow-[0_0_25px_rgba(255,229,82,0.8)] border border-yellow-400/50 rounded-full px-4 py-1"
    }
    return ""
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-20 flex items-center relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <a href="#" className="text-2xl font-sora font-bold" onClick={() => setView("WHAT")}>
            <span className="text-white">Rosary</span> <span className="text-yellow-400">narrated</span>
          </a>
        </div>

        <nav className="w-full">
          <ul className="flex items-center justify-center space-x-8">
            {navItems.map((item) => (
              <li key={item} className={getGlowClass(item)}>
                <button onClick={() => setView(item)} className={getButtonClass(item)}>
                  {item.toLowerCase()}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
