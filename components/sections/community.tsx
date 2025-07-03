"use client"

import { useApp } from "@/components/app-provider"

export function CommunitySection() {
  const { setView } = useApp()

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Community Header */}
      <div className="text-center mb-16">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12">
          Community
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto font-inter leading-relaxed mb-8">
          Finding your place in faith can be complicated. We get it. Here, we're building something different.
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto font-inter leading-relaxed">Coming soon ...</p>
      </div>
    </div>
  )
}
