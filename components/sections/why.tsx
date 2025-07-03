"use client"

import type React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * LOCAL IMAGE
 * Mary-womb-golden-light full-bleed background
 * (already in public/images/Mary-womb-golden-light.png)
 */
const bgSrc = "/images/Mary-womb-golden-light.png"

type GlassCardProps = {
  className?: string
  title: string
  children: React.ReactNode
}

function GlassCard({ className, title, children }: GlassCardProps) {
  return (
    <Card className={cn("w-full backdrop-blur-sm bg-white/10 border border-white/20 shadow-xl", className)}>
      <CardContent className="p-6 space-y-4 text-sm leading-relaxed text-white/90">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {children}
      </CardContent>
    </Card>
  )
}

export default function WhySection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* FULL-BLEED BACKGROUND */}
      <Image
        src={bgSrc || "/placeholder.svg"}
        alt="Mary – golden light"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none opacity-60"
      />

      {/* DARK OVERLAY for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:py-28">
        {/* Section Heading */}
        <header className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Why Pray the Rosary?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Discover the profound spiritual benefits and promises attached to this ancient devotion.
          </p>
        </header>

        {/* GLASS CARDS GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 – Spiritual Benefits */}
          <GlassCard title="Spiritual Benefits">
            <ul className="space-y-2 list-disc list-inside">
              {[
                "Deepens meditation on Christ’s life",
                "Strengthens virtue and discipline",
                "Offers powerful intercession",
                "Brings peace in times of trial",
                "Unites families in prayer",
                "Fosters a habit of contemplation",
              ].map((benefit) => (
                <li key={benefit} className="marker:text-yellow-300">
                  {benefit}
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Card 2 – Historical Significance */}
          <GlassCard title="Historical Significance">
            <p>
              The Rosary emerged in its current form in the Middle Ages and has been championed by countless saints.
              Tradition holds that Saint Dominic received it from the Blessed Mother as a tool to combat heresy and draw
              souls to Christ. Over centuries it became a universal prayer for Christians seeking a structured
              meditation on the mysteries of salvation.
            </p>
          </GlassCard>

          {/* Card 3 – The 15 Promises */}
          <GlassCard title="The 15 Promises" className="lg:col-span-1">
            <div className="max-h-72 overflow-y-auto pr-2">
              <ol className="space-y-2 list-decimal list-inside">
                {[
                  "Those who faithfully serve me by recitation of the Rosary shall receive signal graces.",
                  "I promise my special protection and the greatest graces to all who shall recite the Rosary.",
                  "The Rosary shall be a powerful armor against hell; it will destroy vice, decrease sin, and defeat heresies.",
                  "It will cause virtue and good works to flourish; it will obtain for souls the abundant mercy of God.",
                  "The soul which recommends itself to me by the recitation of the Rosary shall not perish.",
                  "Whoever shall recite the Rosary devoutly shall never be conquered by misfortune.",
                  "Whoever shall have a true devotion to the Rosary shall not die without the Sacraments of the Church.",
                  "Those who are faithful to reciting the Rosary shall have during their life and at their death the light of God and the plenitude of His graces.",
                  "I shall deliver from purgatory those who have been devoted to the Rosary.",
                  "The faithful children of the Rosary shall merit a high degree of glory in heaven.",
                  "You shall obtain all you ask of me by the recitation of the Rosary.",
                  "All who propagate the holy Rosary shall be aided by me in their necessities.",
                  "I have obtained from my Son that all the advocates of the Rosary shall have for intercessors the entire celestial court during their life and at the hour of death.",
                  "Those who recite the Rosary are my sons and daughters, and brothers and sisters of my only Son Jesus Christ.",
                  "Devotion to my Rosary is a great sign of predestination.",
                ].map((promise, idx) => (
                  <li key={idx}>{promise}</li>
                ))}
              </ol>
            </div>
            <p className="mt-4 text-xs text-right text-white/60">— Attributed to Our Lady to St.&nbsp;Dominic</p>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
