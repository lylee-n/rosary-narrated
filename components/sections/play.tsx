"use client"

import { useState } from "react"
import Image from "next/image"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { PlayModal } from "@/components/play-section/play-modal"

export function PlaySection() {
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState<number | null>(null)

  const handleMysterySetClick = (index: number) => {
    setSelectedMysterySetIndex(index)
  }

  const handleCloseModal = () => {
    setSelectedMysterySetIndex(null)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sora">The Rosary Mysteries</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter">
            Each Mystery tells a story. Experience them through audio and visuals designed to help you connect. Choose a
            set to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(rosaryMysteriesDataEn).map(([key, mysterySet], index) => (
            <div
              key={key}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleMysterySetClick(index)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 hover:border-[#FFE552] transition-colors duration-300">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={mysterySet.backgroundImage || "/placeholder.svg"}
                    alt={mysterySet.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-sora group-hover:text-[#FFE552] transition-colors duration-300">
                    {mysterySet.title}
                  </h3>
                  <p className="text-gray-300 text-sm font-inter">{mysterySet.mysteries.length} Mysteries</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#FFE552]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 font-inter">Click on any mystery set to begin your guided prayer experience</p>
        </div>
      </div>

      {/* Modal */}
      {selectedMysterySetIndex !== null && (
        <PlayModal selectedMysterySetIndex={selectedMysterySetIndex} onClose={handleCloseModal} />
      )}
    </section>
  )
}
