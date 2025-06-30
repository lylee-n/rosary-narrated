"use client"

import { memo } from "react"
import { PlayCircle, PauseCircle } from "lucide-react"
import type { NowPlaying } from "@/types"

interface PerspectiveButtonsProps {
  mysteryIndex: number
  nowPlaying: NowPlaying | null
  isPlaying: boolean
  onPlay: (mysteryIndex: number, perspective: 3 | 7 | 12) => void
  className?: string
}

export const PerspectiveButtons = memo(function PerspectiveButtons({
  mysteryIndex,
  nowPlaying,
  isPlaying,
  onPlay,
  className = "",
}: PerspectiveButtonsProps) {
  const perspectives = [3, 7, 12] as const

  return (
    <div className={`space-y-2 ${className}`}>
      <h4 className="text-[#82FAFA] font-inter text-sm lg:text-base font-semibold mb-3 lg:mb-4">
        Choose Perspectives:
      </h4>
      <div className="space-y-2 flex flex-col items-center">
        {perspectives.map((perspective) => {
          const isCurrentlyPlaying =
            nowPlaying?.mysteryIndex === mysteryIndex && nowPlaying?.perspective === perspective && isPlaying

          return (
            <button
              key={perspective}
              onClick={() => onPlay(mysteryIndex, perspective)}
              className={`w-full py-2 lg:py-3 px-3 lg:px-4 rounded-md transition-all duration-200 flex items-center justify-center font-inter border-2 text-xs lg:text-sm ${
                nowPlaying?.mysteryIndex === mysteryIndex && nowPlaying?.perspective === perspective
                  ? "bg-[#82FAFA] text-black border-[#82FAFA] font-semibold"
                  : "bg-transparent text-[#82FAFA] border-[#82FAFA] hover:bg-[#82FAFA] hover:text-black"
              }`}
            >
              {isCurrentlyPlaying ? (
                <PauseCircle size={18} className="mr-2" />
              ) : (
                <PlayCircle size={18} className="mr-2" />
              )}
              {perspective} Perspectives
            </button>
          )
        })}
      </div>
    </div>
  )
})
