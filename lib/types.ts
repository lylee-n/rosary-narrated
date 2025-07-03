import type { LucideIcon } from "lucide-react"

export interface Mystery {
  title: string
  significance: string
  reflection: string
}

// Main navigation view types
export type ViewType = "WHAT" | "WHY" | "FOUNDATION" | "HOW" | "COMMUNITY" | "BLOGS" | "SUPPORT"

// Language options
export type Language = "en" | "vi"

// App error structure
export interface AppError {
  type: "AUDIO_ERROR" | "DATA_ERROR" | "UI_ERROR" | "UNKNOWN_ERROR"
  message: string
  details?: unknown
}

// Navigation item structure
export interface NavItem {
  name: ViewType
  label: string
  icon: LucideIcon
}

// Mystery and perspective types
export type MysterySetKey = "joyful" | "luminous" | "sorrowful" | "glorious"
export type PerspectiveType = 3 | 7 | 12
