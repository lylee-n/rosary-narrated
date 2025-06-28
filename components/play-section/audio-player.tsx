"use client"

import type React from "react"
import { PlayCircle, PauseCircle, Rewind, FastForward } from "lucide-react"

interface AudioPlayerProps {
  audioPlayerRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  setCurrentTime: (time: number) => void
  duration: number
  playbackSpeed: number
  setPlaybackSpeed: (speed: number) => void
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function AudioPlayer({
  audioPlayerRef,
  currentTime,
  setCurrentTime,
  duration,
  playbackSpeed,
  setPlaybackSpeed,
}: AudioPlayerProps) {
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioPlayerRef.current || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    audioPlayerRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleRewind = (seconds: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = Math.max(0, audioPlayerRef.current.currentTime - seconds)
    }
  }

  const handleFastForward = (seconds: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = Math.min(
        audioPlayerRef.current.duration,
        audioPlayerRef.current.currentTime + seconds,
      )
    }
  }

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.playbackRate = speed
    }
  }

  const togglePlayPause = () => {
    if (audioPlayerRef.current) {
      if (audioPlayerRef.current.paused) {
        audioPlayerRef.current.play().catch(console.error)
      } else {
        audioPlayerRef.current.pause()
      }
    }
  }

  return (
    <div className="mt-4 lg:mt-6 space-y-3 lg:space-y-4 p-3 lg:p-4 bg-black/40 rounded-lg">
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
      <div className="space-y-2">
        <label className="text-xs lg:text-sm text-[#82FAFA] font-inter">Speed: {playbackSpeed}x</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.25"
          value={playbackSpeed}
          onChange={(e) => handleSpeedChange(Number.parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>0.5x</span>
          <span>1x</span>
          <span>1.5x</span>
          <span>2x</span>
        </div>
      </div>
      <div className="flex justify-center gap-3 lg:gap-4">
        <button
          onClick={() => handleRewind(10)}
          className="text-[#82FAFA] hover:text-white transition-colors duration-200"
          aria-label="Rewind 10 seconds"
        >
          <Rewind size={20} />
        </button>
        <button
          onClick={togglePlayPause}
          className="text-[#82FAFA] hover:text-white transition-colors duration-200"
          aria-label={audioPlayerRef.current?.paused ? "Play" : "Pause"}
        >
          {audioPlayerRef.current && !audioPlayerRef.current.paused ? (
            <PauseCircle size={24} />
          ) : (
            <PlayCircle size={24} />
          )}
        </button>
        <button
          onClick={() => handleFastForward(10)}
          className="text-[#82FAFA] hover:text-white transition-colors duration-200"
          aria-label="Fast forward 10 seconds"
        >
          <FastForward size={20} />
        </button>
      </div>
    </div>
  )
}
