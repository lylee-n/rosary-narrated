"use client"

import type React from "react"
import { PerspectiveSelector } from "./perspective-selector"
import { AudioPlayer } from "./audio-player"
import type { Mystery, NowPlaying, PerspectiveType } from "@/types"

interface MysteryContentDisplayProps {
  mystery: Mystery
  mysteryIndex: number
  nowPlaying: NowPlaying | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  isLoading: boolean
  audioRef: React.RefObject<HTMLAudioElement>
  onPlayAudio: (index: number, perspective: PerspectiveType) => void
  onSeek: (time: number) => void
  onSeekBy: (seconds: number) => void
  onPlayPause: () => void
  onSpeedChange: (speed: number) => void
  onPlayNext: () => void
  isLastMystery: boolean
}

export function MysteryContentDisplay({
  mystery,
  mysteryIndex,
  nowPlaying,
  isPlaying,
  currentTime,
  duration,
  playbackSpeed,
  isLoading,
  audioRef,
  onPlayAudio,
  onSeek,
  onSeekBy,
  onPlayPause,
  onSpeedChange,
  onPlayNext,
  isLastMystery,
}: MysteryContentDisplayProps) {
  const handlePerspectiveSelect = (perspective: PerspectiveType) => {
    onPlayAudio(mysteryIndex, perspective)
  }

  return (
    <div className="w-full space-y-4">
      <PerspectiveSelector
        mysteryIndex={mysteryIndex}
        onSelect={handlePerspectiveSelect}
        currentPerspective={nowPlaying?.mysteryIndex === mysteryIndex ? nowPlaying.perspective : null}
      />
      <AudioPlayer
        audioRef={audioRef}
        currentTime={currentTime}
        duration={duration}
        playbackSpeed={playbackSpeed}
        isPlaying={isPlaying}
        isLoading={isLoading}
        onSeek={onSeek}
        onSeekBy={onSeekBy}
        onPlayPause={onPlayPause}
        onSpeedChange={onSpeedChange}
        onNext={onPlayNext}
        isNextDisabled={isLastMystery}
      />
    </div>
  )
}
