"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { dataService } from "@/lib/services/data-service"
import type { RosaryMysterySet } from "@/lib/types"
import { AudioPlayer } from "@/components/play-section/audio-player"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import { PerspectiveSelector } from "@/components/play-section/perspective-selector"
import { DesktopMysteryView } from "@/components/play-section/desktop-mystery-view"
import { MobileMysteryView } from "@/components/play-section/mobile-mystery-view"
import { useMobile } from "@/lib/hooks/use-mobile"

interface PlayModalProps {
  selectedMysterySetIndex: number
  onClose: () => void
}

export function PlayModal({ selectedMysterySetIndex, onClose }: PlayModalProps) {
  const [mysterySet, setMysterySet] = useState<RosaryMysterySet | null>(null)
  const [currentMysteryIndex, setCurrentMysteryIndex] = useState(0)
  const [currentDecadeIndex, setCurrentDecadeIndex] = useState(0)
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string | null>(null)
  const [perspective, setPerspective] = useState<"3" | "7" | "12">("3")
  const [audioPlayerState, audioPlayerControls] = useAudioPlayer({ src: currentAudioSrc || "" })
  const isMobile = useMobile()

  useEffect(() => {
    const loadedMysterySet = dataService.getMysterySet(selectedMysterySetIndex)
    if (loadedMysterySet) {
      setMysterySet(loadedMysterySet)
      setCurrentMysteryIndex(0)
      setCurrentDecadeIndex(0)
      // Preload audio for the selected mystery set
      dataService.preloadAudioForMysterySet(selectedMysterySetIndex)
    }
  }, [selectedMysterySetIndex])

  useEffect(() => {
    if (mysterySet) {
      const currentDecade = mysterySet.mysteries[currentMysteryIndex]?.decades[currentDecadeIndex]
      if (currentDecade?.audioId) {
        setCurrentAudioSrc(currentDecade.audioId)
      } else {
        setCurrentAudioSrc(null)
      }
    }
  }, [mysterySet, currentMysteryIndex, currentDecadeIndex])

  useEffect(() => {
    // When audio source changes, ensure it's loaded and ready to play
    if (currentAudioSrc && !audioPlayerState.isLoading && !audioPlayerState.isPlaying) {
      audioPlayerControls.play()
    }
  }, [currentAudioSrc, audioPlayerState.isLoading, audioPlayerState.isPlaying, audioPlayerControls])

  const handleNextDecade = useCallback(() => {
    if (!mysterySet) return

    const currentMystery = mysterySet.mysteries[currentMysteryIndex]
    if (currentDecadeIndex < currentMystery.decades.length - 1) {
      setCurrentDecadeIndex((prev) => prev + 1)
    } else if (currentMysteryIndex < mysterySet.mysteries.length - 1) {
      setCurrentMysteryIndex((prev) => prev + 1)
      setCurrentDecadeIndex(0)
    } else {
      // End of all mysteries
      audioPlayerControls.pause()
      onClose() // Close modal or show completion message
    }
  }, [mysterySet, currentMysteryIndex, currentDecadeIndex, audioPlayerControls, onClose])

  const handlePreviousDecade = useCallback(() => {
    if (!mysterySet) return

    if (currentDecadeIndex > 0) {
      setCurrentDecadeIndex((prev) => prev - 1)
    } else if (currentMysteryIndex > 0) {
      setCurrentMysteryIndex((prev) => prev - 1)
      setCurrentDecadeIndex(mysterySet.mysteries[currentMysteryIndex - 1].decades.length - 1)
    }
  }, [mysterySet, currentMysteryIndex, currentDecadeIndex])

  const handleAudioEnded = useCallback(() => {
    handleNextDecade()
  }, [handleNextDecade])

  const handleMysteryClick = useCallback((mysteryIdx: number) => {
    setCurrentMysteryIndex(mysteryIdx)
    setCurrentDecadeIndex(0)
  }, [])

  const handleDecadeClick = useCallback((mysteryIdx: number, decadeIdx: number) => {
    setCurrentMysteryIndex(mysteryIdx)
    setCurrentDecadeIndex(decadeIdx)
  }, [])

  if (!mysterySet) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md p-6 bg-gray-900 text-white rounded-lg shadow-xl">
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-10 w-10 animate-spin text-[#FFE552]" />
            <span className="ml-3 text-lg">Loading Mysteries...</span>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const currentMystery = mysterySet.mysteries[currentMysteryIndex]
  const currentDecade = currentMystery?.decades[currentDecadeIndex]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 flex flex-col max-w-full h-full p-0 bg-gray-950 text-white overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between p-4 md:p-6 bg-gray-900 shadow-md z-10">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
          <h2 className="text-xl md:text-2xl font-bold text-white font-sora">{mysterySet.title}</h2>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>

        {/* Main Content Area */}
        <div className="flex-grow overflow-hidden relative">
          {isMobile ? (
            <MobileMysteryView
              mysterySet={mysterySet}
              currentMysteryIndex={currentMysteryIndex}
              currentDecadeIndex={currentDecadeIndex}
              onMysteryClick={handleMysteryClick}
              onDecadeClick={handleDecadeClick}
              perspective={perspective}
            />
          ) : (
            <DesktopMysteryView
              mysterySet={mysterySet}
              currentMysteryIndex={currentMysteryIndex}
              currentDecadeIndex={currentDecadeIndex}
              onMysteryClick={handleMysteryClick}
              onDecadeClick={handleDecadeClick}
              perspective={perspective}
            />
          )}
        </div>

        {/* Audio Player and Controls */}
        <div className="bg-gray-900 p-4 md:p-6 border-t border-gray-800 z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white font-sora">{currentMystery?.title}</h3>
              <p className="text-sm text-gray-400 font-inter">{currentDecade?.title}</p>
            </div>
            <PerspectiveSelector selectedPerspective={perspective} onSelectPerspective={setPerspective} />
          </div>
          <AudioPlayer
            src={currentAudioSrc || ""}
            autoplay={true}
            onEnded={handleAudioEnded}
            initialVolume={audioPlayerState.volume}
            initialPlaybackRate={audioPlayerState.playbackRate}
          />
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              className="text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white bg-transparent"
              onClick={handlePreviousDecade}
              disabled={currentMysteryIndex === 0 && currentDecadeIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button
              variant="outline"
              className="text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white bg-transparent"
              onClick={handleNextDecade}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
