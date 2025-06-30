"use client"

import { useState } from "react"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { PlayModal } from "@/components/play-section/play-modal"
import { Button } from "@/components/ui/button"

export function PlaySection() {
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState<number | null>(null)

  const handleMysterySetSelect = (index: number) => {
    setSelectedMysterySetIndex(index)
  }

  const handleCloseModal = () => {
    setSelectedMysterySetIndex(null)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-sora">The Rosary Mysteries</h2>
        <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto">
          Each Mystery tells a story. Experience them through audio and visuals designed to help you connect. Choose a
          set to get started.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(rosaryMysteriesDataEn).map(([key, mysterySet], index) => (
            <div
              key={key}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleMysterySetSelect(index)}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 hover:border-[#FFE552] transition-colors">
                <div
                  className="w-full h-full bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundImage: `url(${mysterySet.backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-sora">{mysterySet.title}</h3>
                  <p className="text-sm text-gray-300">{mysterySet.mysteries.length} Mysteries</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => (window.location.href = "#community")}
            className="bg-[#FFE552] text-black hover:bg-[#FFE552]/90 font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105"
          >
            Community →
          </Button>
        </div>
      </div>

      {selectedMysterySetIndex !== null && (
        <PlayModal selectedMysterySetIndex={selectedMysterySetIndex} onClose={handleCloseModal} />
      )}
    </section>
  )
}
