"use client"

import { Headphones, Eye, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/components/app-provider"

export function WhatSection() {
  const { setCurrentView } = useApp()

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-sora text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Rosary Narrated
          </h1>
          <p className="font-sans text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The Rosary — reimagined for how we pray in the digital age today.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Story-driven Audio */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <Headphones className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-sora text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                <span className="text-2xl">🎧</span>
                Story-driven Audio
              </h3>
              <p className="font-sans text-slate-600 dark:text-slate-300 leading-relaxed">
                Explore each decade through 3, 7, or 12 unique perspectives, rooted in Scripture, theology and narrative
                depth.
              </p>
            </CardContent>
          </Card>

          {/* Visual Rosary Experience */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-sora text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                <span className="text-2xl">🌌</span>
                Visual Rosary Experience
              </h3>
              <p className="font-sans text-slate-600 dark:text-slate-300 leading-relaxed">
                Cinematic visuals help you see the Old and New Testament in their historical and geopolitical times.
              </p>
            </CardContent>
          </Card>

          {/* Interactive Prayer Beads */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-sora text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                <span className="text-2xl">💫</span>
                Interactive Prayer Beads
              </h3>
              <p className="font-sans text-slate-600 dark:text-slate-300 leading-relaxed">
                Tap each bead, follow the prayers, stay present — beginner friendly.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => setCurrentView("WHY")}
            className="font-sora text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Discover Why It Matters
          </Button>
        </div>
      </div>
    </section>
  )
}
