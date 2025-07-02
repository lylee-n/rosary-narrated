"use client"

import { Headphones, Eye, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "@/components/app-provider"

export function WhatSection() {
  const { setCurrentView } = useApp()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="font-sora text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Rosary Narrated
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed">
              The Rosary — reimagined for how we pray in the digital age today.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          <Card className="flex flex-col text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-primary transition-all duration-300">
            <CardHeader className="items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Headphones className="h-8 w-8" />
              </div>
              <CardTitle className="font-sora text-xl text-white">Story-driven Audio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Explore each decade through 3, 7, or 12 unique perspectives, rooted in Scripture, theology and narrative
                depth.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-primary transition-all duration-300">
            <CardHeader className="items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Eye className="h-8 w-8" />
              </div>
              <CardTitle className="font-sora text-xl text-white">Visual Rosary Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Cinematic visuals help you see the Old and New Testament in their historical and geopolitical times.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-primary transition-all duration-300">
            <CardHeader className="items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-8 w-8" />
              </div>
              <CardTitle className="font-sora text-xl text-white">Interactive Prayer Beads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Tap each bead, follow the prayers, stay present — beginner friendly.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2">
          <Button size="lg" onClick={() => setCurrentView("WHY")}>
            Discover Why It Matters
          </Button>
        </div>
      </div>
    </section>
  )
}
