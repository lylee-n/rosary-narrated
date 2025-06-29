"use client"

import type React from "react"
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react"

type Section = "ABOUT" | "WHY" | "PLAY" | "COMMUNITY" | "SUPPORT"

interface AppContextType {
  language: "en" | "vi"
  setLanguage: Dispatch<SetStateAction<"en" | "vi">>
  currentView: Section
  setView: (view: Section) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"en" | "vi">("en")
  const [currentView, setCurrentView] = useState<Section>("ABOUT")

  const setView = (view: Section) => {
    setCurrentView(view)
  }

  return <AppContext.Provider value={{ language, setLanguage, currentView, setView }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
