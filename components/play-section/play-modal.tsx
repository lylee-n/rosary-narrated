"use client"

import Image from "next/image"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { PlayModalHeader } from "./play-modal-header"
import { DesktopMysteryDisplay } from "./desktop-mystery-display"
import { MobileMysteryDisplay } from "./mobile-mystery-display"
import { usePlayModal } from "@/hooks/use-play-modal"

interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export function PlayModal({ selectedMysterySetIndex, onClose }: PlayModalProps) {
  const currentMysterySetDetails =
    rosaryMysteriesDataEn[(selectedMysterySetIndex + 1) as keyof typeof rosaryMysteriesDataEn]

  const {
    expandedMysteryItem,
    nowPlaying,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    error,
    audioRef,
    toggleMysteryItem,
    playAudio,
    handlePlayPause,
    handleClose,
    seek,
    seekBy,
    setPlaybackSpeed,
    clearError,
  } = usePlayModal(selectedMysterySetIndex)

  const handleModalClose = () => {
    handleClose()
    onClose()
  }

  if (!currentMysterySetDetails) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-black/50"
        onClick={(e) => {
          e.stopPropagation()
          handleModalClose()
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
        <PlayModalHeader title={currentMysterySetDetails.title} onClose={handleModalClose} />

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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10" />

          {/* Scrollable Content */}
          <div
            className="relative z-20 h-full overflow-y-auto p-4 sm:p-6 lg:p-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Desktop View */}
            <DesktopMysteryDisplay
              mysteries={currentMysterySetDetails.mysteries}
              expandedMysteryItem={expandedMysteryItem}
              nowPlaying={nowPlaying}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              playbackSpeed={playbackSpeed}
              isLoading={isLoading}
              audioRef={audioRef}
              onToggleMystery={toggleMysteryItem}
              onPlayAudio={playAudio}
              onSeek={seek}
              onSeekBy={seekBy}
              onPlayPause={handlePlayPause}
              onSpeedChange={setPlaybackSpeed}
            />

            {/* Mobile View */}
            <MobileMysteryDisplay
              mysteries={currentMysterySetDetails.mysteries}
              expandedMysteryItem={expandedMysteryItem}
              nowPlaying={nowPlaying}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              playbackSpeed={playbackSpeed}
              isLoading={isLoading}
              audioRef={audioRef}
              onToggleMystery={toggleMysteryItem}
              onPlayAudio={playAudio}
              onSeek={seek}
              onSeekBy={seekBy}
              onPlayPause={handlePlayPause}
              onSpeedChange={setPlaybackSpeed}
            />
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
        @keyframes lineRevealLeftToRight {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </div>
  )
}
