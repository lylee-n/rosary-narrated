import type React from "react"
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

export interface Mystery {
  id: string
  title: string
  description: string
  reflection: string
  audioUrl?: string
  imageUrl?: string
}

export interface MysterySet {
  id: string
  title: string
  description: string
  mysteries: Mystery[]
  backgroundImage?: string
  color: string
}

export interface RosaryData {
  [key: string]: MysterySet
}

export interface NowPlaying {
  mysterySetIndex: number
  mysteryIndex: number
  perspective: "child" | "teen" | "adult"
}

export interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export interface PerspectiveButtonsProps {
  selectedPerspective: "child" | "teen" | "adult"
  onPerspectiveChange: (perspective: "child" | "teen" | "adult") => void
}

export interface MysteryBeadProps {
  mystery: Mystery
  index: number
  isActive: boolean
  isCompleted: boolean
  onClick: () => void
}

export interface MysteryContentDisplayProps {
  mystery: Mystery
  perspective: "child" | "teen" | "adult"
}
