"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { audioData } from "@/lib/audio-data"
import type { MysterySetKey, PerspectiveType, NowPlaying } from "@/types"

export function useAudioPlayer() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeedState] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio()
      audioRef.current.preload = "none"
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration || 0)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      setNowPlaying(null)
      setCurrentTime(0)
    }
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleError = (e: Event) => {
      setIsLoading(false)
      setIsPlaying(false)
      setError("Failed to load audio. Please try again.")
      console.error("Audio error:", e)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  const play = useCallback(
    (mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType) => {
      const audio = audioRef.current
      if (!audio) return

      const audioSrc = audioData[mysterySetKey]?.[mysteryIndex]?.[perspective]
      if (!audioSrc) {
        setError("Audio not available for this selection.")
        return
      }

      setError(null)

      // If same track is already playing, just resume
      if (nowPlaying?.src === audioSrc && audio.paused) {
        audio.play().catch((err) => {
          setError("Failed to play audio. Please try again.")
          console.error("Play error:", err)
        })
        return
      }

      // If different track, load new audio
      if (nowPlaying?.src !== audioSrc) {
        audio.src = audioSrc
        audio.playbackRate = playbackSpeed
        setNowPlaying({
          src: audioSrc,
          mysterySetKey,
          mysteryIndex,
          perspective,
        })
      }

      audio.play().catch((err) => {
        setError("Failed to play audio. Please try again.")
        console.error("Play error:", err)
      })
    },
    [nowPlaying, playbackSpeed],
  )

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (audio && !audio.paused) {
      audio.pause()
    }
  }, [])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0))
    }
  }, [])

  const seekBy = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (audio) {
      const newTime = audio.currentTime + seconds
      audio.currentTime = Math.max(0, Math.min(newTime, audio.duration || 0))
    }
  }, [])

  const setPlaybackSpeed = useCallback((speed: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.playbackRate = speed
      setPlaybackSpeedState(speed)
    }
  }, [])

  const cleanup = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.src = ""
    }
    setNowPlaying(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setIsLoading(false)
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

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
