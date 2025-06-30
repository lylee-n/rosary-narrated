"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
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
            This is an audiovisual guided experience designed to help you meditate on the life of Christ based on the
            Rosary.
          </p>
        </div>

        {/* How it works section */}
        <div className="mb-16">
          <h2 className="text-white font-sora text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>

          {/* Step indicators - numbered bubbles with arrows */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`w-12 h-12 border-2 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      currentStep === index
                        ? "border-[#82FAFA] text-[#82FAFA] bg-[#82FAFA]/10"
                        : "border-gray-600 text-gray-400 hover:border-[#82FAFA] hover:text-[#82FAFA]"
                    }`}
                  >
                    {index + 1}
                  </button>
                  {index < steps.length - 1 && <ArrowRight size={20} className="text-[#82FAFA] mx-2" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-[#82FAFA] font-sora text-lg font-bold mr-3">Step {currentStep + 1}</span>
                </div>
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

            {/* Arrow for steps 1 and 2 */}
            {currentStep < 2 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block hover:scale-110 transition-transform duration-300"
              >
                <ArrowRight size={24} className="text-[#82FAFA] hover:text-[#FFE552]" />
              </button>
            )}
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
