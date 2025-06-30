"use client"

import type { Mystery } from "@/types"

interface MysteryNavigationProps {
  mysteries: Mystery[]
  currentMysteryIndex: number
  onMysterySelect: (index: number) => void
  isDesktop: boolean
}

export function MysteryNavigation({
  mysteries,
  currentMysteryIndex,
  onMysterySelect,
  isDesktop,
}: MysteryNavigationProps) {
  if (isDesktop) {
    return (
      <div className="relative mb-8">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-1 bg-[#FFE552] rounded-full shadow-lg shadow-yellow-400/30"
          style={{
            top: "40px",
            zIndex: 1,
            opacity: 0.3,
          }}
        />
        <div className="flex justify-between items-start gap-2 lg:gap-4 max-w-6xl mx-auto mt-4 relative z-10">
          {mysteries.map((mystery, index) => (
            <div key={index} className="flex-1 relative animate-[beadReveal_0.8s_ease-out] opacity-100">
              <div
                className={`w-8 h-8 lg:w-10 lg:h-10 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-gray-900 text-sm lg:text-base cursor-pointer transition-all duration-300 mx-auto mb-3 lg:mb-4 ${
                  currentMysteryIndex === index
                    ? "scale-125 shadow-[0_0_20px_rgba(255,229,82,0.8)]"
                    : currentMysteryIndex !== null
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
                    currentMysteryIndex !== null && currentMysteryIndex !== index ? "opacity-30" : ""
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
    )
  }

  return (
    <div className="flex overflow-x-auto space-x-4 pb-4 mb-6">
      {mysteries.map((mystery, index) => (
        <div key={index} className="flex-shrink-0 text-center cursor-pointer" onClick={() => onMysterySelect(index)}>
          <div
            className={`w-10 h-10 bg-[#FFE552] rounded-full flex items-center justify-center font-bold text-gray-900 text-base transition-all duration-300 mx-auto mb-2 ${
              currentMysteryIndex === index ? "scale-110 shadow-[0_0_20px_rgba(255,229,82,0.8)]" : "hover:scale-105"
            }`}
          >
            {index + 1}
          </div>
          <h3
            className={`text-xs font-semibold font-inter px-2 transition-colors duration-300 ${
              currentMysteryIndex === index ? "text-[#FFE552]" : "text-gray-300 hover:text-[#FFE552]"
            }`}
          >
            {mystery.title}
          </h3>
        </div>
      ))}
    </div>
  )
}
