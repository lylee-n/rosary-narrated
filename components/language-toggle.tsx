"use client"

import { cn } from "@/lib/utils"
import { useApp } from "@/components/app-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useApp()

  return (
    <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full p-1">
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm transition-colors duration-200",
          language === "en"
            ? "bg-[#FFE552] text-gray-900 font-semibold shadow-lg"
            : "bg-transparent text-white hover:bg-gray-700/70",
        )}
      >
        English
      </button>
      <button
        onClick={() => setLanguage("vi")}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm transition-colors duration-200",
          language === "vi"
            ? "bg-[#FFE552] text-gray-900 font-semibold shadow-lg"
            : "bg-transparent text-white hover:bg-gray-700/70",
        )}
      >
        Tiếng Việt
      </button>
    </div>
  )
}
