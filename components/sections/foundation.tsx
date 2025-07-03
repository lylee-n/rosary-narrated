"use client"

import { useState } from "react"
import Image from "next/image"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { PlayModal } from "@/components/play-section/play-modal"
import { useApp } from "@/components/app-provider"

export function FoundationSection() {
  const { setView } = useApp()
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState<number | null>(null)

  const handleMysterySetClick = (index: number) => {
    setSelectedMysterySetIndex(index)
  }

  const handleCloseModal = () => {
    setSelectedMysterySetIndex(null)
  }

  // Extract just the mystery type names
  const mysteryTitles = ["Joyful", "Luminous", "Sorrowful", "Glorious"]

  return (
    <section className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8 md:mb-16">
            The Rosary Mysteries
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed mb-8">
            Choose a set of Mysteries for an audiovisual theology and storytelling experience.
          </p>
        </div>

        {/* 2x2 Grid for Desktop, Single Column for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {Object.entries(rosaryMysteriesDataEn).map(([key, mysterySet], index) => {
            return (
              <div
                key={key}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleMysterySetClick(index)}
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-700 transition-colors duration-300">
                  {/* Changed aspect ratio to 3:2 for desktop, keep 4:5 for mobile */}
                  <div className="aspect-[4/5] md:aspect-[3/2] relative">
                    <Image
                      src={mysterySet.backgroundImage || "/placeholder.svg"}
                      alt={mysteryTitles[index]}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Centered text on desktop - properly centered with fatter font and more letter spacing */}
                    <div className="hidden md:flex absolute inset-0 items-center justify-center">
                      <h3 className="text-white group-hover:text-[#FFE552] font-black text-4xl lg:text-5xl font-sora tracking-[0.2em] transition-colors duration-300 text-center">
                        {mysteryTitles[index].toUpperCase()}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom text for mobile only */}
                  <div className="md:hidden absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white group-hover:text-[#FFE552] text-2xl font-bold mb-2 font-sora transition-colors duration-300">
                      {mysteryTitles[index]}
                    </h3>
                    <p className="text-gray-300 text-sm font-inter">{mysterySet.mysteries.length} Mysteries</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedMysterySetIndex !== null && (
        <PlayModal selectedMysterySetIndex={selectedMysterySetIndex} onClose={handleCloseModal} />
      )}
    </section>
  )
}
