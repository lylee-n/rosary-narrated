"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { audioData } from "@/lib/audio-data"
import type { MysterySetKey, PerspectiveType, NowPlaying } from "@/types"

interface UseAudioPlayerReturn {
  nowPlaying: NowPlaying | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  isLoading: boolean
  error: string | null
  audioRef: React.RefObject<HTMLAudioElement>
  play: (mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType) => void
  pause: () => void
  seek: (time: number) => void
  seekBy: (seconds: number) => void
  setPlaybackSpeed: (speed: number) => void
  cleanup: () => void
  clearError: () => void
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeedState] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setNowPlaying(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setIsLoading(false)
    setError(null)
  }, [])

  const play = useCallback(
    (mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType) => {
      const audioUrl = audioData[mysterySetKey]?.[mysteryIndex]?.[perspective]

      if (!audioUrl) {
        setError("Audio not available for this selection")
        return
      }

      if (!audioRef.current) {
        setError("Audio player not initialized")
        return
      }

      setError(null)
      setIsLoading(true)

      const newNowPlaying: NowPlaying = {
        src: audioUrl,
        mysterySetKey,
        mysteryIndex,
        perspective,
      }

      // If same audio is already loaded, just play/pause
      if (nowPlaying?.src === audioUrl) {
        if (audioRef.current.paused) {
          audioRef.current.play().catch((err) => {
            setError("Failed to play audio")
            setIsLoading(false)
          })
        } else {
          audioRef.current.pause()
        }
        return
      }

      // Load new audio
      setNowPlaying(newNowPlaying)
      audioRef.current.src = audioUrl
      audioRef.current.load()
    },
    [nowPlaying],
  )

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const seekBy = useCallback(
    (seconds: number) => {
      if (audioRef.current) {
        const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
      }
    },
    [currentTime, duration],
  )

  const setPlaybackSpeed = useCallback((speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
      setPlaybackSpeedState(speed)
    }
  }, [])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedData = () => {
      setDuration(audio.duration)
      setIsLoading(false)
      audio.play().catch((err) => {
        setError("Failed to play audio")
        setIsLoading(false)
      })
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      setError("Failed to load audio")
      setIsLoading(false)
      setIsPlaying(false)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
    }
  }, [nowPlaying])

  return {
    nowPlaying,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    error,
    audioRef,
    play,
    pause,
    seek,
    seekBy,
    setPlaybackSpeed,
    cleanup,
    clearError,
  }
}
