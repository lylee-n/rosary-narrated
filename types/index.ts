import type { LucideIcon } from "lucide-react"

// Navigation types
export interface NavItem {
  name: ViewType
  label: string
  icon: LucideIcon
}

export type ViewType = "WHAT" | "WHY" | "PLAY" | "ABOUT" | "COMMUNITY" | "BLOGS" | "SUPPORT"

// Mystery types
export type MysterySetKey = "joyful" | "luminous" | "sorrowful" | "glorious"

export interface MysterySet {
  name: string
  mysteries: string[]
}

export interface MysteryData {
  [key: string]: MysterySet
}

// Perspective types
export type PerspectiveType = 3 | 7 | 12

// Audio types
export interface AudioData {
  [key: string]: {
    [key: string]: string
  }
}

// Rosary guide types
export interface RosaryElement {
  id: string
  type: "mystery" | "decade" | "stem" | "cross"
  title: string
  content: string[]
  isActive?: boolean
}

export interface RosaryConnection {
  from: string
  to: string
}

export interface DailyMystery {
  day: string
  mystery: string
  set: MysterySetKey
}

export interface RosaryPosition {
  top: number
  left: number
}

export interface StepData {
  title: string
  content: string[]
}

// App context types
export interface AppContextType {
  currentView: ViewType
  setView: (view: ViewType) => void
  language: "en" | "vi"
  setLanguage: (lang: "en" | "vi") => void
}
