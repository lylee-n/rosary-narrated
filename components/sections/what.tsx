"use client"

import { Headphones, Eye, MousePointer } from "lucide-react"

export function WhatSection() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/jesus-resurrected.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12">
            Rosary Narrated
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-inter leading-relaxed">
            The Rosary — reimagined for how we pray today.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 text-left">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 border-2 border-[#82FAFA] rounded-full flex items-center justify-center mr-3">
                <Headphones className="h-5 w-5 text-[#82FAFA]" />
              </div>
              <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Story-driven Audio</h2>
            </div>
            <p className="text-base text-gray-300 font-inter leading-relaxed pl-8">
              Explore each decade through 3, 7, or 12 unique perspectives, rooted in Scripture, theology and narrative
              depth.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 text-left">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 border-2 border-[#82FAFA] rounded-full flex items-center justify-center mr-3">
                <Eye className="h-5 w-5 text-[#82FAFA]" />
              </div>
              <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Visual Rosary Experience</h2>
            </div>
            <p className="text-base text-gray-300 font-inter leading-relaxed pl-8">
              Cinematic visuals help you see the Old and New Testament in their historical and geopolitical times.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 text-left">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 border-2 border-[#82FAFA] rounded-full flex items-center justify-center mr-3">
                <MousePointer className="h-5 w-5 text-[#82FAFA]" />
              </div>
              <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Interactive Prayer Beads</h2>
            </div>
            <p className="text-base text-gray-300 font-inter leading-relaxed pl-8">
              Tap each bead, follow the prayers, stay present — beginner friendly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
