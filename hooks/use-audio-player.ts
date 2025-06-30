"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import type { AudioPlayerState, AudioTrack, AudioError, MysterySetKey, PerspectiveType } from "@/types"
import { AUDIO_CONFIG } from "@/constants"
import { dataService } from "@/services/data-service"

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackSpeed: AUDIO_CONFIG.defaultSpeed,
    currentTrack: null,
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

    const handleError = (event: Event) => {
      const error: AudioError = {
        type: "PLAY_ERROR",
        message: "Failed to load or play audio",
        url: audio.src,
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
        error: error.message,
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

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      // Cleanup event listeners
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
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

      const newTrack: AudioTrack = { mysterySetKey, mysteryIndex, perspective, url }
      const isSameTrack = state.currentTrack?.url === url

      try {
        if (isSameTrack && audio.paused) {
          // Resume current track
          await audio.play()
          setState((prev) => ({ ...prev, isPlaying: true, error: null }))
        } else if (isSameTrack && !audio.paused) {
          // Pause current track
          audio.pause()
          setState((prev) => ({ ...prev, isPlaying: false }))
        } else {
          // Load and play new track
          audio.src = url
          audio.playbackRate = state.playbackSpeed
          audio.load()

          await audio.play()
          setState((prev) => ({
            ...prev,
            isPlaying: true,
            currentTrack: newTrack,
            error: null,
          }))
        }
      } catch (error) {
        const audioError: AudioError = {
          type: "PLAY_ERROR",
          message: error instanceof Error ? error.message : "Failed to play audio",
          url,
        }

        setState((prev) => ({
          ...prev,
          isPlaying: false,
          error: audioError.message,
        }))
      }
    },
    [state.currentTrack, state.playbackSpeed],
  )

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setState((prev) => ({ ...prev, isPlaying: false }))
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
        currentTrack: null,
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

  return {
    ...state,
    audioRef,
    play,
    pause,
    stop,
    seek,
    seekBy,
    setPlaybackSpeed,
    clearError,
  }
}
