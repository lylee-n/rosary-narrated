"use client"

import { useTranslations } from "@/hooks/use-translations"

export function WhatSection() {
  const t = useTranslations()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">What is "Rosary Narrated"?</h1>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed">
            This page is coming soon. Here we will explain what "Rosary Narrated" is, our mission, and how we help
            people connect with their faith through guided prayer.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-black/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#82FAFA] mb-3">Our Mission</h3>
              <p className="text-gray-300">
                Placeholder content about our mission to make the rosary accessible and meaningful for everyone.
              </p>
            </div>

            <div className="bg-black/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#82FAFA] mb-3">Our Approach</h3>
              <p className="text-gray-300">
                Placeholder content about our unique approach to narrated rosary prayers and guided meditation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
