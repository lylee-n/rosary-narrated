import type React from "react"
// Core types for the Rosary application

export type Language = "en" | "vi"

export type MysterySetKey = "joyful" | "luminous" | "sorrowful" | "glorious"

export type PerspectiveType = 3 | 7 | 12

// Audio related types
export interface AudioData {
  [key: string]: {
    [mysteryIndex: number]: {
      [perspective in PerspectiveType]?: string
    }
  }
}

export interface AudioTrack {
  mysterySetKey: MysterySetKey
  mysteryIndex: number
  perspective: PerspectiveType
  url: string
}

export interface AudioError {
  type: "PLAY_ERROR" | "LOAD_ERROR" | "NETWORK_ERROR"
  message: string
  url?: string
}

// Rosary data types
export interface Mystery {
  title: string
  significance: string
  reflection: string
}

export interface MysterySet {
  title: string
  backgroundImage: string
  mysteries: Mystery[]
}

export interface RosaryData {
  [key: number]: MysterySet
}

// UI Component types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

// Audio Player types
export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  currentTrack: AudioTrack | null
  isLoading: boolean
  error: string | null
}

export interface NowPlaying {
  src: string
  mysterySetKey: MysterySetKey
  mysteryIndex: number
  perspective: PerspectiveType
}

// Validation types
export interface AudioUrlValidation {
  url: string
  isValid: boolean
  errors: string[]
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}
