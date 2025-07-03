"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { ViewType, Language, AppError } from "@/lib/types"

interface AppContextType {
  language: Language
  setLanguage: (language: Language) => void
  currentView: ViewType
  setView: (view: ViewType) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: AppError | null
  setError: (error: AppError | null) => void
  clearError: () => void
  handleError: (error: unknown, type?: AppError["type"]) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  // FORCING "WHAT" VIEW ON LOAD TO DEBUG
  const [currentView, setCurrentView] = useState<ViewType>("WHAT")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AppError | null>(null)

  const setView = useCallback((view: ViewType) => {
    setCurrentView(view)
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const handleError = useCallback((error: unknown, type: AppError["type"] = "UNKNOWN_ERROR") => {
    console.error("App error:", error)
    if (error instanceof Error) {
      setError({ type, message: error.message, details: error })
    } else if (typeof error === "string") {
      setError({ type, message: error })
    } else {
      setError({ type, message: "An unexpected error occurred", details: error })
    }
  }, [])

  const contextValue: AppContextType = {
    language,
    setLanguage,
    currentView,
    setView,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError,
    handleError,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
