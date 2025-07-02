"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAudioPlayer } from "@/hooks/use-audio-player"

interface AudioPlayerProps {
  audioUrl: string
  title?: string
  onEnded?: () => void
}

export function AudioPlayer({ audioUrl, title, onEnded }: AudioPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    play,
    pause,
    seek,
    setVolume,
    skipForward,
    skipBackward,
  } = useAudioPlayer(audioUrl, onEnded)

  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Update playback rate when speed changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleProgressChange = (value: number[]) => {
    seek(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleSpeedChange = (value: number[]) => {
    setPlaybackSpeed(value[0])
  }

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 border border-gray-700">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {title && (
        <div className="mb-4">
          <h4 className="text-white font-medium text-sm truncate">{title}</h4>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleProgressChange}
          className="w-full"
          disabled={isLoading}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || 0)}</span>
        </div>
      </div>

      {/* Speed Control Slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Speed</span>
          <span className="text-xs text-gray-400">{playbackSpeed}x</span>
        </div>
        <Slider
          value={[playbackSpeed]}
          min={0.5}
          max={2}
          step={0.25}
          onValueChange={handleSpeedChange}
          className="w-full"
        />
      </div>

      {/* Playback Controls - Centered */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={skipBackward}
          disabled={isLoading}
          className="text-white hover:text-[#82FAFA] hover:bg-white/10"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={isPlaying ? pause : play}
          disabled={isLoading}
          className="text-white hover:text-[#82FAFA] hover:bg-white/10"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={skipForward}
          disabled={isLoading}
          className="text-white hover:text-[#82FAFA] hover:bg-white/10"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-gray-400" />
        <Slider value={[volume]} max={1} step={0.1} onValueChange={handleVolumeChange} className="flex-1" />
      </div>
    </div>
  )
}
