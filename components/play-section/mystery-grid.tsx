"use client"

import type React from "react"
import Image from "next/image"
import { MysteryCard } from "./mystery-card"
import type { Mystery } from "@/types"

interface MysteryGridProps {
  mysteries: Mystery[]
  backgroundImage?: string
  onMysterySelect: (index: number) => void
  onAudioPlay: (mysteryIndex: number, perspective: number) => void
  expandedMystery: number | null
  nowPlaying: { mysteryIndex: number; perspective: number } | null
  audioPlayerRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  setCurrentTime: (time: number) => void
  duration: number
  playbackSpeed: number
  setPlaybackSpeed: (speed: number) => void
}

export function MysteryGrid({
  mysteries,
  backgroundImage,
  onMysterySelect,
  onAudioPlay,
  expandedMystery,
  nowPlaying,
  audioPlayerRef,
  currentTime,
  setCurrentTime,
  duration,
  playbackSpeed,
  setPlaybackSpeed,
}: MysteryGridProps) {
  return (
    <div className="hidden md:block relative h-[calc(100vh-80px)] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="Mystery Background"
          fill
          className="object-cover opacity-70"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full modal-scroll-container p-4 sm:p-6 lg:p-8">
        <div className="relative mb-8">
          {/* Timeline */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-1 bg-[#FFE552] rounded-full shadow-lg shadow-yellow-400/30 ${
              expandedMystery === null ? "animate-[lineRevealLeftToRight_1.5s_ease-out] opacity-0" : ""
            }`}
            style={{
              top: "40px",
              zIndex: 1,
              opacity: expandedMystery !== null ? 0.3 : undefined,
              animationDelay: expandedMystery === null ? "2.5s" : undefined,
              animationFillMode: expandedMystery === null ? "forwards" : undefined,
            }}
          ></div>

          {/* Mystery Beads */}
          <div className="flex justify-between items-start gap-2 lg:gap-4 max-w-6xl mx-auto mt-4 relative z-10">
            {mysteries.map((mystery, index) => (
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
                    expandedMystery === index
                      ? "scale-125 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
                      : expandedMystery !== null
                        ? "hover:scale-110 opacity-30"
                        : "hover:scale-110"
                  }`}
                  onClick={() => onMysterySelect(index)}
                  style={{ marginTop: "25px" }}
                >
                  {index + 1}
                </div>
                <div className="text-center">
                  <h3
                    className={`text-[#FFE552] text-xs lg:text-sm xl:text-base font-semibold mb-2 lg:mb-3 cursor-pointer hover:text-yellow-300 transition-colors duration-300 font-inter px-1 ${
                      expandedMystery !== null && expandedMystery !== index ? "opacity-30" : ""
                    }`}
                    onClick={() => onMysterySelect(index)}
                  >
                    {mystery.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded Mystery Card */}
        {expandedMystery !== null && (
          <MysteryCard
            mystery={mysteries[expandedMystery]}
            mysteryIndex={expandedMystery}
            onAudioPlay={onAudioPlay}
            nowPlaying={nowPlaying}
            audioPlayerRef={audioPlayerRef}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            isDesktop={true}
          />
        )}
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
