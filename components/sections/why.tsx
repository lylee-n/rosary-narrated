"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"
import { cardDataEn } from "@/lib/rosary-data-en"

export function WhySection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { setView } = useApp()

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4">
      <section className="my-12">
        <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold text-center mb-12 md:mb-20">
          Why Pray the Rosary?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {cardDataEn.map((card, index) => (
            <div
              key={index}
              className="bg-black/60 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 cursor-pointer h-full"
              onClick={() => handleCardClick(index)}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-transparent border-2 border-[#82FAFA] text-[#82FAFA] rounded-full flex items-center justify-center font-bold text-sm mb-6 transition-all duration-300 group-hover:scale-110">
                {card.number}
              </div>
              <p className="flex-grow text-gray-300 font-inter leading-relaxed mb-4">
                {expandedCard === index ? card.fullText : card.shortText}
              </p>
              <div className="flex-shrink-0 mt-auto pt-4">
                <Plus
                  className={`w-5 h-5 text-[#326161] group-hover:text-[#82FAFA] transition-all duration-300 group-hover:scale-110 ${expandedCard === index ? "rotate-45 text-[#82FAFA]" : ""}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <CustomButton onClick={() => setView("PLAY")} size="lg">
            Pray
          </CustomButton>
        </div>
      </section>
    </div>
  )
}
