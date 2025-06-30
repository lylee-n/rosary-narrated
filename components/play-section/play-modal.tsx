"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, PlayCircle, PauseCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "./audio-player"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import { dataService } from "@/lib/services/data-service"
import type { PerspectiveType, Mystery } from "@/types"

interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export function PlayModal({ selectedMysterySetIndex, onClose }: PlayModalProps) {
  const [expandedMystery, setExpandedMystery] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const audioPlayer = useAudioPlayer()
  const mysterySet = dataService.getMysterySet(selectedMysterySetIndex)
  const mysterySetKey = dataService.getMysterySetKey(selectedMysterySetIndex)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!mysterySet || !mysterySetKey) {
    return null
  }

  const handleMysteryClick = (index: number) => {
    setExpandedMystery(expandedMystery === index ? null : index)
  }

  const handleAudioPlay = async (mysteryIndex: number, perspective: PerspectiveType) => {
    await audioPlayer.playAudio(mysterySetKey, mysteryIndex, perspective)
  }

  const isCurrentlyPlaying = (mysteryIndex: number, perspective: PerspectiveType) => {
    return (
      audioPlayer.currentTrack?.mysteryIndex === mysteryIndex &&
      audioPlayer.currentTrack?.perspective === perspective &&
      audioPlayer.isPlaying
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full h-full max-w-7xl mx-auto bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={mysterySet.backgroundImage || "/placeholder.svg"}
            alt={mysterySet.title}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-4 md:p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white font-sora">{mysterySet.title}</h1>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:text-gray-300">
            <X size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="relative z-10 h-[calc(100%-80px)] overflow-y-auto px-4 md:px-6 pb-6">
          {isMobile ? (
            <MobileView
              mysteries={mysterySet.mysteries}
              expandedMystery={expandedMystery}
              onMysteryClick={handleMysteryClick}
              onAudioPlay={handleAudioPlay}
              isCurrentlyPlaying={isCurrentlyPlaying}
              audioPlayer={audioPlayer}
            />
          ) : (
            <DesktopView
              mysteries={mysterySet.mysteries}
              expandedMystery={expandedMystery}
              onMysteryClick={handleMysteryClick}
              onAudioPlay={handleAudioPlay}
              isCurrentlyPlaying={isCurrentlyPlaying}
              audioPlayer={audioPlayer}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Mobile View Component
interface ViewProps {
  mysteries: Mystery[]
  expandedMystery: number | null
  onMysteryClick: (index: number) => void
  onAudioPlay: (mysteryIndex: number, perspective: PerspectiveType) => void
  isCurrentlyPlaying: (mysteryIndex: number, perspective: PerspectiveType) => boolean
  audioPlayer: ReturnType<typeof useAudioPlayer>
}

function MobileView({
  mysteries,
  expandedMystery,
  onMysteryClick,
  onAudioPlay,
  isCurrentlyPlaying,
  audioPlayer,
}: ViewProps) {
  return (
    <div className="space-y-4">
      {mysteries.map((mystery, index) => (
        <div key={index} className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
          {/* Mystery Header */}
          <div className="flex items-center p-4 cursor-pointer" onClick={() => onMysteryClick(index)}>
            <div className="w-8 h-8 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-black text-sm mr-4">
              {index + 1}
            </div>
            <h3 className="text-white font-semibold flex-1">{mystery.title}</h3>
          </div>

          {/* Expanded Content */}
          {expandedMystery === index && (
            <div className="px-4 pb-4 space-y-4">
              <div>
                <h4 className="text-[#82FAFA] font-semibold mb-2">Significance:</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{mystery.significance}</p>
              </div>

              <div>
                <h4 className="text-[#82FAFA] font-semibold mb-2">Reflection:</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{mystery.reflection}</p>
              </div>

              {/* Audio Controls */}
              <div>
                <h4 className="text-[#82FAFA] font-semibold mb-3">Choose Perspectives:</h4>
                <div className="space-y-2">
                  {[3, 7, 12].map((perspective) => (
                    <Button
                      key={perspective}
                      onClick={() => onAudioPlay(index, perspective as PerspectiveType)}
                      className={`w-full flex items-center justify-center space-x-2 ${
                        isCurrentlyPlaying(index, perspective as PerspectiveType)
                          ? "bg-[#82FAFA] text-black hover:bg-[#82FAFA]/90"
                          : "bg-transparent border border-[#82FAFA] text-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                      }`}
                    >
                      {isCurrentlyPlaying(index, perspective as PerspectiveType) ? (
                        <PauseCircle size={16} />
                      ) : (
                        <PlayCircle size={16} />
                      )}
                      <span>{perspective} Perspectives</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Audio Player */}
              {audioPlayer.currentTrack?.mysteryIndex === index && (
                <AudioPlayer
                  audioRef={audioPlayer.audioRef}
                  currentTime={audioPlayer.currentTime}
                  duration={audioPlayer.duration}
                  playbackSpeed={audioPlayer.playbackSpeed}
                  isPlaying={audioPlayer.isPlaying}
                  isLoading={audioPlayer.isLoading}
                  error={audioPlayer.error}
                  onSeek={audioPlayer.seekTo}
                  onSeekBy={audioPlayer.seekBy}
                  onPlayPause={audioPlayer.togglePlayPause}
                  onSpeedChange={audioPlayer.setPlaybackSpeed}
                  onClearError={audioPlayer.clearError}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Desktop View Component
function DesktopView({
  mysteries,
  expandedMystery,
  onMysteryClick,
  onAudioPlay,
  isCurrentlyPlaying,
  audioPlayer,
}: ViewProps) {
  return (
    <div className="space-y-8">
      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-1 bg-[#FFE552] rounded-full top-10" />

        <div className="flex justify-between items-start max-w-6xl mx-auto relative">
          {mysteries.map((mystery, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`w-10 h-10 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-black cursor-pointer transition-all duration-300 mx-auto mb-4 ${
                  expandedMystery === index ? "scale-125 shadow-lg shadow-yellow-400/50" : "hover:scale-110"
                }`}
                onClick={() => onMysteryClick(index)}
              >
                {index + 1}
              </div>
              <h3
                className="text-[#FFE552] text-sm font-semibold cursor-pointer hover:text-yellow-300 transition-colors"
                onClick={() => onMysteryClick(index)}
              >
                {mystery.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Mystery */}
      {expandedMystery !== null && (
        <div className="max-w-6xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-[#82FAFA] font-semibold text-lg mb-3">Significance:</h4>
                <p className="text-white leading-relaxed">{mysteries[expandedMystery].significance}</p>
              </div>

              <div>
                <h4 className="text-[#82FAFA] font-semibold text-lg mb-3">Reflection:</h4>
                <p className="text-white leading-relaxed">{mysteries[expandedMystery].reflection}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[#82FAFA] font-semibold text-lg mb-4">Choose Perspectives:</h4>
              <div className="space-y-3">
                {[3, 7, 12].map((perspective) => (
                  <Button
                    key={perspective}
                    onClick={() => onAudioPlay(expandedMystery, perspective as PerspectiveType)}
                    className={`w-full flex items-center justify-center space-x-2 ${
                      isCurrentlyPlaying(expandedMystery, perspective as PerspectiveType)
                        ? "bg-[#82FAFA] text-black hover:bg-[#82FAFA]/90"
                        : "bg-transparent border border-[#82FAFA] text-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                    }`}
                  >
                    {isCurrentlyPlaying(expandedMystery, perspective as PerspectiveType) ? (
                      <PauseCircle size={18} />
                    ) : (
                      <PlayCircle size={18} />
                    )}
                    <span>{perspective} Perspectives</span>
                  </Button>
                ))}
              </div>

              {/* Audio Player */}
              {audioPlayer.currentTrack?.mysteryIndex === expandedMystery && (
                <AudioPlayer
                  audioRef={audioPlayer.audioRef}
                  currentTime={audioPlayer.currentTime}
                  duration={audioPlayer.duration}
                  playbackSpeed={audioPlayer.playbackSpeed}
                  isPlaying={audioPlayer.isPlaying}
                  isLoading={audioPlayer.isLoading}
                  error={audioPlayer.error}
                  onSeek={audioPlayer.seekTo}
                  onSeekBy={audioPlayer.seekBy}
                  onPlayPause={audioPlayer.togglePlayPause}
                  onSpeedChange={audioPlayer.setPlaybackSpeed}
                  onClearError={audioPlayer.clearError}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
