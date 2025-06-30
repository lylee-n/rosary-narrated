"use client"

import { useState } from "react"
import Image from "next/image"
import { rosaryMysteriesDataEn } from "@/lib/rosary-data-en"
import { PlayModal } from "@/components/play-section/play-modal"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function PlaySection() {
  const { setView } = useApp()
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState<number | null>(null)

  const handleMysterySetClick = (index: number) => {
    setSelectedMysterySetIndex(index)
  }

  const handleCloseModal = () => {
    setSelectedMysterySetIndex(null)
  }

  return (
    <section className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8 md:mb-16">
            The Rosary Mysteries
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed mb-20">
            Each Mystery tells a story. Experience them through audio and visuals designed to help you connect. Choose a
            set to get started.
          </p>
        </div>

        {/* 2x2 Grid for Desktop, Single Column for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {Object.entries(rosaryMysteriesDataEn).map(([key, mysterySet], index) => (
            <div
              key={key}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleMysterySetClick(index)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-gray-700 hover:border-[#FFE552] transition-colors duration-300">
                {/* Changed aspect ratio to 3:2 for desktop, keep 4:5 for mobile */}
                <div className="aspect-[4/5] md:aspect-[3/2] relative">
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

        <div className="text-center mt-24">
          <CustomButton onClick={() => setView("COMMUNITY")} size="lg" variant="yellow">
            Community
          </CustomButton>
        </div>
      </div>

      {/* Modal */}
      {selectedMysterySetIndex !== null && (
        <PlayModal selectedMysterySetIndex={selectedMysterySetIndex} onClose={handleCloseModal} />
      )}
    </section>
  )
}
