"use client"

import { Headphones, Eye, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/app-provider"

export function WhatSection() {
  const { setCurrentView } = useApp()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Rosary Narrated</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              The Rosary — reimagined for how we pray in the digital age today.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          <div className="grid gap-4 text-center">
            <div className="flex justify-center">
              <Headphones className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">🎧 Story-driven Audio</h3>
            <p className="text-muted-foreground">
              Explore each decade through 3, 7, or 12 unique perspectives, rooted in Scripture, theology and narrative
              depth.
            </p>
          </div>
          <div className="grid gap-4 text-center">
            <div className="flex justify-center">
              <Eye className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">🌌 Visual Rosary Experience</h3>
            <p className="text-muted-foreground">
              Cinematic visuals help you see the Old and New Testament in their historical and geopolitical times.
            </p>
          </div>
          <div className="grid gap-4 text-center">
            <div className="flex justify-center">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">💫 Interactive Prayer Beads</h3>
            <p className="text-muted-foreground">
              Tap each bead, follow the prayers, stay present — beginner friendly.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="lg" onClick={() => setCurrentView("WHY")}>
            Discover Why It Matters
          </Button>
        </div>
      </div>
    </section>
  )
}
