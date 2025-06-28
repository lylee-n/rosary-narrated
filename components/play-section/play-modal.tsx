"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { PlayCircle, PauseCircle } from "lucide-react"
import { audioData } from "@/lib/audio-data"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { AudioPlayer } from "./audio-player"

const mysterySetKeys = ["joyful", "luminous", "sorrowful", "glorious"]

interface PlayModalProps {
  selectedMysterySetIndex: number
  closeModal: () => void
}

export function PlayModal({ selectedMysterySetIndex, closeModal }: PlayModalProps) {
  const [expandedMysteryItem, setExpandedMysteryItem] = useState<number | null>(null)
  const [nowPlaying, setNowPlaying] = useState<{ src: string; mysteryIndex: number; perspective: number } | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null)

  const currentMysterySetDetails =
    rosaryMysteriesDataEn[(selectedMysterySetIndex + 1) as keyof typeof rosaryMysteriesDataEn]

  const handleClose = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      audioPlayerRef.current.src = ""
    }
    closeModal()
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
      if (!audioSrc || !audioPlayerRef.current) return

      if (nowPlaying?.src === audioSrc && !audioPlayerRef.current.paused) {
        audioPlayerRef.current.pause()
      } else if (nowPlaying?.src === audioSrc && audioPlayerRef.current.paused) {
        audioPlayerRef.current.play().catch(console.error)
      } else {
        audioPlayerRef.current.src = audioSrc
        audioPlayerRef.current.playbackRate = playbackSpeed
        audioPlayerRef.current.load()
        audioPlayerRef.current
          .play()
          .then(() => setNowPlaying({ src: audioSrc, mysteryIndex: mysteryItemIndex, perspective }))
          .catch(console.error)
      }
    },
    [nowPlaying, playbackSpeed],
  )

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-1">
      <audio ref={audioPlayerRef} preload="none" />
      <div className="absolute inset-0 z-0 bg-black/50">
        <Image src="/images/modal-background.gif" alt="Modal Background" fill className="object-cover" priority />
      </div>
      <div className="rounded-2xl w-full max-w-[90vw] h-[105vh] relative overflow-hidden border border-gray-300/20 z-10 bg-black/20 backdrop-blur-sm">
        <div className="bg-black/90 backdrop-blur-sm p-4 sm:p-6 py-6 sm:py-8 text-center relative z-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora tracking-wider">
            {currentMysterySetDetails.title}
          </h2>
          <button
            onClick={handleClose}
            className="absolute top-3 right-4 sm:top-4 sm:right-6 text-white text-3xl sm:text-4xl transition-colors duration-300 z-30 cursor-pointer bg-black/20 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:text-[#FFE552]"
            type="button"
          >
            ×
          </button>
        </div>

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
                              const setKey = mysterySetKeys[selectedMysterySetIndex]
                              playAudio(setKey, expandedMysteryItem, p as 3 | 7 | 12)
                            }}
                            className={`w-full py-2 lg:py-3 px-3 lg:px-4 rounded-md transition-all duration-200 flex items-center justify-center font-inter border-2 text-xs lg:text-sm ${
                              nowPlaying?.mysteryIndex === expandedMysteryItem && nowPlaying?.perspective === p
                                ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                                : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                            }`}
                          >
                            {nowPlaying?.mysteryIndex === expandedMysteryItem &&
                            nowPlaying?.perspective === p &&
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
                          <AudioPlayer
                            audioPlayerRef={audioPlayerRef}
                            currentTime={currentTime}
                            setCurrentTime={setCurrentTime}
                            duration={duration}
                            playbackSpeed={playbackSpeed}
                            setPlaybackSpeed={setPlaybackSpeed}
                          />
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
                          <h4 className="text-[#82FAFA] font-inter text-sm font-semibold mb-3">Choose Perspectives:</h4>
                          <div className="space-y-2 flex flex-col items-center">
                            {[3, 7, 12].map((p) => (
                              <button
                                key={p}
                                onClick={() => {
                                  const setKey = mysterySetKeys[selectedMysterySetIndex]
                                  playAudio(setKey, index, p as 3 | 7 | 12)
                                }}
                                className={`w-full text-sm py-2 px-3 rounded-md transition-all duration-200 flex items-center justify-center border-2 ${
                                  nowPlaying?.mysteryIndex === index && nowPlaying?.perspective === p
                                    ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                                    : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                                }`}
                              >
                                {nowPlaying?.mysteryIndex === index &&
                                nowPlaying?.perspective === p &&
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
                          <AudioPlayer
                            audioPlayerRef={audioPlayerRef}
                            currentTime={currentTime}
                            setCurrentTime={setCurrentTime}
                            duration={duration}
                            playbackSpeed={playbackSpeed}
                            setPlaybackSpeed={setPlaybackSpeed}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
    </div>
  )
}
