"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { dataService } from "@/lib/services/data-service"
import type { MysterySetKey, PerspectiveType } from "@/types"

interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  isLoading: boolean
  error: string | null
  currentTrack: {
    mysterySetKey: MysterySetKey
    mysteryIndex: number
    perspective: PerspectiveType
    url: string
  } | null
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackSpeed: 1,
    isLoading: false,
    error: null,
    currentTrack: null,
  })

  // Update current time
  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setState((prev) => ({
        ...prev,
        currentTime: audioRef.current?.currentTime || 0,
        duration: audioRef.current?.duration || 0,
      }))
    }
  }, [])

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadStart = () => setState((prev) => ({ ...prev, isLoading: true, error: null }))
    const handleCanPlay = () => setState((prev) => ({ ...prev, isLoading: false }))
    const handlePlay = () => setState((prev) => ({ ...prev, isPlaying: true }))
    const handlePause = () => setState((prev) => ({ ...prev, isPlaying: false }))
    const handleEnded = () => setState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }))
    const handleError = () => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
        error: "Failed to load audio. Please try again.",
      }))
    }

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("timeupdate", updateTime)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("timeupdate", updateTime)
    }
  }, [updateTime])

  // Load and play audio
  const playAudio = useCallback(
    async (mysterySetKey: MysterySetKey, mysteryIndex: number, perspective: PerspectiveType) => {
      const audio = audioRef.current
      if (!audio) return

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }))

        const url = dataService.getAudioUrl(mysterySetKey, mysteryIndex, perspective)
        if (!url) {
          throw new Error("Audio not available for this selection")
        }

        // If same track is playing, just toggle play/pause
        if (
          state.currentTrack &&
          state.currentTrack.mysterySetKey === mysterySetKey &&
          state.currentTrack.mysteryIndex === mysteryIndex &&
          state.currentTrack.perspective === perspective
        ) {
          if (state.isPlaying) {
            audio.pause()
          } else {
            await audio.play()
          }
          return
        }

        // Load new track
        audio.src = url
        audio.playbackRate = state.playbackSpeed

        setState((prev) => ({
          ...prev,
          currentTrack: {
            mysterySetKey,
            mysteryIndex,
            perspective,
            url,
          },
        }))

        await audio.play()
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isPlaying: false,
          error: error instanceof Error ? error.message : "Failed to play audio",
        }))
      }
    },
    [state.currentTrack, state.isPlaying, state.playbackSpeed],
  )

  // Toggle play/pause
  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !state.currentTrack) return

    try {
      if (state.isPlaying) {
        audio.pause()
      } else {
        await audio.play()
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to play audio",
        isPlaying: false,
      }))
    }
  }, [state.isPlaying, state.currentTrack])

  // Seek to specific time
  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current
    if (audio && !isNaN(audio.duration)) {
      audio.currentTime = Math.max(0, Math.min(time, audio.duration))
    }
  }, [])

  // Seek by relative amount
  const seekBy = useCallback(
    (seconds: number) => {
      const audio = audioRef.current
      if (audio) {
        seekTo(audio.currentTime + seconds)
      }
    },
    [seekTo],
  )

  // Change playback speed
  const setPlaybackSpeed = useCallback((speed: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.playbackRate = speed
      setState((prev) => ({ ...prev, playbackSpeed: speed }))
    }
  }, [])

  // Stop audio
  const stop = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
        currentTrack: null,
      }))
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    audioRef,
    ...state,
    playAudio,
    togglePlayPause,
    seekTo,
    seekBy,
    setPlaybackSpeed,
    stop,
    clearError,
  }
}
