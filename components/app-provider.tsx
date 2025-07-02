"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { ViewType, Language, AppError } from "@/types"

interface AppContextType {
  // Language state
  language: Language
  setLanguage: (language: Language) => void

  // Navigation state
  currentView: ViewType
  setView: (view: ViewType) => void

  // Global loading state
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // Global error state
  error: AppError | null
  setError: (error: AppError | null) => void
  clearError: () => void

  // Utility functions
  handleError: (error: unknown, type?: AppError["type"]) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Language state
  const [language, setLanguage] = useState<Language>("en")

  // Navigation state
  const [currentView, setCurrentView] = useState<ViewType>("PLAY")

  // Global loading state
  const [isLoading, setIsLoading] = useState(false)

  // Global error state
  const [error, setError] = useState<AppError | null>(null)

  // Navigation handler
  const setView = useCallback((view: ViewType) => {
    setCurrentView(view)
    // Clear any errors when navigating
    setError(null)
  }, [])

  // Error handlers
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const handleError = useCallback((error: unknown, type: AppError["type"] = "UNKNOWN_ERROR") => {
    console.error("App error:", error)

    if (error instanceof Error) {
      setError({
        type,
        message: error.message,
        details: error,
      })
    } else if (typeof error === "string") {
      setError({
        type,
        message: error,
      })
    } else {
      setError({
        type,
        message: "An unexpected error occurred",
        details: error,
      })
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
