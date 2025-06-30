"use client"

import type React from "react"
import { memo, useCallback } from "react"
import { Play, Pause, Volume2 } from "lucide-react"
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

// Custom circular 10-second icons
const SkipBack10Icon = () => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 8l-2 2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="absolute text-[10px] font-bold">10</span>
  </div>
)

const SkipForward10Icon = () => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 8l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="absolute text-[10px] font-bold">10</span>
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
      {/* Progress Bar with Custom Styling */}
      <div className="mb-4">
        <div className="relative">
          <Slider
            value={[currentTime]}
            onValueChange={handleProgressChange}
            max={duration || 100}
            step={1}
            className="w-full [&_[role=slider]]:bg-[#82FAFA] [&_[role=slider]]:border-[#82FAFA] [&_.slider-track]:bg-[#82FAFA] [&_.slider-range]:bg-[#82FAFA]"
            disabled={!duration || isLoading}
          />
          <style jsx>{`
            .slider-track {
              background-color: #82FAFA !important;
            }
            .slider-range {
              background-color: #82FAFA !important;
            }
          `}</style>
        </div>
        <div className="flex justify-between text-xs text-white/70 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Skip Back 10 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkipBack}
            disabled={isLoading || !duration}
            className="text-white hover:text-[#82FAFA] hover:bg-white/10"
            aria-label="Skip back 10 seconds"
          >
            <SkipBack10Icon />
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

          {/* Skip Forward 10 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkipForward}
            disabled={isLoading || !duration}
            className="text-white hover:text-[#82FAFA] hover:bg-white/10"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward10Icon />
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
