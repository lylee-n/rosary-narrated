"use client"

import { memo } from "react"
import { MysteryContentDisplay } from "./mystery-content-display"
import { PerspectiveButtons } from "./perspective-buttons"
import { AudioPlayer } from "./audio-player"
import type { Mystery, NowPlaying } from "@/types"
import type React from "react"

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
  onPlayAudio: (mysteryIndex: number, perspective: 3 | 7 | 12) => void
  onSeek: (time: number) => void
  onSeekBy: (seconds: number) => void
  onPlayPause: () => void
  onSpeedChange: (speed: number) => void
}

export const MobileMysteryDisplay = memo(function MobileMysteryDisplay({
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
}: MobileMysteryDisplayProps) {
  return (
    <div className="md:hidden space-y-4 pb-8">
      {mysteries.map((mystery, index) => (
        <div
          key={index}
          className="relative animate-[beadReveal_0.8s_ease-out] opacity-0"
          style={{
            animationDelay: `${index * 0.4}s`,
            animationFillMode: "forwards",
          }}
        >
          <div
            className={`w-10 h-10 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-gray-900 text-base cursor-pointer transition-all duration-300 mx-auto mb-4 ${
              expandedMysteryItem === index ? "scale-110 shadow-[0_0_20px_rgba(255,229,82,0.8)]" : "hover:scale-105"
            }`}
            onClick={() => onToggleMystery(index)}
          >
            {index + 1}
          </div>
          <div
            className={`rounded-2xl p-4 text-center transition-all duration-300 ${
              expandedMysteryItem === index ? "backdrop-blur-md bg-white/15" : "bg-transparent"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 cursor-pointer transition-colors duration-300 font-inter ${
                expandedMysteryItem === index
                  ? "text-white hover:text-gray-300"
                  : "text-[#FFE552] hover:text-yellow-300"
              }`}
              onClick={() => onToggleMystery(index)}
            >
              {mystery.title}
            </h3>
            {expandedMysteryItem === index && (
              <div className="text-white text-sm leading-relaxed space-y-4 animate-in fade-in duration-300 text-left">
                <MysteryContentDisplay mystery={mystery} />
                <div className="mt-6">
                  <PerspectiveButtons
                    mysteryIndex={index}
                    nowPlaying={nowPlaying}
                    isPlaying={isPlaying}
                    onPlay={onPlayAudio}
                  />
                </div>
                {nowPlaying && nowPlaying.mysteryIndex === index && (
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
                  />
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
})
