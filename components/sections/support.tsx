"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { useTranslations } from "@/hooks/use-translations"
import { ChevronDown } from "lucide-react"
import { useRef } from "react"

export function SupportSection() {
  const t = useTranslations()
  const supportCardsRef = useRef<HTMLDivElement>(null)
  const involvedCardsRef = useRef<HTMLDivElement>(null)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8">
          {t.sections.support.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed">
          {t.sections.support.subtitle}
        </p>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-white font-sora text-3xl md:text-4xl lg:text-5xl font-bold">Support Us</h2>
      </div>

      <div className="flex justify-center mb-16">
        <ChevronDown
          className="text-gray-500 w-8 h-8 cursor-pointer transition-transform duration-300 hover:translate-y-1"
          onClick={() => supportCardsRef.current?.scrollIntoView({ behavior: "smooth" })}
        />
      </div>

      <div ref={supportCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
        {/* Support Monthly Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center flex flex-col items-center">
          <h3 className="text-white text-2xl font-semibold mb-6 font-sora">{t.sections.support.cards.monthly.title}</h3>
          <p className="text-gray-300 font-inter leading-relaxed flex-grow mb-6">
            {t.sections.support.cards.monthly.description}
          </p>
          <CustomButton
            variant="yellow"
            size="lg"
            className="w-full"
            onClick={() => window.open("https://stripe.com/monthly-support", "_blank")}
          >
            {t.sections.support.cards.monthly.cta}
          </CustomButton>
        </div>

        {/* Donate One-Time Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center flex flex-col items-center">
          <h3 className="text-white text-2xl font-semibold mb-6 font-sora">{t.sections.support.cards.oneTime.title}</h3>
          <p className="text-gray-300 font-inter leading-relaxed flex-grow mb-6">
            {t.sections.support.cards.oneTime.description}
          </p>
          <CustomButton
            variant="yellow"
            size="lg"
            className="w-full"
            onClick={() => window.open("https://stripe.com/one-time-donation", "_blank")}
          >
            {t.sections.support.cards.oneTime.cta}
          </CustomButton>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-white font-sora text-3xl md:text-4xl lg:text-5xl font-bold">Get Involved</h2>
      </div>

      <div className="flex justify-center mb-16">
        <ChevronDown
          className="text-gray-500 w-8 h-8 cursor-pointer transition-transform duration-300 hover:translate-y-1"
          onClick={() => involvedCardsRef.current?.scrollIntoView({ behavior: "smooth" })}
        />
      </div>

      <div ref={involvedCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Volunteer Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center flex flex-col items-center">
          <h3 className="text-white text-2xl font-semibold mb-6 font-sora">
            {t.sections.support.cards.volunteer.title}
          </h3>
          <p className="text-gray-300 font-inter leading-relaxed flex-grow mb-6">
            {t.sections.support.cards.volunteer.description}
          </p>
          <CustomButton
            variant="yellow"
            size="lg"
            className="w-full"
            onClick={() => (window.location.href = "mailto:rosarynarrated@gmail.com")}
          >
            {t.sections.support.cards.volunteer.cta}
          </CustomButton>
        </div>

        {/* Partner Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center flex flex-col items-center">
          <h3 className="text-white text-2xl font-semibold mb-6 font-sora">{t.sections.support.cards.partner.title}</h3>
          <p className="text-gray-300 font-inter leading-relaxed flex-grow mb-6">
            {t.sections.support.cards.partner.description}
          </p>
          <CustomButton
            variant="yellow"
            size="lg"
            className="w-full"
            onClick={() => (window.location.href = "mailto:rosarynarrated@gmail.com")}
          >
            {t.sections.support.cards.partner.cta}
          </CustomButton>
        </div>
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-400 font-inter">
          {t.sections.support.contact}{" "}
          <a href="mailto:rosarynarrated@gmail.com" className="text-[#FFE552] hover:underline">
            rosarynarrated@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
