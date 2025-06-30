"use client"

import type React from "react"
import { useCallback } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
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

export function AudioPlayer({
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
    if (!isFinite(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }, [])

  const handleProgressChange = useCallback(
    (value: number[]) => {
      onSeek(value[0])
    },
    [onSeek],
  )

  const handleSpeedChange = useCallback(
    (value: string) => {
      onSpeedChange(Number.parseFloat(value))
    },
    [onSpeedChange],
  )

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 mt-4 space-y-3">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleProgressChange}
          className="w-full"
          disabled={!duration || isLoading}
        />
        <div className="flex justify-between text-xs text-gray-300">
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
            disabled={!duration || isLoading}
            className="text-white hover:text-[#82FAFA] hover:bg-white/10"
          >
            <SkipBack size={16} />
          </Button>

          {/* Play/Pause */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onPlayPause}
            disabled={!duration || isLoading}
            className="text-white hover:text-[#82FAFA] hover:bg-white/10"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
            disabled={!duration || isLoading}
            className="text-white hover:text-[#82FAFA] hover:bg-white/10"
          >
            <SkipForward size={16} />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <Volume2 size={14} className="text-gray-400" />
          <Select value={playbackSpeed.toString()} onValueChange={handleSpeedChange}>
            <SelectTrigger className="w-20 h-8 text-xs bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
              <SelectItem value="2">2x</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
