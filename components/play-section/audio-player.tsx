"use client"

import type React from "react"
import { memo, useCallback } from "react"
import { Play, Pause } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface AudioPlayerProps {
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

// Custom circular skip icons
const SkipBackIcon = () => (
  <div className="relative flex items-center justify-center w-6 h-6">
    <div className="absolute w-5 h-5 border-2 border-current rounded-full" />
    <span className="text-[10px] font-bold">10</span>
    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
      <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-r-[4px] border-transparent border-r-current" />
    </div>
  </div>
)

const SkipForwardIcon = () => (
  <div className="relative flex items-center justify-center w-6 h-6">
    <div className="absolute w-5 h-5 border-2 border-current rounded-full" />
    <span className="text-[10px] font-bold">10</span>
    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
      <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[4px] border-transparent border-l-current" />
    </div>
  </div>
)

export const AudioPlayer = memo(function AudioPlayer({
  audioRef,
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
  const formatTime = useCallback((time: number): string => {
    if (!isFinite(time) || isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }, [])

  const handleProgressChange = useCallback(
    (values: number[]) => {
      const newTime = values[0]
      onSeek(newTime)
    },
    [onSeek],
  )

  const handleSpeedChange = useCallback(
    (values: number[]) => {
      const speed = values[0]
      onSpeedChange(speed)
    },
    [onSpeedChange],
  )

  const handleSkipBack = useCallback(() => {
    onSeekBy(-10)
  }, [onSeekBy])

  const handleSkipForward = useCallback(() => {
    onSeekBy(10)
  }, [onSeekBy])

  return (
    <div className="mt-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
      {/* Progress Bar with custom styling */}
      <div className="mb-4">
        <div className="relative">
          <Slider
            value={[currentTime]}
            onValueChange={handleProgressChange}
            max={duration || 100}
            step={1}
            className="w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-white/20 [&_[role=slider]]:bg-[#82FAFA] [&_[role=slider]]:border-[#82FAFA] [&>span:first-child>span]:bg-[#82FAFA]"
            disabled={!duration || isLoading}
          />
        </div>
        <div className="flex justify-between text-xs text-white/70 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Speed Control Slider */}
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-xs text-white/70 font-medium min-w-[35px]">Speed</span>
          <div className="flex-1">
            <Slider
              value={[playbackSpeed]}
              onValueChange={handleSpeedChange}
              min={0.5}
              max={2}
              step={0.25}
              className="w-full [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/20 [&_[role=slider]]:bg-[#82FAFA] [&_[role=slider]]:border-[#82FAFA] [&>span:first-child>span]:bg-[#82FAFA]"
              disabled={isLoading}
            />
          </div>
          <span className="text-xs text-white/70 font-medium min-w-[30px] text-right">{playbackSpeed}x</span>
        </div>
      </div>

      {/* Playback Controls - Centered */}
      <div className="flex items-center justify-center space-x-2">
        {/* Skip Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkipBack}
          disabled={isLoading || !duration}
          className="text-white hover:text-[#82FAFA] hover:bg-white/10 p-2"
          aria-label="Skip back 10 seconds"
        >
          <SkipBackIcon />
        </Button>

        {/* Play/Pause */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onPlayPause}
          disabled={isLoading || !duration}
          className="text-white hover:text-[#82FAFA] hover:bg-white/10"
          aria-label={isPlaying ? "Pause" : "Play"}
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
          onClick={handleSkipForward}
          disabled={isLoading || !duration}
          className="text-white hover:text-[#82FAFA] hover:bg-white/10 p-2"
          aria-label="Skip forward 10 seconds"
        >
          <SkipForwardIcon />
        </Button>
      </div>
    </div>
  )
})
