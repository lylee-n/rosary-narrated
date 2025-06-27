"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function AboutSection() {
  const { setView } = useApp()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center my-12 md:my-20">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold mb-8 md:mb-16">
          Welcome to Rosary Narrated
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed mb-16">
          Explore the profound mysteries of the Rosary and deepen your spiritual journey. This platform is designed to
          guide you through each decade with rich reflections and insights.
        </p>
        <CustomButton onClick={() => setView("WHY")} size="md" className="mt-8">
          Why Pray the Rosary
        </CustomButton>
      </section>
    </div>
  )
}
