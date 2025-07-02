"use client"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function WhatSection() {
  const { setView } = useApp()

  return (
    <section className="w-full bg-black/30">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8 md:mb-12">
            What is the Rosary?
          </h2>
          <p className="text-gray-300 font-inter text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            The Rosary is a traditional Catholic prayer that combines vocal prayers with meditation on the life of Jesus
            Christ and the Virgin Mary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-24">
          {/* Card 1 */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-[#82FAFA] rounded-full flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">1</span>
            </div>
            <h3 className="text-white font-sora text-xl font-bold mb-3 text-left">Prayer & Meditation</h3>
            <p className="text-gray-300 font-inter leading-relaxed text-left">
              The Rosary combines vocal prayers like the Our Father and Hail Mary with contemplative meditation on the
              mysteries of Christ's life.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-[#82FAFA] rounded-full flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">2</span>
            </div>
            <h3 className="text-white font-sora text-xl font-bold mb-3 text-left">Four Mysteries</h3>
            <p className="text-gray-300 font-inter leading-relaxed text-left">
              The Rosary is divided into four sets of mysteries: Joyful, Luminous, Sorrowful, and Glorious, each
              focusing on different aspects of Jesus' life.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-[#82FAFA] rounded-full flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">3</span>
            </div>
            <h3 className="text-white font-sora text-xl font-bold mb-3 text-left">Spiritual Benefits</h3>
            <p className="text-gray-300 font-inter leading-relaxed text-left">
              Regular Rosary prayer brings peace, strengthens faith, and deepens your relationship with God through
              Mary's intercession.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-[#82FAFA] rounded-full flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">4</span>
            </div>
            <h3 className="text-white font-sora text-xl font-bold mb-3 text-left">Sacred Tradition</h3>
            <p className="text-gray-300 font-inter leading-relaxed text-left">
              The Rosary has been prayed by Catholics for centuries, connecting us to a rich tradition of Marian
              devotion and contemplative prayer.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-[#82FAFA] rounded-full flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">5</span>
            </div>
            <h3 className="text-white font-sora text-xl font-bold mb-3 text-left">Daily Practice</h3>
            <p className="text-gray-300 font-inter leading-relaxed text-left">
              Different mysteries are traditionally prayed on different days of the week, creating a rhythm of prayer
              throughout your spiritual journey.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-[#82FAFA] rounded-full flex items-center justify-center mb-4">
              <span className="text-black font-bold text-xl">6</span>
            </div>
            <h3 className="text-white font-sora text-xl font-bold mb-3 text-left">Universal Prayer</h3>
            <p className="text-gray-300 font-inter leading-relaxed text-left">
              The Rosary is prayed by millions of Catholics worldwide, creating a global community united in prayer and
              devotion to Our Lady.
            </p>
          </div>
        </div>

        <div className="text-center">
          <CustomButton onClick={() => setView("WHY")} size="lg" variant="yellow">
            <span className="hidden md:inline">Learn why pray the Rosary</span>
            <span className="md:hidden">Why pray?</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
