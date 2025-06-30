"use client"

import { useEffect, useState, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import { Loader2, Play, Pause, Volume2, VolumeX, FastForward, Rewind } from "lucide-react"

interface AudioPlayerComponentProps {
  src: string
  autoplay?: boolean
  onEnded?: () => void
  onTimeUpdate?: (currentTime: number) => void
  initialVolume?: number
  initialPlaybackRate?: number
}

export function AudioPlayer({
  src,
  autoplay = false,
  onEnded,
  onTimeUpdate,
  initialVolume = 1,
  initialPlaybackRate = 1,
}: AudioPlayerComponentProps) {
  const [playerState, playerControls] = useAudioPlayer({
    src,
    autoplay,
    volume: initialVolume,
    playbackRate: initialPlaybackRate,
  })

  const [volume, setVolume] = useState(playerState.volume)
  const [playbackRate, setPlaybackRate] = useState(playerState.playbackRate)
  const [isMuted, setIsMuted] = useState(false)
  const prevVolumeRef = useRef(initialVolume)

  useEffect(() => {
    setVolume(playerState.volume)
    setPlaybackRate(playerState.playbackRate)
  }, [playerState.volume, playerState.playbackRate])

  useEffect(() => {
    if (playerState.isPlaying && onTimeUpdate) {
      onTimeUpdate(playerState.currentTime)
    }
  }, [playerState.currentTime, playerState.isPlaying, onTimeUpdate])

  useEffect(() => {
    if (!playerState.isPlaying && playerState.currentTime === playerState.duration && playerState.duration > 0) {
      onEnded?.()
    }
  }, [playerState.isPlaying, playerState.currentTime, playerState.duration, onEnded])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100
    setVolume(newVolume)
    playerControls.setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      playerControls.setVolume(prevVolumeRef.current)
      setVolume(prevVolumeRef.current)
      setIsMuted(false)
    } else {
      prevVolumeRef.current = volume // Save current volume before muting
      playerControls.setVolume(0)
      setVolume(0)
      setIsMuted(true)
    }
  }

  const handleSeek = (value: number[]) => {
    playerControls.seek(value[0])
  }

  const handlePlaybackRateChange = (rate: number) => {
    playerControls.setPlaybackRate(rate)
    setPlaybackRate(rate)
  }

  if (playerState.error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-900/20 rounded-lg">Error: {playerState.error.message}</div>
    )
  }

  return (
    <div className="w-full bg-gray-800 rounded-xl p-4 shadow-lg">
      {playerState.isLoading && (
        <div className="flex items-center justify-center py-4 text-white">
          <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading Audio...
        </div>
      )}
      {!playerState.isLoading && (
        <>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300 text-sm tabular-nums">{formatTime(playerState.currentTime)}</span>
            <Slider
              value={[playerState.currentTime]}
              max={playerState.duration}
              step={0.1}
              onValueChange={handleSeek}
              className="flex-grow mx-4"
              disabled={playerState.isLoading || playerState.duration === 0}
            />
            <span className="text-gray-300 text-sm tabular-nums">{formatTime(playerState.duration)}</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => playerControls.seek(playerState.currentTime - 10)}>
              <Rewind className="h-6 w-6 text-gray-300" />
              <span className="sr-only">Rewind 10 seconds</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={playerState.isPlaying ? playerControls.pause : playerControls.play}
              className="bg-[#FFE552] hover:bg-[#FFD700] rounded-full p-2"
            >
              {playerState.isPlaying ? (
                <Pause className="h-8 w-8 text-gray-900" />
              ) : (
                <Play className="h-8 w-8 text-gray-900" />
              )}
              <span className="sr-only">{playerState.isPlaying ? "Pause" : "Play"}</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => playerControls.seek(playerState.currentTime + 10)}>
              <FastForward className="h-6 w-6 text-gray-300" />
              <span className="sr-only">Fast forward 10 seconds</span>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5 text-gray-300" />
              ) : (
                <Volume2 className="h-5 w-5 text-gray-300" />
              )}
              <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
            </Button>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-24"
              disabled={playerState.isLoading}
            />
            <div className="flex items-center gap-1 ml-4">
              <span className="text-gray-300 text-sm">Speed:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePlaybackRateChange(1)}
                className={cn("text-gray-300", { "font-bold text-[#FFE552]": playbackRate === 1 })}
              >
                1x
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePlaybackRateChange(1.25)}
                className={cn("text-gray-300", { "font-bold text-[#FFE552]": playbackRate === 1.25 })}
              >
                1.25x
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePlaybackRateChange(1.5)}
                className={cn("text-gray-300", { "font-bold text-[#FFE552]": playbackRate === 1.5 })}
              >
                1.5x
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
