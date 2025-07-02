"use client"

import { useTranslations } from "@/hooks/use-translations"

export function BlogsSection() {
  const t = useTranslations()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12">Rosary Narrated Blog</h1>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 mb-8">
          <p className="text-lg text-gray-300 text-center leading-relaxed">
            Our blog section is coming soon. Here we will share insights about prayer, faith, and the spiritual journey
            through regular articles and reflections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder blog cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-black/20 backdrop-blur-sm rounded-lg p-6 hover:bg-black/30 transition-colors">
              <div className="h-32 bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Blog Image {i}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#82FAFA] mb-2">Blog Post Title {i}</h3>
              <p className="text-gray-300 text-sm mb-3">
                This is a placeholder for a blog post excerpt. The actual content will provide valuable insights about
                prayer and faith.
              </p>
              <div className="text-xs text-gray-400">Coming Soon • Category</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
