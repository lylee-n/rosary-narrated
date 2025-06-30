"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type View = "ABOUT" | "WHY" | "PRAY" | "COMMUNITY" | "SUPPORT"

interface AppContextType {
  view: View
  setView: (view: View) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [view, setView] = useState<View>("ABOUT")

  const value: AppContextType = {
    view,
    setView,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
