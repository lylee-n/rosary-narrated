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
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed mb-20">
          Ready to experience the Rosary in a whole new way? We’re building a community around guided reflections rooted
          in theological insights for each decade. No matter where you’re starting from, there’s something here for you.
        </p>
        <CustomButton onClick={() => setView("WHY")} size="lg">
          Why
        </CustomButton>
      </section>
    </div>
  )
}
