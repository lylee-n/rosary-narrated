"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { audioData } from "@/lib/audio-data"

interface NowPlaying {
  src: string
  mysteryIndex: number
  perspective: number
}

export function useAudioPlayer() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Audio()
      audioPlayerRef.current.preload = "none"
    }

    const audio = audioPlayerRef.current

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setNowPlaying(null)
      setCurrentTime(0)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const playAudio = useCallback(
    (mysterySetKey: string, mysteryItemIndex: number, perspective: 3 | 7 | 12, speed: number) => {
      const audioSrc = audioData[mysterySetKey as keyof typeof audioData]?.[mysteryItemIndex]?.[perspective]
      if (!audioSrc || !audioPlayerRef.current) return

      const audio = audioPlayerRef.current

      if (nowPlaying?.src === audioSrc && !audio.paused) {
        audio.pause()
      } else if (nowPlaying?.src === audioSrc && audio.paused) {
        audio.play().catch(console.error)
      } else {
        audio.src = audioSrc
        audio.playbackRate = speed
        audio.load()
        audio
          .play()
          .then(() => setNowPlaying({ src: audioSrc, mysteryIndex: mysteryItemIndex, perspective }))
          .catch(console.error)
      }
    },
    [nowPlaying],
  )

  const cleanup = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      audioPlayerRef.current.src = ""
    }
    setNowPlaying(null)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  return {
    nowPlaying,
    currentTime,
    duration,
    playbackSpeed,
    audioPlayerRef,
    playAudio,
    setCurrentTime,
    setPlaybackSpeed,
    cleanup,
  }
}
