"use client"
import { useState } from "react"
import Image from "next/image"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"
import { PlayModal } from "@/components/play-section/play-modal"
import { dataService } from "@/lib/services/data-service"
import { MYSTERY_IMAGES } from "@/constants"

export function PlaySection() {
  const { setView } = useApp()
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState<number | null>(null)

  const mysterySetKeys = dataService.getMysterySetKeys()

  const openModal = (mysterySetIdx: number) => {
    setSelectedMysterySetIndex(mysterySetIdx)
  }

  const closeModal = () => {
    setSelectedMysterySetIndex(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="my-12 md:my-20">
        <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold text-center mb-8 md:mb-16">
          The Mysteries of the Rosary
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed text-center mb-12 md:mb-20">
          Each Mystery tells a story. Experience them through audio and visuals designed to help you connect. Choose a
          set to get started.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {MYSTERY_IMAGES.map((image, index) => {
            const mysterySetTitle = dataService.getMysterySetTitle(index)

            return (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => openModal(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${mysterySetTitle} Mysteries`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex items-center justify-center p-6">
                  <h3 className="text-3xl font-black text-[#FFE552] uppercase tracking-[0.2em] text-center transition-colors duration-300">
                    {mysterySetTitle.replace(" Mysteries", "")}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-24">
          <CustomButton onClick={() => setView("COMMUNITY")} size="lg" variant="yellow">
            Community
          </CustomButton>
        </div>
      </section>

      {selectedMysterySetIndex !== null && (
        <PlayModal selectedMysterySetIndex={selectedMysterySetIndex} onClose={closeModal} />
      )}
    </div>
  )
}
