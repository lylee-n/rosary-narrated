"use client"

import { BookOpenCheck, Headphones, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/app-provider"

export function WhatSection() {
  const { setCurrentView } = useApp()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              What is Rosary Narrated?
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              An immersive prayer experience designed to deepen your connection with the life of Christ through the
              Rosary. We bridge ancient tradition with modern accessibility.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          <div className="grid gap-4 text-center">
            <div className="flex justify-center">
              <BookOpenCheck className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Theological Depth</h3>
            <p className="text-muted-foreground">
              Go beyond rote recitation. Our guided reflections are rooted in Scripture and theological insights to
              illuminate the profound meaning of each mystery.
            </p>
          </div>
          <div className="grid gap-4 text-center">
            <div className="flex justify-center">
              <Headphones className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Immersive Experience</h3>
            <p className="text-muted-foreground">
              Engage your senses with high-quality audio narration and contemplative visuals, creating a sacred space
              for you to focus and meditate without distraction.
            </p>
          </div>
          <div className="grid gap-4 text-center">
            <div className="flex justify-center">
              <HeartHandshake className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Accessible to All</h3>
            <p className="text-muted-foreground">
              Whether you're new to the Rosary or have prayed it for years, our platform is designed to meet you where
              you are on your spiritual journey.
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
