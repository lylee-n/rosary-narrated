"use client"

import type React from "react"
import { useState } from "react"
import { PlayCircle, PauseCircle, Rewind, FastForward } from "lucide-react"

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  duration: number
  isPlaying: boolean
  playbackSpeed: number
  onSeek: (time: number) => void
  onSeekBy: (seconds: number) => void
  onPlayPause: () => void
  onSpeedChange: (speed: number) => void
}

const formatTime = (seconds: number): string => {
  if (!seconds || !isFinite(seconds)) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function AudioPlayer({
  audioRef,
  currentTime,
  duration,
  isPlaying,
  playbackSpeed,
  onSeek,
  onSeekBy,
  onPlayPause,
  onSpeedChange,
}: AudioPlayerProps) {
  const [showSpeedControl, setShowSpeedControl] = useState(false)

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    onSeek(newTime)
  }

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  return (
    <div className="mt-4 lg:mt-6 space-y-6 lg:space-y-8 p-3 lg:p-4 pb-6 lg:pb-8 bg-white/20 rounded-lg backdrop-blur-sm">
      <div className="space-y-2">
        <div className="flex justify-between text-xs lg:text-sm text-[#82FAFA]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="w-full h-2 bg-gray-600 rounded-full cursor-pointer" onClick={handleProgressClick}>
          <div
            className="h-full bg-[#82FAFA] rounded-full transition-all duration-100"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center pb-2">
        {/* Center-aligned audio controls */}
        <div className="flex-1 flex justify-center items-center gap-3 lg:gap-4">
          <button
            onClick={() => onSeekBy(-10)}
            className="text-[#82FAFA] hover:text-white transition-colors duration-200"
            aria-label="Rewind 10 seconds"
          >
            <Rewind size={20} />
          </button>
          <button
            onClick={onPlayPause}
            className="text-[#82FAFA] hover:text-white transition-colors duration-200"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
          </button>
          <button
            onClick={() => onSeekBy(10)}
            className="text-[#82FAFA] hover:text-white transition-colors duration-200"
            aria-label="Fast forward 10 seconds"
          >
            <FastForward size={20} />
          </button>
        </div>

        {/* Right-aligned speed control */}
        <div className="relative">
          <button
            onClick={() => setShowSpeedControl(!showSpeedControl)}
            className="text-[#82FAFA] hover:text-white transition-colors duration-200 text-xs lg:text-sm font-inter"
          >
            Speed: {playbackSpeed}x
          </button>

          {showSpeedControl && (
            <div className="absolute bottom-full right-0 mb-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 border border-gray-300 shadow-lg">
              <div className="flex flex-col gap-1">
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      onSpeedChange(speed)
                      setShowSpeedControl(false)
                    }}
                    className={`px-3 py-1 text-xs rounded transition-colors duration-200 ${
                      playbackSpeed === speed ? "bg-[#82FAFA] text-white font-semibold" : "text-black hover:bg-gray-200"
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
