export interface RosaryMysterySet {
  title: string
  backgroundImage: string
  mysteries: RosaryMystery[]
}

export interface RosaryMystery {
  title: string
  significance: string
  reflection: string
  image: string
  decades: MysteryDecade[]
}

export interface MysteryDecade {
  title: string
  audioId: string
  beads: BeadType[]
}

export type BeadType =
  | "Our Father"
  | "Hail Mary"
  | "Glory Be"
  | "Fatima Prayer"
  | "Hail Holy Queen"
  | "Sign of the Cross"
  | "Apostles Creed"

export interface AudioData {
  id: string
  url: string
}

export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  playbackRate: number
  loop: boolean
  error: AudioError | null
  isLoading: boolean
}

export interface AudioError {
  code: number
  message: string
}

export interface AudioPlayerControls {
  play: () => void
  pause: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  setPlaybackRate: (rate: number) => void
  setLoop: (loop: boolean) => void
}

export interface AudioPlayerProps {
  src: string
  volume?: number
  playbackRate?: number
  loop?: boolean
  autoplay?: boolean
}

export interface MysteryImage {
  src: string
  alt: string
}
