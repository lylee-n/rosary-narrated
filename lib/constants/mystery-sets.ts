import type { MysterySetKey, PerspectiveType } from "@/lib/types"

export const MYSTERY_SET_KEYS: readonly MysterySetKey[] = ["joyful", "luminous", "sorrowful", "glorious"] as const

export const PERSPECTIVE_OPTIONS: readonly PerspectiveType[] = [3, 7, 12] as const

export const PLAYBACK_SPEEDS = [
  { value: 0.5, label: "0.5x" },
  { value: 0.75, label: "0.75x" },
  { value: 1, label: "1x" },
  { value: 1.25, label: "1.25x" },
  { value: 1.5, label: "1.5x" },
  { value: 2, label: "2x" },
] as const

export const AUDIO_SEEK_STEP = 10 // seconds

export const MYSTERY_SET_DISPLAY_NAMES: Record<MysterySetKey, string> = {
  joyful: "Joyful Mysteries",
  luminous: "Luminous Mysteries",
  sorrowful: "Sorrowful Mysteries",
  glorious: "Glorious Mysteries",
} as const

export const DEFAULT_MYSTERY_SET_INDEX = 0
export const DEFAULT_PLAYBACK_SPEED = 1
export const DEFAULT_VOLUME = 0.7
