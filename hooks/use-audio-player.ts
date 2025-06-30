"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import type { AudioPlayerState, AudioError, AudioPlayerControls, AudioPlayerProps } from "@/lib/types"
import { dataService } from "@/lib/services/data-service"

export function useAudioPlayer(
  initialProps: AudioPlayerProps = {
    src: "",
    volume: 1,
    playbackRate: 1,
    loop: false,
    autoplay: false,
  },
): [AudioPlayerState, AudioPlayerControls] {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: initialProps.volume || 1,
    playbackRate: initialProps.playbackRate || 1,
    loop: initialProps.loop || false,
    error: null,
    isLoading: true,
  })

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setState((prevState) => ({
        ...prevState,
        currentTime: audioRef.current?.currentTime || 0,
      }))
      animationFrameRef.current = requestAnimationFrame(updateTime)
    }
  }, [])

  const handleError = useCallback((event: Event) => {
    const audio = event.target as HTMLAudioElement
    const error: AudioError = {
      code: audio.error?.code || 0,
      message: "An unknown audio error occurred.",
    }

    switch (audio.error?.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        error.message = "Audio playback aborted."
        break
      case MediaError.MEDIA_ERR_NETWORK:
        error.message = "A network error caused the audio download to fail."
        break
      case MediaError.MEDIA_ERR_DECODE:
        error.message = "The audio playback was aborted due to a decoding error."
        break
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        error.message = "The audio format is not supported."
        break
      default:
        error.message = "An unknown audio error occurred."
        break
    }
    console.error("Audio Error:", error.message, audio.error)
    setState((prevState) => ({ ...prevState, error, isPlaying: false, isLoading: false }))
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setState((prevState) => ({
        ...prevState,
        duration: audioRef.current?.duration || 0,
        isLoading: false,
      }))
    }
  }, [])

  const handleCanPlay = useCallback(() => {
    setState((prevState) => ({ ...prevState, isLoading: false }))
    if (initialProps.autoplay && audioRef.current && !state.isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error("Autoplay failed:", e)
        setState((prevState) => ({
          ...prevState,
          error: { code: 0, message: "Autoplay prevented. Please click play." },
          isPlaying: false,
        }))
      })
    }
  }, [initialProps.autoplay, state.isPlaying])

  const handlePlaying = useCallback(() => {
    setState((prevState) => ({ ...prevState, isPlaying: true, isLoading: false, error: null }))
    animationFrameRef.current = requestAnimationFrame(updateTime)
  }, [updateTime])

  const handlePause = useCallback(() => {
    setState((prevState) => ({ ...prevState, isPlaying: false }))
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handleEnded = useCallback(() => {
    setState((prevState) => ({ ...prevState, isPlaying: false, currentTime: 0 }))
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = "auto"
      audioRef.current.crossOrigin = "anonymous" // Important for CORS if audio is from different origin
      audioRef.current.volume = initialProps.volume || 1
      audioRef.current.playbackRate = initialProps.playbackRate || 1
      audioRef.current.loop = initialProps.loop || false

      audioRef.current.addEventListener("error", handleError)
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
      audioRef.current.addEventListener("canplay", handleCanPlay)
      audioRef.current.addEventListener("playing", handlePlaying)
      audioRef.current.addEventListener("pause", handlePause)
      audioRef.current.addEventListener("ended", handleEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("error", handleError)
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audioRef.current.removeEventListener("canplay", handleCanPlay)
        audioRef.current.removeEventListener("playing", handlePlaying)
        audioRef.current.removeEventListener("pause", handlePause)
        audioRef.current.removeEventListener("ended", handleEnded)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        audioRef.current.pause()
        audioRef.current.src = "" // Clear src to release resources
        audioRef.current.load()
      }
    }
  }, [
    handleError,
    handleLoadedMetadata,
    handleCanPlay,
    handlePlaying,
    handlePause,
    handleEnded,
    initialProps.volume,
    initialProps.playbackRate,
    initialProps.loop,
    initialProps.autoplay,
  ])

  useEffect(() => {
    const setAudioSrc = async () => {
      if (audioRef.current && initialProps.src) {
        setState((prevState) => ({ ...prevState, isLoading: true, error: null }))
        try {
          const audioUrl = await dataService.getAudioUrl(initialProps.src)
          if (audioUrl) {
            audioRef.current.src = audioUrl
            audioRef.current.load()
          } else {
            throw new Error("Audio URL not found or invalid.")
          }
        } catch (e: any) {
          console.error("Failed to load audio source:", e)
          setState((prevState) => ({
            ...prevState,
            error: { code: 0, message: e.message || "Failed to load audio source." },
            isLoading: false,
          }))
        }
      } else if (audioRef.current) {
        audioRef.current.src = ""
        audioRef.current.load()
        setState((prevState) => ({ ...prevState, isLoading: false, isPlaying: false, currentTime: 0, duration: 0 }))
      }
    }
    setAudioSrc()
  }, [initialProps.src])

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.error("Play failed:", e)
        setState((prevState) => ({
          ...prevState,
          error: { code: 0, message: "Playback failed. Please try again." },
          isPlaying: false,
        }))
      })
    }
  }, [])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setState((prevState) => ({ ...prevState, currentTime: time }))
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      setState((prevState) => ({ ...prevState, volume }))
    }
  }, [])

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate
      setState((prevState) => ({ ...prevState, playbackRate: rate }))
    }
  }, [])

  const setLoop = useCallback((loop: boolean) => {
    if (audioRef.current) {
      audioRef.current.loop = loop
      setState((prevState) => ({ ...prevState, loop }))
    }
  }, [])

  return [
    state,
    {
      play,
      pause,
      seek,
      setVolume,
      setPlaybackRate,
      setLoop,
    },
  ]
}
