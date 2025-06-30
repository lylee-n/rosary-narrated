"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function AboutSection() {
  const { setView } = useApp()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8">
          Welcome to Rosary Narrated
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed">
          A guided audiovisual experience through the mysteries of the Rosary, designed to deepen your prayer life and
          spiritual connection.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* What is this? */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 md:p-12">
          <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold mb-6">What is this?</h2>
          <p className="text-lg text-gray-300 font-inter leading-relaxed mb-6">
            This is an audiovisual-guided experience through the traditional Catholic Rosary prayers, enhanced with
            contemplative reflections on the mysteries of Christ's life.
          </p>
          <p className="text-lg text-gray-300 font-inter leading-relaxed">
            Each mystery is presented with thoughtful narration designed to help you enter more deeply into prayer and
            meditation.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 md:p-12">
          <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold mb-6">How it works</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#82FAFA] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-black font-bold text-sm">1</span>
              </div>
              <p className="text-lg text-gray-300 font-inter leading-relaxed">
                Choose a set of mysteries (Joyful, Luminous, Sorrowful, or Glorious)
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#82FAFA] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-black font-bold text-sm">2</span>
              </div>
              <p className="text-lg text-gray-300 font-inter leading-relaxed">
                Select your perspectives set (3, 7 or 12)
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#82FAFA] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-black font-bold text-sm">3</span>
              </div>
              <p className="text-lg text-gray-300 font-inter leading-relaxed">
                Listen and pray along as you're guided through each mystery with thoughtful reflections
              </p>
            </div>
          </div>
        </div>

        {/* Who is this for? */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 md:p-12">
          <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold mb-6">Who is this for?</h2>
          <p className="text-lg text-gray-300 font-inter leading-relaxed mb-6">
            Whether you're new to the Rosary or have been praying it for years, this experience is designed to help you
            connect more deeply with these timeless prayers.
          </p>
          <p className="text-lg text-gray-300 font-inter leading-relaxed">
            The different perspective levels make it accessible for families, individuals seeking simplicity, or those
            wanting deeper theological reflection.
          </p>
        </div>
      </div>

      <div className="text-center mt-16">
        <CustomButton onClick={() => setView("WHY")} size="lg">
          Why Pray the Rosary?
        </CustomButton>
      </div>
    </div>
  )
}
