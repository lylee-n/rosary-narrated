import type React from "react"

// Mystery Set Types
export type MysterySetKey = "joyful" | "luminous" | "sorrowful" | "glorious"
export type PerspectiveType = 3 | 7 | 12

// Audio Types
export interface NowPlaying {
  src: string
  mysterySetKey: MysterySetKey
  mysteryIndex: number
  perspective: PerspectiveType
}

export interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  duration: number
  playbackSpeed: number
  isPlaying: boolean
  isLoading: boolean
  onSeek: (time: number) => void
  onSeekBy: (seconds: number) => void
  onPlayPause: () => void
  onSpeedChange: (speed: number) => void
}

// Mystery Data Types
export interface Mystery {
  title: string
  description: string
  image?: string
}

export interface MysterySet {
  title: string
  mysteries: Mystery[]
  color: string
  image?: string
}

// Component Props
export interface MysteryCardProps {
  mystery: Mystery
  index: number
  isSelected: boolean
  onClick: () => void
}

export interface PerspectiveSelectorProps {
  selectedPerspective: PerspectiveType
  onPerspectiveChange: (perspective: PerspectiveType) => void
  disabled?: boolean
}

// Language Types
export type Language = "en" | "vi"

// Theme Types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: unknown
}

// Navigation Types
export interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType
}

// Form Types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

// Modal Types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

// Button Types
export interface CustomButtonProps {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

// Layout Types
export interface LayoutProps {
  children: React.ReactNode
  className?: string
}

// Section Types
export interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
}

// Animation Types
export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: string
}

// Responsive Types
export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
}

// State Management Types
export interface AppState {
  language: Language
  theme: "light" | "dark"
  isLoading: boolean
  error: AppError | null
}

// Hook Return Types
export interface UseAudioPlayerReturn {
  nowPlaying: NowPlaying | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  isLoading: boolean
  error: string | null
  audioRef: React.RefObject<HTMLAudioElement>
  play: (mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType) => void
  pause: () => void
  seek: (time: number) => void
  seekBy: (seconds: number) => void
  setPlaybackSpeed: (speed: number) => void
  cleanup: () => void
  clearError: () => void
}

export interface UseTranslationsReturn {
  t: (key: string) => string
  language: Language
  setLanguage: (language: Language) => void
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>
