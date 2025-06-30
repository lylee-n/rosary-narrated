export const MYSTERY_SET_KEYS = ["joyful", "luminous", "sorrowful", "glorious"] as const

export const PERSPECTIVE_OPTIONS = [3, 7, 12] as const

export const PLAYBACK_SPEEDS = [
  { value: 0.5, label: "0.5x" },
  { value: 0.75, label: "0.75x" },
  { value: 1, label: "1x" },
  { value: 1.25, label: "1.25x" },
  { value: 1.5, label: "1.5x" },
  { value: 2, label: "2x" },
] as const

export const AUDIO_SEEK_STEP = 10 // seconds
