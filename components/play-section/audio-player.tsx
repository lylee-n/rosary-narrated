"use client"

import type React from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  duration: number
  playbackSpeed: number
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  onSeek: (time: number) => void
  onSeekBy: (seconds: number) => void
  onPlayPause: () => void
  onSpeedChange: (speed: number) => void
  onClearError?: () => void
}

export function AudioPlayer({
  audioRef,
  currentTime,
  duration,
  playbackSpeed,
  isPlaying,
  isLoading,
  error,
  onSeek,
  onSeekBy,
  onPlayPause,
  onSpeedChange,
  onClearError,
}: AudioPlayerProps) {
  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleProgressChange = (value: number[]) => {
    onSeek(value[0])
  }

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-400 text-sm">{error}</span>
          </div>
          {onClearError && (
            <Button variant="ghost" size="sm" onClick={onClearError} className="text-red-400 hover:text-red-300">
              Dismiss
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 mt-4 border border-white/10">
      <audio ref={audioRef} preload="metadata" />

      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleProgressChange}
          className="w-full"
          disabled={!duration || isLoading}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Skip Back */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSeekBy(-10)}
            disabled={isLoading || !duration}
            className="text-white hover:text-[#82FAFA]"
          >
            <SkipBack size={16} />
          </Button>

          {/* Play/Pause */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onPlayPause}
            disabled={isLoading || !duration}
            className="text-white hover:text-[#82FAFA]"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </Button>

          {/* Skip Forward */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSeekBy(10)}
            disabled={isLoading || !duration}
            className="text-white hover:text-[#82FAFA]"
          >
            <SkipForward size={16} />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <Volume2 size={14} className="text-gray-400" />
          <select
            value={playbackSpeed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="bg-black/50 text-white text-xs rounded px-2 py-1 border border-white/20 focus:border-[#82FAFA] focus:outline-none"
            disabled={isLoading}
          >
            {speedOptions.map((speed) => (
              <option key={speed} value={speed}>
                {speed}x
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
