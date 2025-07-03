"use client"
import { useApp } from "@/components/app-provider"
import { BookOpen, Users, Heart } from "lucide-react"

export function WhatSection() {
  const { setView } = useApp()

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-20 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/jesus-resurrected.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-extrabold leading-tight mb-4">
          A Rosary for the <span className="text-yellow-400">Modern Soul</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-12">
          Find peace and focus in a beautifully designed, contemplative space. This is the Rosary, reimagined for you.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
            <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-sora font-bold mb-2">Contemplative Prayer</h3>
            <p className="text-gray-400">
              A guided experience designed to help you meditate on the life of Christ through the mysteries of the
              Rosary.
            </p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-sora font-bold mb-2">Interactive Prayer Beads</h3>
            <p className="text-gray-400">Tap each bead, follow the prayers, stay present.</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-sora font-bold mb-2">Spiritual Growth</h3>
            <p className="text-gray-400">
              Deepen your faith with curated scripture, reflections, and a supportive community space.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
