"use client"

import { X } from "lucide-react"

interface PlayModalHeaderProps {
  title: string
  onClose: () => void
}

export function PlayModalHeader({ title, onClose }: PlayModalHeaderProps) {
  return (
    <div className="bg-black/90 backdrop-blur-sm p-4 sm:p-6 py-6 sm:py-8 text-center relative z-20 flex-shrink-0">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sora tracking-wider">
        {title}
      </h2>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-3 right-4 sm:top-4 sm:right-6 text-white text-3xl sm:text-4xl transition-colors duration-300 z-30 cursor-pointer bg-black/20 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:text-[#FFE552]"
        type="button"
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
    </div>
  )
}
