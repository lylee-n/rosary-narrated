"use client"

import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { MysteryTitle } from "@/components/ui/mystery-title"
import { PlayModal } from "@/components/play-section/play-modal"
import { useMobile } from "@/lib/hooks/use-mobile"

const MYSTERY_SETS = [
  {
    id: "joyful",
    titleKey: "joyfulMysteries",
    image: "/images/Jesus-baptized-new.jpeg",
    gradient: "from-blue-600/80 to-purple-600/80",
  },
  {
    id: "luminous",
    titleKey: "luminousMysteries",
    image: "/images/luminous-mysteries.jpeg",
    gradient: "from-yellow-500/80 to-orange-600/80",
  },
  {
    id: "sorrowful",
    titleKey: "sorrowfulMysteries",
    image: "/images/Jesus-baptized.png",
    gradient: "from-red-600/80 to-pink-600/80",
  },
  {
    id: "glorious",
    titleKey: "gloriousMysteries",
    image: "/images/rosary-decades-header.png",
    gradient: "from-green-600/80 to-teal-600/80",
  },
]

export function PlaySection() {
  const { t } = useTranslations()
  const isMobile = useMobile()
  const [selectedMystery, setSelectedMystery] = useState<string | null>(null)

  const handleMysteryClick = (mysteryId: string) => {
    setSelectedMystery(mysteryId)
  }

  const handleCloseModal = () => {
    setSelectedMystery(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/images/background.gif')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <MysteryTitle title={t("prayPageTitle")} subtitle={t("prayPageSubtitle")} size="lg" className="mb-6" />
        </div>

        {/* Mystery Cards Grid - 2x2 Layout */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {MYSTERY_SETS.map((mystery) => (
              <div
                key={mystery.id}
                onClick={() => handleMysteryClick(mystery.id)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl aspect-[4/3]"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${mystery.image})` }}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mystery.gradient} transition-opacity duration-300 group-hover:opacity-90`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-white font-sora font-bold text-xl md:text-2xl lg:text-3xl leading-tight drop-shadow-lg">
                      {t(mystery.titleKey)}
                    </h3>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#82FAFA]/50 rounded-2xl transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={() => {
              /* Navigate to community */
            }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#82FAFA] to-[#0EA5E9] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            {t("community")} →
          </button>
        </div>
      </div>

      {/* Play Modal */}
      {selectedMystery && (
        <PlayModal mysterySetId={selectedMystery} isOpen={!!selectedMystery} onClose={handleCloseModal} />
      )}
    </div>
  )
}
