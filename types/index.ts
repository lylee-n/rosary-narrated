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

export interface NowPlaying {
  mysterySetIndex: number
  mysteryIndex: number
  perspective: string
}

export interface MysterySet {
  title: string
  backgroundImage: string
  mysteries: Mystery[]
}

export interface Mystery {
  title: string
  description: string
  audioUrl: string
  reflections: {
    child: string
    youth: string
    adult: string
  }
}

export interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export interface PerspectiveButtonsProps {
  selectedPerspective: string
  onPerspectiveChange: (perspective: string) => void
  disabled?: boolean
}

export interface MysteryBeadProps {
  index: number
  isActive: boolean
  isCompleted: boolean
  title: string
  onClick: () => void
}

export interface MysteryContentDisplayProps {
  mystery: Mystery
  perspective: string
}
