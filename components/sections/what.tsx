"use client"

import { Play, Heart, Users } from "lucide-react"
import { useApp } from "@/components/app-provider"

export function WhatSection() {
  const { setView } = useApp()

  return (
    <div className="container mx-auto px-4 py-16">
      {/* What Header */}
      <div className="text-center mb-16">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12">
          What
        </h1>
      </div>

      {/* Three Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Interactive Prayer Beads */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mr-3">
              <Play size={20} className="text-[#82FAFA]" />
            </div>
            <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Interactive Prayer Beads</h2>
          </div>
          <p className="text-base text-gray-300 font-inter leading-relaxed">
            Tap each bead, follow the prayers, stay present.
          </p>
        </div>

        {/* Guided Meditations */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#FFE552]/20 rounded-full flex items-center justify-center mr-3">
              <Heart size={20} className="text-[#FFE552]" />
            </div>
            <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Guided Meditations</h2>
          </div>
          <p className="text-base text-gray-300 font-inter leading-relaxed">
            Narrated reflections on each mystery to deepen your prayer experience and spiritual connection.
          </p>
        </div>

        {/* Community Connection */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mr-3">
              <Users size={20} className="text-[#82FAFA]" />
            </div>
            <h2 className="text-white font-sora text-xl md:text-2xl font-semibold">Community Connection</h2>
          </div>
          <p className="text-base text-gray-300 font-inter leading-relaxed">
            Join others in prayer, share reflections, and grow together in faith through our supportive community.
          </p>
        </div>
      </div>
    </div>
  )
}
