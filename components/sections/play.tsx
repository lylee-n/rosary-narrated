"use client"
import { useState } from "react"
import Image from "next/image"
import { mysteryTitlesEn } from "@/lib/rosary-data-en"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"
import { PlayModal } from "@/components/play-section/play-modal"

const mysteryImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mother%20Mary%20and%20Baby%20Jesus.png-0JeNAZJv87hYt6zZ2jUzbD7n6ZW6fX.jpeg", // Joyful
  "/images/Jesus-baptized-new.jpeg", // Luminous
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7d00b0ed1ef04406aabaa13e949ec1bb.png-c2sbiN5V7oDnFruPBdP5ERcEmaQ5Oe.jpeg", // Sorrowful
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c9ccf36706f49afae4b2e6148c718d1.png-rL1gIVUCQOFCDgt0iVcMUrcXh4UYiJ.jpeg", // Glorious
]

export function PlaySection() {
  const { setView } = useApp()
  const [selectedMysterySetIndex, setSelectedMysterySetIndex] = useState<number | null>(null)

  const openModal = (mysterySetIdx: number) => {
    setSelectedMysterySetIndex(mysterySetIdx)
  }

  const closeModal = () => {
    setSelectedMysterySetIndex(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="my-12 md:my-20">
        <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold text-center mb-8 md:mb-16">
          The Mysteries of the Rosary
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed text-center mb-12 md:mb-20">
          Learn more about our Savior and Mother Mary through the Rosary Mysteries. Click on a Mysteries set for an audiovisual storytelling experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {mysteryImages.map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => openModal(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${mysteryTitlesEn[index]} Mysteries`}
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex items-center justify-center p-6">
                <h3 className="text-3xl font-black text-[#FFE552] uppercase tracking-[0.2em] text-center transition-colors duration-300">
                  {mysteryTitlesEn[index]}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <CustomButton onClick={() => setView("SUPPORT")} size="lg" variant="yellow">
            Support This Mission
          </CustomButton>
        </div>
      </section>

      {selectedMysterySetIndex !== null && (
        <PlayModal selectedMysterySetIndex={selectedMysterySetIndex} closeModal={closeModal} />
      )}
    </div>
  )
}
