"use client"

import { Headphones, Eye, Sparkles } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function WhatSection() {
  const { setCurrentView } = useApp()

  return (
    <section className="w-full py-16 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="text-center mb-16">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12">
            Rosary Narrated
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-inter leading-relaxed">
            The Rosary — reimagined for how we pray today.
          </p>
        </div>

        {/* Feature cards section */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Headphones size={20} className="text-[#82FAFA]" />
              </div>
              <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Story-driven Audio</h2>
            </div>
            <p className="text-base text-gray-300 font-inter leading-relaxed pl-[52px]">
              Explore each decade through 3, 7, or 12 unique perspectives, rooted in Scripture, theology and narrative
              depth.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Eye size={20} className="text-[#82FAFA]" />
              </div>
              <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Visual Experience</h2>
            </div>
            <p className="text-base text-gray-300 font-inter leading-relaxed pl-[52px]">
              Cinematic visuals help you see the Old and New Testament in their historical and geopolitical times.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Sparkles size={20} className="text-[#82FAFA]" />
              </div>
              <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Interactive Prayer</h2>
            </div>
            <p className="text-base text-gray-300 font-inter leading-relaxed pl-[52px]">
              Tap each bead, follow the prayers, stay present — beginner friendly.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <CustomButton variant="yellow" onClick={() => setCurrentView("WHY")} size="lg">
            Discover Why It Matters
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
