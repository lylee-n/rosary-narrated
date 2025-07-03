"use client"

import { useState, useCallback } from "react"
import { useAudioPlayer } from "./use-audio-player"
import type { PerspectiveType } from "@/types"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"

export function usePlayModal(selectedMysterySetIndex: number) {
  const [expandedMysteryItem, setExpandedMysteryItem] = useState<number | null>(null)
  const audioPlayer = useAudioPlayer()

  const { nowPlaying, play, cleanup } = audioPlayer

  const currentMysterySetDetails =
    rosaryMysteriesDataEn[(selectedMysterySetIndex + 1) as keyof typeof rosaryMysteriesDataEn]

  const toggleMysteryItem = useCallback((index: number) => {
    setExpandedMysteryItem((prev) => (prev === index ? null : index))
  }, [])

  const playAudio = useCallback(
    (mysteryIndex: number, perspective: PerspectiveType) => {
      if (!currentMysterySetDetails) return
      const mysterySetKey = currentMysterySetDetails.key
      play(mysterySetKey, mysteryIndex, perspective)
      if (expandedMysteryItem !== mysteryIndex) {
        setExpandedMysteryItem(mysteryIndex)
      }
    },
    [currentMysterySetDetails, play, expandedMysteryItem],
  )

  const handlePlayPause = useCallback(() => {
    if (audioPlayer.isPlaying) {
      audioPlayer.pause()
    } else if (nowPlaying) {
      play(nowPlaying.mysterySetKey, nowPlaying.mysteryIndex, nowPlaying.perspective)
    }
  }, [audioPlayer.isPlaying, audioPlayer.pause, nowPlaying, play])

  const handleClose = useCallback(() => {
    cleanup()
  }, [cleanup])

  const playNextMystery = useCallback(() => {
    if (!nowPlaying || !currentMysterySetDetails) return

    const { perspective, mysteryIndex } = nowPlaying
    const nextMysteryIndex = mysteryIndex + 1

    if (nextMysteryIndex < currentMysterySetDetails.mysteries.length) {
      playAudio(nextMysteryIndex, perspective)
    }
  }, [nowPlaying, currentMysterySetDetails, playAudio])

  const isLastMystery = nowPlaying ? nowPlaying.mysteryIndex >= currentMysterySetDetails.mysteries.length - 1 : true

  return {
    expandedMysteryItem,
    ...audioPlayer,
    toggleMysteryItem,
    playAudio,
    handlePlayPause,
    handleClose,
    playNextMystery,
    isLastMystery,
  }
}
