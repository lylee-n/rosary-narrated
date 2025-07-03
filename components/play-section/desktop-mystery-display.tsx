"use client"

import { memo } from "react"
import { MysteryBead } from "./mystery-bead"
import { MysteryContentDisplay } from "./mystery-content-display"
import { PerspectiveButtons } from "./perspective-buttons"
import { AudioPlayer } from "./audio-player"
import type { Mystery, NowPlaying } from "@/types"
import type React from "react"

interface DesktopMysteryDisplayProps {
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

export const DesktopMysteryDisplay = memo(function DesktopMysteryDisplay({
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
}: DesktopMysteryDisplayProps) {
  return (
    <div className="hidden md:block">
      <div className="relative mb-8">
        {/* Connection Line */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-1 bg-[#FFE552] rounded-full shadow-lg shadow-yellow-400/30 ${
            expandedMysteryItem === null ? "animate-[lineRevealLeftToRight_1.5s_ease-out] opacity-0" : ""
          }`}
          style={{
            top: "40px",
            zIndex: 1,
            opacity: expandedMysteryItem !== null ? 0.3 : undefined,
            animationDelay: expandedMysteryItem === null ? "2.5s" : undefined,
            animationFillMode: expandedMysteryItem === null ? "forwards" : undefined,
          }}
        />

        {/* Mystery Beads */}
        <div className="flex justify-between items-start gap-2 lg:gap-4 max-w-6xl mx-auto mt-4 relative z-10">
          {mysteries.map((mystery, index) => (
            <div key={index} className="flex-1">
              <MysteryBead
                index={index}
                isExpanded={expandedMysteryItem === index}
                isOtherExpanded={expandedMysteryItem !== null && expandedMysteryItem !== index}
                onClick={() => onToggleMystery(index)}
                animationDelay={index * 0.4}
              />
              <div className="text-center">
                <h3
                  className={`text-[#FFE552] text-xs lg:text-sm xl:text-base font-semibold mb-2 lg:mb-3 cursor-pointer hover:text-yellow-300 transition-colors duration-300 font-inter px-1 ${
                    expandedMysteryItem !== null && expandedMysteryItem !== index ? "opacity-30" : ""
                  }`}
                  onClick={() => onToggleMystery(index)}
                >
                  {mystery.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Mystery Content */}
      {expandedMysteryItem !== null && (
        <div className="max-w-6xl mx-auto animate-in fade-in duration-300 mb-8">
          <div className="backdrop-blur-md bg-white/15 rounded-2xl p-3 lg:p-4 xl:p-6">
            <div className="grid grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
              <div className="col-span-2">
                <MysteryContentDisplay mystery={mysteries[expandedMysteryItem]} />
              </div>
              <div className="col-span-1">
                <PerspectiveButtons
                  mysteryIndex={expandedMysteryItem}
                  nowPlaying={nowPlaying}
                  isPlaying={isPlaying}
                  onPlay={onPlayAudio}
                />
                {nowPlaying && nowPlaying.mysteryIndex === expandedMysteryItem && (
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
