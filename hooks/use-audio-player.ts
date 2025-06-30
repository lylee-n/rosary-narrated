"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { audioData } from "@/lib/audio-data"

export interface NowPlaying {
  mysterySetKey: string
  mysteryIndex: number
  perspective: 3 | 7 | 12
  src: string
}

export interface AudioPlayerState {
  nowPlaying: NowPlaying | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackSpeed: number
  isLoading: boolean
  error: string | null
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    nowPlaying: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackSpeed: 1,
    isLoading: false,
    error: null,
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)

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
      setState((prev) => ({ ...prev, duration: audio.duration, isLoading: false }))
    }

    const handleEnded = () => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
        nowPlaying: null,
      }))
    }

    const handleError = () => {
      setState((prev) => ({
        ...prev,
        error: "Failed to load audio. Please try again.",
        isLoading: false,
        isPlaying: false,
      }))
    }

    const handleCanPlay = () => {
      setState((prev) => ({ ...prev, isLoading: false }))
    }

    const handleLoadStart = () => {
      setState((prev) => ({ ...prev, isLoading: true }))
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadstart", handleLoadStart)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadstart", handleLoadStart)
    }
  }, [])

  const play = useCallback(
    (mysterySetKey: string, mysteryIndex: number, perspective: 3 | 7 | 12) => {
      const audioSrc = audioData[mysterySetKey as keyof typeof audioData]?.[mysteryIndex]?.[perspective]

      if (!audioSrc || !audioRef.current) {
        setState((prev) => ({ ...prev, error: "Audio not available for this selection." }))
        return
      }

      const audio = audioRef.current
      const newNowPlaying: NowPlaying = { mysterySetKey, mysteryIndex, perspective, src: audioSrc }

      // If same audio is playing, just pause/resume
      if (state.nowPlaying?.src === audioSrc) {
        if (state.isPlaying) {
          audio.pause()
          setState((prev) => ({ ...prev, isPlaying: false }))
        } else {
          audio
            .play()
            .then(() => {
              setState((prev) => ({ ...prev, isPlaying: true }))
            })
            .catch(() => {
              setState((prev) => ({ ...prev, error: "Failed to play audio." }))
            })
        }
        return
      }

      // Load new audio
      setState((prev) => ({
        ...prev,
        nowPlaying: newNowPlaying,
        isLoading: true,
        error: null,
        currentTime: 0,
      }))

      audio.src = audioSrc
      audio.playbackRate = state.playbackSpeed
      audio.load()

      audio
        .play()
        .then(() => {
          setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }))
        })
        .catch(() => {
          setState((prev) => ({
            ...prev,
            error: "Failed to play audio.",
            isLoading: false,
            isPlaying: false,
          }))
        })
    },
    [state.nowPlaying, state.isPlaying, state.playbackSpeed],
  )

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setState((prev) => ({ ...prev, isPlaying: false }))
    }
  }, [])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setState((prev) => ({ ...prev, currentTime: time }))
    }
  }, [])

  const seekBy = useCallback((seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(audioRef.current.duration, audioRef.current.currentTime + seconds))
      audioRef.current.currentTime = newTime
      setState((prev) => ({ ...prev, currentTime: newTime }))
    }
  }, [])

  const setPlaybackSpeed = useCallback((speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
      setState((prev) => ({ ...prev, playbackSpeed: speed }))
    }
  }, [])

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }
    setState({
      nowPlaying: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      playbackSpeed: 1,
      isLoading: false,
      error: null,
    })
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
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
