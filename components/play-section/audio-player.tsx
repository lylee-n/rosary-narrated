"use client"

import type React from "react"

import { memo, useCallback } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    (value: string) => {
      const speed = Number.parseFloat(value)
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

  const speedOptions = [
    { value: "0.5", label: "0.5x" },
    { value: "0.75", label: "0.75x" },
    { value: "1", label: "1x" },
    { value: "1.25", label: "1.25x" },
    { value: "1.5", label: "1.5x" },
    { value: "2", label: "2x" },
  ]

  return (
    <div className="mt-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          onValueChange={handleProgressChange}
          max={duration || 100}
          step={1}
          className="w-full"
          disabled={!duration || isLoading}
        />
        <div className="flex justify-between text-xs text-white/70 mt-1">
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
            onClick={handleSkipBack}
            disabled={isLoading || !duration}
            className="text-white hover:text-[#82FAFA] hover:bg-white/10"
            aria-label="Skip back 10 seconds"
          >
            <SkipBack size={16} />
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
            className="text-white hover:text-[#82FAFA] hover:bg-white/10"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward size={16} />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <Volume2 size={14} className="text-white/70" />
          <Select value={playbackSpeed.toString()} onValueChange={handleSpeedChange} disabled={isLoading}>
            <SelectTrigger className="w-16 h-8 text-xs bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {speedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
})
