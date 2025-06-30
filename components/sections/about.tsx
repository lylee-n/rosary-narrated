"use client"

import { useState } from "react"
import Image from "next/image"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function AboutSection() {
  const { setView } = useApp()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Choose Your Mystery Set",
      description: "Select from Joyful, Luminous, Sorrowful, or Glorious Mysteries",
      image: "/images/rosary-decades-header.png",
    },
    {
      title: "Select Your Perspectives",
      description: "Select your perspectives set (3, 7 or 12).",
      image: "/images/Jesus-baptized-new.jpeg",
    },
    {
      title: "Begin Your Prayer",
      description: "Follow along with guided narration and beautiful visuals",
      image: "/images/luminous-mysteries.jpeg",
    },
  ]

  return (
    <section className="min-h-screen bg-transparent py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8">
            Welcome to Rosary Narrated
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto font-inter font-light leading-relaxed">
            A guided audiovisual experience through the mysteries of the Rosary. This is an audiovisual-guided
            experience designed to help you meditate on the life of Christ through the eyes of Mary.
          </p>
        </div>

        {/* How it works section */}
        <div className="mb-16">
          <h2 className="text-white font-sora text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>

          {/* Step indicators */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentStep === index ? "bg-[#FFE552]" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-white font-sora text-2xl md:text-3xl font-bold mb-4">{steps[currentStep].title}</h3>
                <p className="text-gray-300 font-inter text-lg leading-relaxed">{steps[currentStep].description}</p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={steps[currentStep].image || "/placeholder.svg"}
                  alt={steps[currentStep].title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#82FAFA] text-2xl">🎧</span>
            </div>
            <h3 className="text-white font-sora text-xl font-semibold mb-3">Audio Guided</h3>
            <p className="text-gray-300 font-inter">Professional narration guides you through each mystery</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#FFE552]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FFE552] text-2xl">🎨</span>
            </div>
            <h3 className="text-white font-sora text-xl font-semibold mb-3">Visual Experience</h3>
            <p className="text-gray-300 font-inter">Beautiful imagery enhances your meditation</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#82FAFA] text-2xl">📱</span>
            </div>
            <h3 className="text-white font-sora text-xl font-semibold mb-3">Any Device</h3>
            <p className="text-gray-300 font-inter">Pray anywhere, anytime on any device</p>
          </div>
        </div>

        <div className="text-center">
          <CustomButton onClick={() => setView("WHY")} size="lg">
            <span className="hidden md:inline">Why Pray the Rosary</span>
            <span className="md:hidden">Why</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
