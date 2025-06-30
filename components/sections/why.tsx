"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"
import { cardDataEn } from "@/lib/rosary-data-en"

export function WhySection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { setView } = useApp()

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  // Background images for each card
  const cardImages = [
    "/images/Jesus-baptized-new.jpeg", // For card 1 - Fix your eyes on Jesus
    "/images/luminous-mysteries.jpeg", // For card 2 - Where two or three are gathered
    "/images/rosary-decades-header.png", // For card 3 - Mary continues to intercede
  ]

  return (
    <div className="container mx-auto px-4">
      <section className="my-12">
        <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold text-center mb-12 md:mb-20">
          Why Pray the Rosary?
        </h2>

        {/* Description text below header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h3 className="text-white font-sora text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
            A Sacred Journey Through Scripture
          </h3>
          <p className="text-gray-200 font-inter text-lg md:text-xl leading-relaxed">
            Experience the mysteries of Christ's life through guided meditation and prayer
          </p>
        </div>

        {/* Full-width cards in separate rows - consistent layout with text left, image right */}
        <div className="space-y-12 mb-24">
          {cardDataEn.map((card, index) => (
            <div
              key={index}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleCardClick(index)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-gray-700 hover:border-[#82FAFA] transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Text Column - Always on the left */}
                  <div className="p-8 md:p-12 flex flex-col justify-center bg-black/60 backdrop-blur-sm">
                    {/* Number Badge - Removed background opacity */}
                    <div className="flex justify-start mb-6">
                      <div className="w-12 h-12 border-2 border-[#82FAFA] text-[#82FAFA] rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110">
                        {card.number}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div>
                      <p className="text-white font-inter leading-relaxed text-base md:text-lg mb-4">
                        {expandedCard === index ? card.fullText : card.shortText}
                      </p>

                      {/* Expand/Collapse Icon */}
                      <div className="flex justify-start">
                        <Plus
                          className={`w-6 h-6 text-[#82FAFA] transition-all duration-300 group-hover:scale-110 ${
                            expandedCard === index ? "rotate-45" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Column - Always on the right */}
                  <div className="aspect-[4/3] md:aspect-auto relative">
                    <Image
                      src={cardImages[index] || "/placeholder.svg"}
                      alt={`Card ${index + 1} background`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Fixed gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40 md:hidden" />
                  </div>
                </div>

                {/* Subtle hover overlay - reduced opacity to fix layout issue */}
                <div className="absolute inset-0 bg-[#82FAFA]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CustomButton onClick={() => setView("PLAY")} size="lg">
            <span className="hidden md:inline">Pray the Rosary</span>
            <span className="md:hidden">Pray</span>
          </CustomButton>
        </div>
      </section>
    </div>
  )
}
