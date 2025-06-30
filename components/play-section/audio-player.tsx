"use client"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import type { RefObject } from "react"

interface AudioPlayerProps {
  audioRef: RefObject<HTMLAudioElement>
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

export function AudioPlayer({
  currentTime,
  duration,
  playbackSpeed,
  isPlaying,
  isLoading,
  onSeek,
  onSeekBy,
  onPlayPause,
  onSpeedChange,
}: AudioPlayerProps) {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSliderChange = (value: number[]) => {
    onSeek(value[0])
  }

  return (
    <div className="mt-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm">
      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleSliderChange}
          className="w-full"
          disabled={!duration || isLoading}
        />
        <div className="flex justify-between text-xs text-gray-300 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSeekBy(-10)}
          disabled={isLoading}
          className="text-white hover:text-[#82FAFA]"
        >
          <SkipBack size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onPlayPause}
          disabled={isLoading}
          className="text-white hover:text-[#82FAFA]"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSeekBy(10)}
          disabled={isLoading}
          className="text-white hover:text-[#82FAFA]"
        >
          <SkipForward size={16} />
        </Button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-gray-300">Speed:</span>
        {[0.75, 1, 1.25, 1.5].map((speed) => (
          <Button
            key={speed}
            variant={playbackSpeed === speed ? "default" : "ghost"}
            size="sm"
            onClick={() => onSpeedChange(speed)}
            className={`text-xs ${
              playbackSpeed === speed ? "bg-[#82FAFA] text-black" : "text-white hover:text-[#82FAFA]"
            }`}
          >
            {speed}x
          </Button>
        ))}
      </div>
    </div>
  )
}
