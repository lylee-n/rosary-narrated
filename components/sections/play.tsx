"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { PlayCircle, PauseCircle, Rewind, FastForward } from "lucide-react"
import { audioData } from "@/lib/audio-data"
import { rosaryMysteriesDataEn, mysteryTitlesEn } from "@/lib/rosary-data-en"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

const mysteryImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mother%20Mary%20and%20Baby%20Jesus.png-0JeNAZJv87hYt6zZ2jUzbD7n6ZW6fX.jpeg", // Joyful
  "/images/Jesus-baptized-new.jpeg", // Luminous
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7d00b0ed1ef04406aabaa13e949ec1bb.png-c2sbiN5V7oDnFruPBdP5ERcEmaQ5Oe.jpeg", // Sorrowful
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c9ccf36706f49afae4b2e6148c718d1.png-rL1gIVUCQOFCDgt0iVcMUrcXh4UYiJ.jpeg", // Glorious
]

const mysterySetKeys = ["joyful", "luminous", "sorrowful", "glorious"]

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function PlaySection() {
  const { setView } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState<number | null>(null)
  const [expandedMysteryItem, setExpandedMysteryItem] = useState<number | null>(null)
  const [nowPlaying, setNowPlaying] = useState<{ src: string; mysteryIndex: number; perspective: number } | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null)

  const openModal = (mysterySetIdx: number) => {
    setSelectedMysterySetIndex(mysterySetIdx)
    setIsModalOpen(true)
    setExpandedMysteryItem(null)
    setNowPlaying(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMysterySetIndex(null)
    setExpandedMysteryItem(null)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      audioPlayerRef.current.src = ""
    }
    setNowPlaying(null)
    setCurrentTime(0)
    setDuration(0)
  }

  const toggleMysteryItem = (index: number) => {
    const isOpeningNewItem = expandedMysteryItem !== index
    setExpandedMysteryItem((prev) => (prev === index ? null : index))

    if (nowPlaying && nowPlaying.mysteryIndex !== index && isOpeningNewItem && audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      setNowPlaying(null)
      setCurrentTime(0)
      setDuration(0)
    } else if (
      expandedMysteryItem === index &&
      nowPlaying &&
      nowPlaying.mysteryIndex === index &&
      audioPlayerRef.current
    ) {
      audioPlayerRef.current.pause()
      setNowPlaying(null)
      setCurrentTime(0)
      setDuration(0)
    }
  }

  const playAudio = useCallback(
    (mysterySetKey: string, mysteryItemIndex: number, perspective: 3 | 7 | 12) => {
      const audioSrc = audioData[mysterySetKey as keyof typeof audioData]?.[mysteryItemIndex]?.[perspective]

      if (!audioSrc) {
        console.warn(`Audio not found for ${mysterySetKey}, item ${mysteryItemIndex}, perspective ${perspective}`)
        return
      }

      if (!audioPlayerRef.current) {
        console.error("Audio player ref not available")
        return
      }

      if (
        nowPlaying &&
        nowPlaying.mysteryIndex === mysteryItemIndex &&
        nowPlaying.perspective === perspective &&
        !audioPlayerRef.current.paused
      ) {
        audioPlayerRef.current.pause()
        return
      }

      if (
        nowPlaying &&
        nowPlaying.mysteryIndex === mysteryItemIndex &&
        nowPlaying.perspective === perspective &&
        audioPlayerRef.current.paused &&
        audioPlayerRef.current.src === audioSrc
      ) {
        audioPlayerRef.current.play().catch((error) => console.error("Error resuming audio:", error))
        return
      }

      audioPlayerRef.current.src = audioSrc
      audioPlayerRef.current.playbackRate = playbackSpeed
      audioPlayerRef.current.load()

      audioPlayerRef.current
        .play()
        .then(() => {
          setNowPlaying({ src: audioSrc, mysteryIndex: mysteryItemIndex, perspective })
        })
        .catch((error) => {
          console.error("Play error:", error)
        })
    },
    [nowPlaying, playbackSpeed],
  )

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.playbackRate = speed
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioPlayerRef.current || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    audioPlayerRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleRewind = (seconds: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = Math.max(0, audioPlayerRef.current.currentTime - seconds)
    }
  }

  const handleFastForward = (seconds: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = Math.min(
        audioPlayerRef.current.duration,
        audioPlayerRef.current.currentTime + seconds,
      )
    }
  }

  useEffect(() => {
    const audio = audioPlayerRef.current
    if (!audio) return

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

  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause()
        audioPlayerRef.current.src = ""
      }
    }
  }, [])

  const currentMysterySetDetails =
    selectedMysterySetIndex !== null
      ? rosaryMysteriesDataEn[(selectedMysterySetIndex + 1) as keyof typeof rosaryMysteriesDataEn]
      : null

  return (
    <div className="container mx-auto px-4 py-8">
      <audio ref={audioPlayerRef} preload="none">
        Your browser does not support the audio tag.
      </audio>

      <section className="my-12 md:my-20">
        <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold text-center mb-8 md:mb-16">
          The Mysteries of the Rosary
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed text-center mb-12 md:mb-20">
          Learn more about our Savior and Mother Mary through the Rosary Mysteries. Click on a Mysteries set for an
          audiovisual storytelling experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {mysteryImages.map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => openModal(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${mysteryTitlesEn[index]} Mysteries`}
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex items-center justify-center p-6">
                <h3 className="text-3xl font-black text-[#FFE552] uppercase tracking-[0.2em] text-center transition-colors duration-300">
                  {mysteryTitlesEn[index]}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <CustomButton onClick={() => setView("SUPPORT")} size="lg">
            Support This Mission
          </CustomButton>
        </div>
      </section>

      {isModalOpen && currentMysterySetDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-1">
          <div className="absolute inset-0 z-0 bg-black/50">
            <Image src="/images/modal-background.gif" alt="Modal Background" fill className="object-cover" priority />
          </div>
          <div className="rounded-2xl w-full max-w-[90vw] h-[105vh] relative overflow-hidden border border-gray-300/20 z-10 bg-black/20 backdrop-blur-sm">
            {/* Header - Fixed height */}
            <div className="bg-black/90 backdrop-blur-sm p-4 sm:p-6 py-6 sm:py-8 text-center relative z-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora tracking-wider">
                {currentMysterySetDetails.title}
              </h2>
              <button
                onClick={closeModal}
                className="absolute top-3 right-4 sm:top-4 sm:right-6 text-white text-3xl sm:text-4xl transition-colors duration-300 z-30 cursor-pointer bg-black/20 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:text-[#FFE552]"
                type="button"
              >
                ×
              </button>
            </div>

            {/* Content Area */}
            <div className="relative h-[calc(105vh-60px)] overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src={currentMysterySetDetails.backgroundImage || "/placeholder.svg"}
                  alt="Mystery Background"
                  fill
                  className="object-cover opacity-40"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10"></div>

              <div className="relative z-20 h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
                {/* Desktop View */}
                <div className="hidden md:block">
                  <div className="relative mb-8">
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-1 bg-[#FFE552] rounded-full shadow-lg shadow-yellow-400/30 ${
                        expandedMysteryItem === null ? "animate-[lineRevealLeftToRight_1.5s_ease-out] opacity-0" : ""
                      }`}
                      style={{
                        top: "40px",
                        zIndex: 1,
                        opacity: expandedMysteryItem !== null ? 0.3 : undefined,
                        animationDelay: expandedMysteryItem === null ? "2.5s" : undefined,
                        animationFillMode: expandedMysteryItem === null ? "forwards" : undefined,
                      }}
                    ></div>
                    <div className="flex justify-between items-start gap-2 lg:gap-4 max-w-6xl mx-auto mt-4 relative z-10">
                      {currentMysterySetDetails.mysteries.map((mystery, index) => (
                        <div
                          key={index}
                          className="flex-1 relative animate-[beadReveal_0.8s_ease-out] opacity-0"
                          style={{
                            animationDelay: `${index * 0.4}s`,
                            animationFillMode: "forwards",
                          }}
                        >
                          <div
                            className={`w-8 h-8 lg:w-10 lg:h-10 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-gray-900 text-sm lg:text-base cursor-pointer transition-all duration-300 mx-auto mb-3 lg:mb-4 ${
                              expandedMysteryItem === index
                                ? "scale-125 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
                                : expandedMysteryItem !== null
                                  ? "hover:scale-110 opacity-30"
                                  : "hover:scale-110"
                            }`}
                            onClick={() => toggleMysteryItem(index)}
                            style={{ marginTop: "25px" }}
                          >
                            {index + 1}
                          </div>
                          <div className="text-center">
                            <h3
                              className={`text-[#FFE552] text-xs lg:text-sm xl:text-base font-semibold mb-2 lg:mb-3 cursor-pointer hover:text-yellow-300 transition-colors duration-300 font-inter px-1 ${
                                expandedMysteryItem !== null && expandedMysteryItem !== index ? "opacity-30" : ""
                              }`}
                              onClick={() => toggleMysteryItem(index)}
                            >
                              {mystery.title}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {expandedMysteryItem !== null && (
                    <div className="max-w-6xl mx-auto animate-in fade-in duration-300 mb-8">
                      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-3 lg:p-4 xl:p-6">
                        <div className="grid grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
                          <div className="col-span-2 space-y-4 lg:space-y-6">
                            <div>
                              <strong className="text-[#82FAFA] block mb-1 lg:mb-2 font-inter text-sm lg:text-base">
                                Significance:
                              </strong>
                              <p className="font-inter text-white leading-relaxed text-xs lg:text-sm">
                                {currentMysterySetDetails.mysteries[expandedMysteryItem].significance}
                              </p>
                            </div>
                            <div>
                              <strong className="text-[#82FAFA] block mb-1 lg:mb-2 font-inter text-sm lg:text-base">
                                Reflection:
                              </strong>
                              <p className="font-inter text-white leading-relaxed text-xs lg:text-sm">
                                {currentMysterySetDetails.mysteries[expandedMysteryItem].reflection}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-1 space-y-2 lg:space-y-2">
                            <h4 className="text-[#82FAFA] font-inter text-sm lg:text-base font-semibold mb-3 lg:mb-4">
                              Choose Perspectives:
                            </h4>
                            {[3, 7, 12].map((p) => (
                              <button
                                key={p}
                                onClick={() => {
                                  if (selectedMysterySetIndex === null || expandedMysteryItem === null) return
                                  const setKey = mysterySetKeys[selectedMysterySetIndex]
                                  playAudio(setKey, expandedMysteryItem, p as 3 | 7 | 12)
                                }}
                                className={`w-full py-2 lg:py-3 px-3 lg:px-4 rounded-md transition-all duration-200 flex items-center justify-center font-inter border-2 text-xs lg:text-sm ${
                                  nowPlaying &&
                                  nowPlaying.mysteryIndex === expandedMysteryItem &&
                                  nowPlaying.perspective === p
                                    ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                                    : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                                }`}
                              >
                                {nowPlaying &&
                                nowPlaying.mysteryIndex === expandedMysteryItem &&
                                nowPlaying.perspective === p &&
                                audioPlayerRef.current &&
                                !audioPlayerRef.current.paused ? (
                                  <PauseCircle size={18} className="mr-2" />
                                ) : (
                                  <PlayCircle size={18} className="mr-2" />
                                )}
                                {p} Perspectives
                              </button>
                            ))}
                            {nowPlaying && nowPlaying.mysteryIndex === expandedMysteryItem && (
                              <div className="mt-4 lg:mt-6 space-y-3 lg:space-y-4 p-3 lg:p-4 bg-black/40 rounded-lg">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs lg:text-sm text-[#82FAFA]">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                  </div>
                                  <div
                                    className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                                    onClick={handleProgressClick}
                                  >
                                    <div
                                      className="h-full bg-[#82FAFA] rounded-full transition-all duration-100"
                                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs lg:text-sm text-[#82FAFA] font-inter">
                                    Speed: {playbackSpeed}x
                                  </label>
                                  <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.25"
                                    value={playbackSpeed}
                                    onChange={(e) => handleSpeedChange(Number.parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                                  />
                                  <div className="flex justify-between text-xs text-gray-400">
                                    <span>0.5x</span>
                                    <span>1x</span>
                                    <span>1.5x</span>
                                    <span>2x</span>
                                  </div>
                                </div>
                                <div className="flex justify-center gap-3 lg:gap-4">
                                  <button
                                    onClick={() => handleRewind(10)}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label="Rewind 10 seconds"
                                  >
                                    <Rewind size={20} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (audioPlayerRef.current) {
                                        if (audioPlayerRef.current.paused) {
                                          audioPlayerRef.current
                                            .play()
                                            .catch((error) => console.error("Error resuming audio:", error))
                                        } else {
                                          audioPlayerRef.current.pause()
                                        }
                                      }
                                    }}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label={audioPlayerRef.current?.paused ? "Play" : "Pause"}
                                    disabled={!nowPlaying}
                                  >
                                    {audioPlayerRef.current && !audioPlayerRef.current.paused ? (
                                      <PauseCircle size={24} />
                                    ) : (
                                      <PlayCircle size={24} />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleFastForward(10)}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label="Fast forward 10 seconds"
                                  >
                                    <FastForward size={20} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-4 pb-8">
                  {currentMysterySetDetails.mysteries.map((mystery, index) => (
                    <div
                      key={index}
                      className="relative animate-[beadReveal_0.8s_ease-out] opacity-0"
                      style={{
                        animationDelay: `${index * 0.4}s`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <div
                        className={`w-10 h-10 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-gray-900 text-base cursor-pointer transition-all duration-300 mx-auto mb-4 ${
                          expandedMysteryItem === index
                            ? "scale-110 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
                            : "hover:scale-105"
                        }`}
                        onClick={() => toggleMysteryItem(index)}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={`rounded-2xl p-4 text-center transition-all duration-300 ${
                          expandedMysteryItem === index ? "backdrop-blur-md bg-white/10" : "bg-transparent"
                        }`}
                      >
                        <h3
                          className={`text-lg font-semibold mb-4 cursor-pointer transition-colors duration-300 font-inter ${
                            expandedMysteryItem === index
                              ? "text-white hover:text-gray-300"
                              : "text-[#FFE552] hover:text-yellow-300"
                          }`}
                          onClick={() => toggleMysteryItem(index)}
                        >
                          {mystery.title}
                        </h3>
                        {expandedMysteryItem === index && (
                          <div className="text-white text-sm leading-relaxed space-y-4 animate-in fade-in duration-300 text-left">
                            <div>
                              <strong className="text-[#82FAFA] block mb-2 font-inter">Significance:</strong>
                              <p className="font-inter">{mystery.significance}</p>
                            </div>
                            <div>
                              <strong className="text-[#82FAFA] block mb-2 font-inter">Reflection:</strong>
                              <p className="font-inter">{mystery.reflection}</p>
                            </div>
                            <div className="mt-6">
                              <h4 className="text-[#82FAFA] font-inter text-sm font-semibold mb-3">
                                Choose Perspectives:
                              </h4>
                              <div className="space-y-2 flex flex-col items-center">
                                {[3, 7, 12].map((p) => (
                                  <button
                                    key={p}
                                    onClick={() => {
                                      if (selectedMysterySetIndex === null) return
                                      const setKey = mysterySetKeys[selectedMysterySetIndex]
                                      playAudio(setKey, index, p as 3 | 7 | 12)
                                    }}
                                    className={`w-full text-sm py-2 px-3 rounded-md transition-all duration-200 flex items-center justify-center border-2 ${
                                      nowPlaying && nowPlaying.mysteryIndex === index && nowPlaying.perspective === p
                                        ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                                        : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                                    }`}
                                  >
                                    {nowPlaying &&
                                    nowPlaying.mysteryIndex === index &&
                                    nowPlaying.perspective === p &&
                                    audioPlayerRef.current &&
                                    !audioPlayerRef.current.paused ? (
                                      <PauseCircle size={16} className="mr-2" />
                                    ) : (
                                      <PlayCircle size={16} className="mr-2" />
                                    )}
                                    {p} Perspectives
                                  </button>
                                ))}
                              </div>
                            </div>
                            {nowPlaying && nowPlaying.mysteryIndex === index && (
                              <div className="mt-4 space-y-3 p-3 bg-black/40 rounded-lg">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs text-[#82FAFA]">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                  </div>
                                  <div
                                    className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                                    onClick={handleProgressClick}
                                  >
                                    <div
                                      className="h-full bg-[#82FAFA] rounded-full transition-all duration-100"
                                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs text-[#82FAFA] font-inter">Speed: {playbackSpeed}x</label>
                                  <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.25"
                                    value={playbackSpeed}
                                    onChange={(e) => handleSpeedChange(Number.parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                  />
                                </div>
                                <div className="flex justify-center gap-4">
                                  <button
                                    onClick={() => handleRewind(10)}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label="Rewind 10 seconds"
                                  >
                                    <Rewind size={20} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (audioPlayerRef.current) {
                                        if (audioPlayerRef.current.paused) {
                                          audioPlayerRef.current
                                            .play()
                                            .catch((error) => console.error("Error resuming audio:", error))
                                        } else {
                                          audioPlayerRef.current.pause()
                                        }
                                      }
                                    }}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label={audioPlayerRef.current?.paused ? "Play" : "Pause"}
                                    disabled={!nowPlaying}
                                  >
                                    {audioPlayerRef.current && !audioPlayerRef.current.paused ? (
                                      <PauseCircle size={20} />
                                    ) : (
                                      <PlayCircle size={20} />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleFastForward(10)}
                                    className="text-[#82FAFA] hover:text-white transition-colors duration-200"
                                    aria-label="Fast forward 10 seconds"
                                  >
                                    <FastForward size={20} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
      .slider::-webkit-slider-thumb {
        appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #82FAFA;
        cursor: pointer;
      }
      .slider::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #82FAFA;
        cursor: pointer;
        border: none;
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
      )}
    </div>
  )
}
