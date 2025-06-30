"use client"

import { useState, useCallback } from "react"
import { useAudioPlayer } from "./use-audio-player"
import { useMobile } from "@/lib/hooks/use-mobile"
import type { MysterySetKey, PerspectiveType } from "@/types"

export function usePlayModal(mysterySetIndex: number) {
  const [selectedMysteryIndex, setSelectedMysteryIndex] = useState(0)
  const [selectedPerspective, setSelectedPerspective] = useState<PerspectiveType>(3)
  const [isAnimating, setIsAnimating] = useState(false)

  const isMobile = useMobile()
  const audioPlayer = useAudioPlayer()

  const handleMysterySelect = useCallback(
    (index: number) => {
      if (index === selectedMysteryIndex) return

      setIsAnimating(true)
      setSelectedMysteryIndex(index)

      // Reset animation after a short delay
      setTimeout(() => setIsAnimating(false), 300)
    },
    [selectedMysteryIndex],
  )

  const handlePerspectiveChange = useCallback((perspective: PerspectiveType) => {
    setSelectedPerspective(perspective)
  }, [])

  const handlePlayAudio = useCallback(() => {
    const mysterySetKeys: MysterySetKey[] = ["joyful", "luminous", "sorrowful", "glorious"]
    const mysterySetKey = mysterySetKeys[mysterySetIndex]

    if (mysterySetKey) {
      audioPlayer.play(mysterySetKey, selectedMysteryIndex, selectedPerspective)
    }
  }, [audioPlayer, mysterySetIndex, selectedMysteryIndex, selectedPerspective])

  const handlePauseAudio = useCallback(() => {
    audioPlayer.pause()
  }, [audioPlayer])

  const handlePlayPause = useCallback(() => {
    if (audioPlayer.isPlaying) {
      handlePauseAudio()
    } else {
      handlePlayAudio()
    }
  }, [audioPlayer.isPlaying, handlePlayAudio, handlePauseAudio])

  return {
    // State
    selectedMysteryIndex,
    selectedPerspective,
    isAnimating,
    isMobile,

    // Audio player state
    ...audioPlayer,

    // Handlers
    handleMysterySelect,
    handlePerspectiveChange,
    handlePlayAudio,
    handlePauseAudio,
    handlePlayPause,
  }
}
