"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { dataService } from "@/lib/services/data-service"
import type { MysterySetKey, PerspectiveType } from "@/types"

interface NowPlaying {
  src: string
  mysterySetKey: MysterySetKey
  mysteryIndex: number
  perspective: PerspectiveType
}

interface AudioPlayerState {
  nowPlaying: NowPlaying | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  isLoading: boolean
  error: string | null
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    nowPlaying: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackSpeed: 1,
    isLoading: false,
    error: null,
  })

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = "none"
    }

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      setState((prev) => ({ ...prev, currentTime: audio.currentTime }))
    }

    const handleLoadedMetadata = () => {
      setState((prev) => ({
        ...prev,
        duration: audio.duration,
        isLoading: false,
        error: null,
      }))
    }

    const handleEnded = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
      }))
    }

    const handleError = () => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
        error: "Failed to load or play audio. Please try again.",
      }))
    }

    const handleLoadStart = () => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }))
    }

    const handleCanPlay = () => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    }

    const handlePlay = () => {
      setState((prev) => ({ ...prev, isPlaying: true }))
    }

    const handlePause = () => {
      setState((prev) => ({ ...prev, isPlaying: false }))
    }

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      // Cleanup event listeners
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [])

  const play = useCallback(
    async (mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType) => {
      if (!audioRef.current) return

      const audio = audioRef.current
      const url = dataService.getAudioUrl(mysterySetKey, mysteryIndex, perspective)

      if (!url) {
        setState((prev) => ({
          ...prev,
          error: "Audio not available for this selection",
        }))
        return
      }

      const newTrack: NowPlaying = { src: url, mysterySetKey, mysteryIndex, perspective }
      const isSameTrack = state.nowPlaying?.src === url

      try {
        if (isSameTrack && audio.paused) {
          // Resume current track
          await audio.play()
        } else if (isSameTrack && !audio.paused) {
          // Pause current track
          audio.pause()
        } else {
          // Load and play new track
          audio.src = url
          audio.playbackRate = state.playbackSpeed
          audio.load()

          setState((prev) => ({
            ...prev,
            nowPlaying: newTrack,
            error: null,
          }))

          await audio.play()
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isPlaying: false,
          error: error instanceof Error ? error.message : "Failed to play audio",
        }))
      }
    },
    [state.nowPlaying, state.playbackSpeed],
  )

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
        nowPlaying: null,
      }))
    }
  }, [])

  const seek = useCallback(
    (time: number) => {
      if (audioRef.current && state.duration) {
        const clampedTime = Math.max(0, Math.min(time, state.duration))
        audioRef.current.currentTime = clampedTime
        setState((prev) => ({ ...prev, currentTime: clampedTime }))
      }
    },
    [state.duration],
  )

  const seekBy = useCallback(
    (seconds: number) => {
      seek(state.currentTime + seconds)
    },
    [seek, state.currentTime],
  )

  const setPlaybackSpeed = useCallback((speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
      setState((prev) => ({ ...prev, playbackSpeed: speed }))
    }
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }
    setState((prev) => ({
      ...prev,
      nowPlaying: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      error: null,
    }))
  }, [])

  return {
    // State
    nowPlaying: state.nowPlaying,
    isPlaying: state.isPlaying,
    currentTime: state.currentTime,
    duration: state.duration,
    playbackSpeed: state.playbackSpeed,
    isLoading: state.isLoading,
    error: state.error,

    // Audio element ref
    audioRef,

    // Actions
    play,
    pause,
    stop,
    seek,
    seekBy,
    setPlaybackSpeed,
    clearError,
    cleanup,
  }
}
