"use client"

import type React from "react"

import { MysteryCard } from "./mystery-card"
import type { Mystery } from "@/types"

interface MysteryListProps {
  mysteries: Mystery[]
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

export function MysteryList({
  mysteries,
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
}: MysteryListProps) {
  return (
    <div className="md:hidden space-y-4 pb-8">
      {mysteries.map((mystery, index) => (
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
              expandedMystery === index ? "scale-110 shadow-[0_0_20px_rgba(255,229,82,0.8)]" : "hover:scale-105"
            }`}
            onClick={() => onMysterySelect(index)}
          >
            {index + 1}
          </div>

          <MysteryCard
            mystery={mystery}
            mysteryIndex={index}
            onAudioPlay={onAudioPlay}
            nowPlaying={nowPlaying}
            audioPlayerRef={audioPlayerRef}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            isExpanded={expandedMystery === index}
            onToggle={() => onMysterySelect(index)}
            isDesktop={false}
          />
        </div>
      ))}

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
