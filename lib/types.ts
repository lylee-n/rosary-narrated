import type { LucideIcon } from "lucide-react"

// Rosary specific types
export interface Mystery {
  title: string
  significance: string
  reflection: string
}

export interface MysteryData {
  title: string
  mysteries: Mystery[]
}

export interface RosaryElement {
  id: string
  type: "cross" | "stem" | "mystery" | "hail-mary" | "final" | "spacer"
  title: string
  content: { subtitle: string; text: string }[]
}

// Main navigation view types (removed BLOGS)
export type ViewType = "WHAT" | "WHY" | "FOUNDATION" | "HOW" | "COMMUNITY" | "SUPPORT" | "PRIVACY"

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
