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

  const cardImages = [
    "/images/Jesus-baptized-new.jpeg",
    "/images/luminous-mysteries.jpeg",
    "/images/rosary-decades-header.png",
  ]

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12">
            Why Pray the Rosary?
          </h1>
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-lg text-gray-300 font-inter leading-relaxed">
              Jesus's choices often puzzle us. Why does He do what He does? Why does the Father do what He does? His
              astronomical sacrificial love just doesn't make sense. The Father and Jesus think our souls are worth that
              much. While the heavens know He is the only one worthy (Revelation 5:2-9)—not any angel or archangel, but
              He—the Lamb. It will take us several lifetimes to fully understand. But here are our three reasons why we
              should pray the Rosary.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="space-y-12 mb-24">
          {cardDataEn.map((card, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-lg border border-gray-700/50"
              onClick={() => handleCardClick(index)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Text Column */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-black/30 backdrop-blur-sm">
                  <div className="flex justify-start mb-6">
                    <div className="w-12 h-12 border-2 border-[#82FAFA] text-[#82FAFA] rounded-full flex items-center justify-center font-bold text-lg transition-transform duration-300 group-hover:scale-110">
                      {card.number}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-300 font-inter leading-relaxed text-base md:text-lg mb-4">
                      {expandedCard === index ? card.fullText : card.shortText}
                    </p>
                    <div className="flex justify-start">
                      <Plus
                        className={`w-6 h-6 text-[#82FAFA] transition-transform duration-300 group-hover:scale-110 ${expandedCard === index ? "rotate-45" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Image Column */}
                <div className="aspect-[4/3] md:aspect-auto relative">
                  <Image
                    src={cardImages[index] || "/placeholder.svg"}
                    alt={`Card ${index + 1} background`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40 md:hidden" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <CustomButton onClick={() => setView("PLAY")} size="lg">
            <span className="hidden md:inline">Pray the Rosary</span>
            <span className="md:hidden">Pray</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
