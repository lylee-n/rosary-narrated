"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { ViewType, AppContextType } from "@/types"

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentView, setCurrentView] = useState<ViewType>("WHAT")
  const [language, setLanguage] = useState<"en" | "vi">("en")

  const setView = (view: ViewType) => {
    setCurrentView(view)
  }

  const setLanguageHandler = (lang: "en" | "vi") => {
    setLanguage(lang)
  }

  return (
    <AppContext.Provider
      value={{
        currentView,
        setView,
        language,
        setLanguage: setLanguageHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
