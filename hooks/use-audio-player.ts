"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { audioData } from "@/lib/audio-data"
import type { NowPlaying, MysterySetKey, PerspectiveType } from "@/types"

export function useAudioPlayer() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)

  // Update current time
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleError = () => {
      setError("Failed to load audio")
      setIsLoading(false)
      setIsPlaying(false)
    }
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [nowPlaying])

  // Update playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  const play = useCallback(
    (mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType) => {
      const audioUrl = audioData[mysterySetKey]?.[mysteryIndex]?.[perspective]

      if (!audioUrl) {
        setError("Audio not available for this selection")
        return
      }

      const audio = audioRef.current
      if (!audio) return

      setError(null)
      setIsLoading(true)

      // If same track, just resume
      if (nowPlaying?.src === audioUrl) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
            setIsLoading(false)
          })
          .catch(() => {
            setError("Failed to play audio")
            setIsLoading(false)
          })
        return
      }

      // Load new track
      const newTrack: NowPlaying = {
        src: audioUrl,
        mysterySetKey,
        mysteryIndex,
        perspective,
      }

      setNowPlaying(newTrack)
      audio.src = audioUrl
      audio.load()

      audio.addEventListener("canplaythrough", function onCanPlay() {
        audio.removeEventListener("canplaythrough", onCanPlay)
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
            setIsLoading(false)
          })
          .catch(() => {
            setError("Failed to play audio")
            setIsLoading(false)
          })
      })
    },
    [nowPlaying],
  )

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      setIsPlaying(false)
    }
  }, [])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const seekBy = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (audio) {
      const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds))
      audio.currentTime = newTime
      setCurrentTime(newTime)
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
    setError(null)
    setIsLoading(false)
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
