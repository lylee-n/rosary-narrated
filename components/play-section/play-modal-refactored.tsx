"use client"

import { useState, useCallback } from "react"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { ModalContainer } from "@/components/ui/modal-container"
import { ModalHeader } from "@/components/ui/modal-header"
import { MysteryGrid } from "./mystery-grid"
import { MysteryList } from "./mystery-list"
import { useAudioPlayer } from "@/hooks/use-audio-player-simple"

const mysterySetKeys = ["joyful", "luminous", "sorrowful", "glorious"]

interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export function PlayModalRefactored({ selectedMysterySetIndex, onClose }: PlayModalProps) {
  const [expandedMysteryItem, setExpandedMysteryItem] = useState<number | null>(null)
  const currentMysterySetDetails =
    rosaryMysteriesDataEn[(selectedMysterySetIndex + 1) as keyof typeof rosaryMysteriesDataEn]

  const {
    nowPlaying,
    currentTime,
    duration,
    playbackSpeed,
    audioPlayerRef,
    playAudio,
    setCurrentTime,
    setPlaybackSpeed,
    cleanup,
  } = useAudioPlayer()

  const handleClose = useCallback(() => {
    cleanup()
    onClose()
  }, [cleanup, onClose])

  const handleMysterySelect = useCallback(
    (index: number) => {
      const isOpeningNewItem = expandedMysteryItem !== index
      setExpandedMysteryItem((prev) => (prev === index ? null : index))

      if (nowPlaying && nowPlaying.mysteryIndex !== index && isOpeningNewItem) {
        cleanup()
      } else if (expandedMysteryItem === index && nowPlaying && nowPlaying.mysteryIndex === index) {
        cleanup()
      }
    },
    [expandedMysteryItem, nowPlaying, cleanup],
  )

  const handleAudioPlay = useCallback(
    (mysteryIndex: number, perspective: number) => {
      const mysterySetKey = mysterySetKeys[selectedMysterySetIndex]
      playAudio(mysterySetKey, mysteryIndex, perspective as 3 | 7 | 12, playbackSpeed)
    },
    [selectedMysterySetIndex, playAudio, playbackSpeed],
  )

  return (
    <ModalContainer isOpen={true} onClose={handleClose} backgroundImage="/images/modal-background.gif">
      <ModalHeader title={currentMysterySetDetails.title} onClose={handleClose} />

      <MysteryGrid
        mysteries={currentMysterySetDetails.mysteries}
        backgroundImage={currentMysterySetDetails.backgroundImage}
        onMysterySelect={handleMysterySelect}
        onAudioPlay={handleAudioPlay}
        expandedMystery={expandedMysteryItem}
        nowPlaying={nowPlaying}
        audioPlayerRef={audioPlayerRef}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        duration={duration}
        playbackSpeed={playbackSpeed}
        setPlaybackSpeed={setPlaybackSpeed}
      />

      <MysteryList
        mysteries={currentMysterySetDetails.mysteries}
        onMysterySelect={handleMysterySelect}
        onAudioPlay={handleAudioPlay}
        expandedMystery={expandedMysteryItem}
        nowPlaying={nowPlaying}
        audioPlayerRef={audioPlayerRef}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        duration={duration}
        playbackSpeed={playbackSpeed}
        setPlaybackSpeed={setPlaybackSpeed}
      />
    </ModalContainer>
  )
}
