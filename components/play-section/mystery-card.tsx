"use client"

import type React from "react"

import { PlayCircle, PauseCircle } from "lucide-react"
import { AudioPlayer } from "./audio-player"
import type { Mystery } from "@/types"

interface MysteryCardProps {
  mystery: Mystery
  mysteryIndex: number
  onAudioPlay: (mysteryIndex: number, perspective: number) => void
  nowPlaying: { mysteryIndex: number; perspective: number } | null
  audioPlayerRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  setCurrentTime: (time: number) => void
  duration: number
  playbackSpeed: number
  setPlaybackSpeed: (speed: number) => void
  isExpanded?: boolean
  onToggle?: () => void
  isDesktop: boolean
}

export function MysteryCard({
  mystery,
  mysteryIndex,
  onAudioPlay,
  nowPlaying,
  audioPlayerRef,
  currentTime,
  setCurrentTime,
  duration,
  playbackSpeed,
  setPlaybackSpeed,
  isExpanded = true,
  onToggle,
  isDesktop,
}: MysteryCardProps) {
  if (isDesktop) {
    return (
      <div className="max-w-6xl mx-auto animate-in fade-in duration-300 mb-8">
        <div className="backdrop-blur-md bg-white/15 rounded-2xl p-3 lg:p-4 xl:p-6">
          <div className="grid grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
            <div className="col-span-2 space-y-4 lg:space-y-6">
              <div>
                <strong className="text-[#82FAFA] block mb-1 lg:mb-2 font-inter text-sm lg:text-base">
                  Significance:
                </strong>
                <p className="font-inter text-white leading-relaxed text-xs lg:text-sm">{mystery.significance}</p>
              </div>
              <div>
                <strong className="text-[#82FAFA] block mb-1 lg:mb-2 font-inter text-sm lg:text-base">
                  Reflection:
                </strong>
                <p className="font-inter text-white leading-relaxed text-xs lg:text-sm">{mystery.reflection}</p>
              </div>
            </div>
            <div className="col-span-1 space-y-2 lg:space-y-2">
              <h4 className="text-[#82FAFA] font-inter text-sm lg:text-base font-semibold mb-3 lg:mb-4">
                Choose Perspectives:
              </h4>
              {[3, 7, 12].map((p) => (
                <button
                  key={p}
                  onClick={() => onAudioPlay(mysteryIndex, p)}
                  className={`w-full py-2 lg:py-3 px-3 lg:px-4 rounded-md transition-all duration-200 flex items-center justify-center font-inter border-2 text-xs lg:text-sm ${
                    nowPlaying?.mysteryIndex === mysteryIndex && nowPlaying?.perspective === p
                      ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                      : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                  }`}
                >
                  {nowPlaying?.mysteryIndex === mysteryIndex &&
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
              {nowPlaying && nowPlaying.mysteryIndex === mysteryIndex && (
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
    )
  }

  return (
    <div
      className={`rounded-2xl p-4 text-center transition-all duration-300 ${
        isExpanded ? "backdrop-blur-md bg-white/15" : "bg-transparent"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 cursor-pointer transition-colors duration-300 font-inter ${
          isExpanded ? "text-white hover:text-gray-300" : "text-[#FFE552] hover:text-yellow-300"
        }`}
        onClick={onToggle}
      >
        {mystery.title}
      </h3>
      {isExpanded && (
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
                  onClick={() => onAudioPlay(mysteryIndex, p)}
                  className={`w-full text-sm py-2 px-3 rounded-md transition-all duration-200 flex items-center justify-center border-2 ${
                    nowPlaying?.mysteryIndex === mysteryIndex && nowPlaying?.perspective === p
                      ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                      : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
                  }`}
                >
                  {nowPlaying?.mysteryIndex === mysteryIndex &&
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
          {nowPlaying && nowPlaying.mysteryIndex === mysteryIndex && (
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
  )
}
