"use client"

import { useState, useCallback, useMemo } from "react"
import { useAudioPlayer } from "@/hooks/use-audio-player"

/**
 * Keys used to look-up a mystery set by index (0-based)
 * 0 → joyful, 1 → luminous, 2 → sorrowful, 3 → glorious
 */
const MYSTERY_SET_KEYS = ["joyful", "luminous", "sorrowful", "glorious"] as const

/**
 * Hook used by <PlayModal/> to encapsulate all UI / audio logic.
 * It returns the exact shape consumed by the modal component.
 */
export function usePlayModal(selectedMysterySetIndex: number) {
  /* ───────────────────────────── State ───────────────────────────── */
  const [expandedMysteryItem, setExpandedMysteryItem] = useState<number | null>(null)

  /* ──────────────────────── Audio management ─────────────────────── */
  const {
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
  } = useAudioPlayer()

  /* ───────────────────────── Helper refs ─────────────────────────── */
  const currentMysterySetKey = useMemo(
    () => MYSTERY_SET_KEYS[selectedMysterySetIndex] ?? "joyful",
    [selectedMysterySetIndex],
  )

  /* ────────────────────── UI interaction logic ───────────────────── */
  const toggleMysteryItem = useCallback(
    (index: number) => {
      const isOpeningNewItem = expandedMysteryItem !== index
      setExpandedMysteryItem((prev) => (prev === index ? null : index))

      // stop current audio when switching items / collapsing the same one
      if (nowPlaying && nowPlaying.mysteryIndex !== index && isOpeningNewItem) {
        cleanup()
      } else if (expandedMysteryItem === index && nowPlaying && nowPlaying.mysteryIndex === index) {
        cleanup()
      }
    },
    [expandedMysteryItem, nowPlaying, cleanup],
  )

  const playAudio = useCallback(
    (mysteryItemIndex: number, perspective: 3 | 7 | 12) => {
      play(currentMysterySetKey, mysteryItemIndex, perspective)
    },
    [currentMysterySetKey, play],
  )

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      pause()
    } else if (nowPlaying) {
      play(nowPlaying.mysterySetKey, nowPlaying.mysteryIndex, nowPlaying.perspective)
    }
  }, [isPlaying, pause, nowPlaying, play])

  const handleClose = useCallback(() => {
    cleanup()
  }, [cleanup])

  /* ───────────────────────────── Return ──────────────────────────── */
  return {
    /* UI */
    expandedMysteryItem,
    toggleMysteryItem,
    handleClose,

    /* Audio API passthrough */
    nowPlaying,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    error,
    audioRef,
    playAudio,
    handlePlayPause,
    seek,
    seekBy,
    setPlaybackSpeed,
    clearError,
  }
}
