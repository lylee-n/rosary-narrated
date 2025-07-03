"use client"

import type React from "react"
import { MysteryBead } from "./mystery-bead"
import { MysteryContentDisplay } from "./mystery-content-display"
import type { Mystery, NowPlaying, PerspectiveType } from "@/types"

interface MobileMysteryDisplayProps {
  mysteries: Mystery[]
  expandedMysteryItem: number | null
  nowPlaying: NowPlaying | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  isLoading: boolean
  audioRef: React.RefObject<HTMLAudioElement>
  onToggleMystery: (index: number) => void
  onPlayAudio: (index: number, perspective: PerspectiveType) => void
  onSeek: (time: number) => void
  onSeekBy: (seconds: number) => void
  onPlayPause: () => void
  onSpeedChange: (speed: number) => void
  onPlayNext: () => void
  isLastMystery: boolean
}

export function MobileMysteryDisplay({
  mysteries,
  expandedMysteryItem,
  nowPlaying,
  isPlaying,
  currentTime,
  duration,
  playbackSpeed,
  isLoading,
  audioRef,
  onToggleMystery,
  onPlayAudio,
  onSeek,
  onSeekBy,
  onPlayPause,
  onSpeedChange,
  onPlayNext,
  isLastMystery,
}: MobileMysteryDisplayProps) {
  return (
    <div className="md:hidden">
      <div className="space-y-6">
        {mysteries.map((mystery, index) => (
          <div key={mystery.name} className="flex flex-col items-center text-center">
            <MysteryBead
              index={index}
              isExpanded={expandedMysteryItem === index}
              isPlaying={isPlaying && nowPlaying?.mysteryIndex === index}
              onClick={() => onToggleMystery(index)}
            />
            <div className="mt-4">
              <h3 className="font-bold text-lg text-white">{mystery.name}</h3>
              <p className="text-sm text-white/70">{mystery.fruit}</p>
            </div>
            {expandedMysteryItem === index && (
              <div className="mt-4 w-full max-w-sm mx-auto">
                <MysteryContentDisplay
                  mystery={mystery}
                  mysteryIndex={index}
                  nowPlaying={nowPlaying}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  duration={duration}
                  playbackSpeed={playbackSpeed}
                  isLoading={isLoading}
                  audioRef={audioRef}
                  onPlayAudio={onPlayAudio}
                  onSeek={onSeek}
                  onSeekBy={onSeekBy}
                  onPlayPause={onPlayPause}
                  onSpeedChange={onSpeedChange}
                  onPlayNext={onPlayNext}
                  isLastMystery={isLastMystery}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
