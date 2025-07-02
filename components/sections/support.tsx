"use client"

import { useRef } from "react"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { EXTERNAL_LINKS, CONTACT } from "@/constants"

export function SupportSection() {
  const t = useTranslations()
  const supportCardsRef = useRef<HTMLDivElement>(null)
  const involvedCardsRef = useRef<HTMLDivElement>(null)

  const scrollToSupportCards = () => {
    supportCardsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToInvolvedCards = () => {
    involvedCardsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12 md:mb-16">
            {t.sections.support.title}
          </h2>

          {/* Support Us Header */}
          <h3 className="text-white font-sora text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Support Us</h3>

          {/* Chevron Arrow for Support Us */}
          <ChevronDown
            className="w-8 h-8 text-gray-500 mx-auto mb-16 cursor-pointer transition-transform duration-300 hover:translate-y-1"
            onClick={scrollToSupportCards}
          />

          {/* Support Cards */}
          <div ref={supportCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            {/* Support Monthly Card */}
            <Card className="bg-white/5 border border-[#FFE552]/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-[#FFE552] font-sora text-xl font-bold mb-4">
                  {t.sections.support.cards.monthly.title}
                </h3>
                <p className="text-gray-300 font-inter text-sm mb-6 leading-relaxed">
                  {t.sections.support.cards.monthly.description}
                </p>
                <CustomButton
                  onClick={() => window.open(EXTERNAL_LINKS.monthlySupport, "_blank")}
                  size="md"
                  variant="yellow"
                >
                  {t.sections.support.cards.monthly.cta}
                </CustomButton>
              </CardContent>
            </Card>

            {/* Donate One-Time Card */}
            <Card className="bg-white/5 border border-[#FFE552]/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-[#FFE552] font-sora text-xl font-bold mb-4">
                  {t.sections.support.cards.oneTime.title}
                </h3>
                <p className="text-gray-300 font-inter text-sm mb-6 leading-relaxed">
                  {t.sections.support.cards.oneTime.description}
                </p>
                <CustomButton
                  onClick={() => window.open(EXTERNAL_LINKS.oneTimeDonation, "_blank")}
                  size="md"
                  variant="yellow"
                >
                  {t.sections.support.cards.oneTime.cta}
                </CustomButton>
              </CardContent>
            </Card>
          </div>

          {/* Get Involved Header */}
          <h3 className="text-white font-sora text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Get Involved</h3>

          {/* Chevron Arrow for Get Involved */}
          <ChevronDown
            className="w-8 h-8 text-gray-500 mx-auto mb-16 cursor-pointer transition-transform duration-300 hover:translate-y-1"
            onClick={scrollToInvolvedCards}
          />

          {/* Get Involved Cards */}
          <div ref={involvedCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Volunteer Card */}
            <Card className="bg-white/5 border border-[#FFE552]/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-[#FFE552] font-sora text-xl font-bold mb-4">
                  {t.sections.support.cards.volunteer.title}
                </h3>
                <p className="text-gray-300 font-inter text-sm mb-6 leading-relaxed">
                  {t.sections.support.cards.volunteer.description}
                </p>
                <CustomButton
                  onClick={() => window.open(`mailto:${CONTACT.email}?subject=Volunteer Inquiry`, "_blank")}
                  size="md"
                  variant="yellow"
                >
                  {t.sections.support.cards.volunteer.cta}
                </CustomButton>
              </CardContent>
            </Card>

            {/* Partner Card */}
            <Card className="bg-white/5 border border-[#FFE552]/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-[#FFE552] font-sora text-xl font-bold mb-4">
                  {t.sections.support.cards.partner.title}
                </h3>
                <p className="text-gray-300 font-inter text-sm mb-6 leading-relaxed">
                  {t.sections.support.cards.partner.description}
                </p>
                <CustomButton
                  onClick={() => window.open(`mailto:${CONTACT.email}?subject=Partnership Inquiry`, "_blank")}
                  size="md"
                  variant="yellow"
                >
                  {t.sections.support.cards.partner.cta}
                </CustomButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
