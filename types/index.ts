import type React from "react"
export type Language = "en" | "vi"

export type ViewType = "ABOUT" | "WHY" | "PLAY" | "COMMUNITY" | "SUPPORT"

export type MysterySetKey = "joyful" | "luminous" | "sorrowful" | "glorious"

export type PerspectiveType = 3 | 7 | 12

// Audio-related types
export interface AudioTrack {
  mysterySetKey: MysterySetKey
  mysteryIndex: number
  perspective: PerspectiveType
  url: string
}

export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  currentTrack: AudioTrack | null
  isLoading: boolean
  error: string | null
}

// Error types
export interface AudioError {
  type: "LOAD_ERROR" | "PLAY_ERROR" | "NETWORK_ERROR"
  message: string
  url?: string
}

export interface AppError {
  type: "AUDIO_ERROR" | "DATA_ERROR" | "NETWORK_ERROR" | "UNKNOWN_ERROR"
  message: string
  details?: unknown
}

// Data types
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

export interface AudioData {
  [mysterySet: string]: {
    [mysteryIndex: number]: {
      [perspective in PerspectiveType]?: string
    }
  }
}

// Navigation types
export interface NavItem {
  name: ViewType
  label: string
  icon: React.ComponentType<{ size?: number }>
}

// Modal types
export interface ModalState {
  isOpen: boolean
  selectedMysterySetIndex: number | null
}

// Component prop types
export interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export interface AudioPlayerProps {
  audioPlayerRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  duration: number
  playbackSpeed: number
  onTimeChange: (time: number) => void
  onSpeedChange: (speed: number) => void
}

// Validation types
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface AudioUrlValidation extends ValidationResult {
  url: string
}
