"use client"

import { ChevronDown } from "lucide-react"

export function BlogsSection() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-12">
            Blogs
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-inter leading-relaxed">
            We're working on bringing you inspiring articles and insights about prayer, faith, and the Rosary.
          </p>
        </div>

        <div className="text-center my-12">
          
          <div className="flex justify-center mb-8">
            <ChevronDown size={32} className="text-[#82FAFA] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
