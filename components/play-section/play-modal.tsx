"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { MysteryNavigation } from "./mystery-navigation"
import { MysteryCard } from "./mystery-card"
import { useAudioPlayer } from "@/hooks/use-audio-player"

const mysterySetKeys = ["joyful", "luminous", "sorrowful", "glorious"]

interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export function PlayModal({ selectedMysterySetIndex, onClose }: PlayModalProps) {
  const [currentMysteryIndex, setCurrentMysteryIndex] = useState<number | null>(null)

  const currentMysterySetDetails =
    rosaryMysteriesDataEn[(selectedMysterySetIndex + 1) as keyof typeof rosaryMysteriesDataEn]

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
      const isOpeningNewItem = currentMysteryIndex !== index
      setCurrentMysteryIndex((prev) => (prev === index ? null : index))

      if (nowPlaying && nowPlaying.mysteryIndex !== index && isOpeningNewItem) {
        cleanup()
      } else if (currentMysteryIndex === index && nowPlaying && nowPlaying.mysteryIndex === index) {
        cleanup()
      }
    },
    [currentMysteryIndex, nowPlaying, cleanup],
  )

  const playAudio = useCallback(
    (mysteryItemIndex: number, perspective: 3 | 7 | 12) => {
      const mysterySetKey = mysterySetKeys[selectedMysterySetIndex]
      play(mysterySetKey, mysteryItemIndex, perspective)
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

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-black/50"
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
      >
        <Image src="/images/modal-background.gif" alt="Modal Background" fill className="object-cover" priority />
      </div>

      {/* Modal Container */}
      <div
        className="relative z-10 w-full h-full max-w-[100vw] max-h-[100vh] md:max-w-[90vw] md:max-h-[90vh] md:rounded-2xl overflow-hidden border-0 md:border md:border-gray-300/20 bg-black/20 backdrop-blur-sm flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-black/90 backdrop-blur-sm p-4 sm:p-6 py-6 sm:py-8 text-center relative z-20 flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora tracking-wider">
            {currentMysterySetDetails.title}
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleClose()
            }}
            className="absolute top-3 right-4 sm:top-4 sm:right-6 text-white text-3xl sm:text-4xl transition-colors duration-300 z-30 cursor-pointer bg-black/20 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:text-[#FFE552]"
            type="button"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
            <button onClick={clearError} className="ml-2 text-red-300 hover:text-red-100 underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={currentMysterySetDetails.backgroundImage || "/placeholder.svg"}
              alt="Mystery Background"
              fill
              className="object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>

          {/* Scrollable Content */}
          <div
            className="relative z-20 h-full overflow-y-auto p-4 sm:p-6 lg:p-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Mystery Navigation */}
            <MysteryNavigation
              mysteries={currentMysterySetDetails.mysteries}
              currentMysteryIndex={currentMysteryIndex}
              onMysterySelect={handleMysterySelect}
              isDesktop={isDesktop}
            />

            {/* Mystery Content */}
            {currentMysteryIndex !== null && (
              <MysteryCard
                mystery={currentMysterySetDetails.mysteries[currentMysteryIndex]}
                mysteryIndex={currentMysteryIndex}
                onAudioPlay={playAudio}
                nowPlaying={
                  nowPlaying ? { mysteryIndex: nowPlaying.mysteryIndex, perspective: nowPlaying.perspective } : null
                }
                audioPlayerRef={audioRef}
                currentTime={currentTime}
                setCurrentTime={seek}
                duration={duration}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                isPlaying={isPlaying}
                isLoading={isLoading}
                onSeek={seek}
                onSeekBy={seekBy}
                onPlayPause={handlePlayPause}
                onSpeedChange={setPlaybackSpeed}
                isExpanded={true}
                isDesktop={isDesktop}
              />
            )}

            {/* Mobile Mystery List */}
            {!isDesktop && currentMysteryIndex === null && (
              <div className="space-y-4 pb-8">
                {currentMysterySetDetails.mysteries.map((mystery, index) => (
                  <MysteryCard
                    key={index}
                    mystery={mystery}
                    mysteryIndex={index}
                    onAudioPlay={playAudio}
                    nowPlaying={
                      nowPlaying ? { mysteryIndex: nowPlaying.mysteryIndex, perspective: nowPlaying.perspective } : null
                    }
                    audioPlayerRef={audioRef}
                    currentTime={currentTime}
                    setCurrentTime={seek}
                    duration={duration}
                    playbackSpeed={playbackSpeed}
                    setPlaybackSpeed={setPlaybackSpeed}
                    isPlaying={isPlaying}
                    isLoading={isLoading}
                    onSeek={seek}
                    onSeekBy={seekBy}
                    onPlayPause={handlePlayPause}
                    onSpeedChange={setPlaybackSpeed}
                    isExpanded={false}
                    onToggle={() => handleMysterySelect(index)}
                    isDesktop={isDesktop}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes beadReveal {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
