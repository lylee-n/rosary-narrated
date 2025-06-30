"use client"

import { useState, useCallback } from "react"
import { dataService } from "@/lib/services/data-service"
import { ModalContainer } from "@/components/ui/modal-container"
import { ModalHeader } from "@/components/ui/modal-header"
import { MysteryGrid } from "./mystery-grid"
import { MysteryList } from "./mystery-list"
import { useAudioPlayer } from "@/hooks/use-audio-player"

interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export function PlayModalRefactored({ selectedMysterySetIndex, onClose }: PlayModalProps) {
  const [expandedMysteryItem, setExpandedMysteryItem] = useState<number | null>(null)
  const currentMysterySetDetails = dataService.getMysterySet(selectedMysterySetIndex)

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
      const mysterySetKeys = dataService.getMysterySetKeys()
      const mysterySetKey = mysterySetKeys[selectedMysterySetIndex]
      play(mysterySetKey, mysteryIndex, perspective as 3 | 7 | 12)
    },
    [selectedMysterySetIndex, play],
  )

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      pause()
    } else if (nowPlaying) {
      play(nowPlaying.mysterySetKey, nowPlaying.mysteryIndex, nowPlaying.perspective)
    }
  }, [isPlaying, pause, nowPlaying, play])

  if (!currentMysterySetDetails) {
    return null
  }

  return (
    <ModalContainer isOpen={true} onClose={handleClose} backgroundImage="/images/modal-background.gif">
      <ModalHeader title={currentMysterySetDetails.title} onClose={handleClose} />

      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
          <button onClick={clearError} className="ml-2 text-red-300 hover:text-red-100 underline">
            Dismiss
          </button>
        </div>
      )}

      <MysteryGrid
        mysteries={currentMysterySetDetails.mysteries}
        backgroundImage={currentMysterySetDetails.backgroundImage}
        onMysterySelect={handleMysterySelect}
        onAudioPlay={handleAudioPlay}
        expandedMystery={expandedMysteryItem}
        nowPlaying={nowPlaying}
        isPlaying={isPlaying}
        isLoading={isLoading}
        audioRef={audioRef}
        currentTime={currentTime}
        duration={duration}
        playbackSpeed={playbackSpeed}
        onSeek={seek}
        onSeekBy={seekBy}
        onPlayPause={handlePlayPause}
        onSpeedChange={setPlaybackSpeed}
      />

      <MysteryList
        mysteries={currentMysterySetDetails.mysteries}
        onMysterySelect={handleMysterySelect}
        onAudioPlay={handleAudioPlay}
        expandedMystery={expandedMysteryItem}
        nowPlaying={nowPlaying}
        isPlaying={isPlaying}
        isLoading={isLoading}
        audioRef={audioRef}
        currentTime={currentTime}
        duration={duration}
        playbackSpeed={playbackSpeed}
        onSeek={seek}
        onSeekBy={seekBy}
        onPlayPause={handlePlayPause}
        onSpeedChange={setPlaybackSpeed}
      />
    </ModalContainer>
  )
}
