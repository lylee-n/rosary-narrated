"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { Heart, MessageCircle, Share2, Clock, User, Sparkles, BookOpen, ArrowRight, Mail } from "lucide-react"

export function BlogsSection() {
  const t = useTranslations()
  const [email, setEmail] = useState("")

  const blogContent = {
    title: "Unable to be satisfied",
    excerpt: "The P. Diddy/Sean Comb club and the Epstein list. A reflection on true contentment through Jesus.",
    content: `Unable to be satisfied.

The P. Diddy/Sean Comb club and the Epstein list.

Imagine: you're a multi-millionaire, billionaire even, with empires under your name, and beautiful supermodels flocking to you - because, obviously, money, status and fame. You get VIP treatment everywhere you go. You get to shout at people and get away with it. You get interviewed on TV. The masses want to hear about your opinions on everything, big or trivial. A massive number of people idolize you. Your opinions not only matter but are idolized by the masses. Camera flashes everywhere you go. People line up overnight in queues to have your autograph.

Yet somehow, it doesn't feel enough. 

You have to, additionally, sniff hard drugs to feel high. Because those abundant royal privileges aren't 'doing it'.

Beautiful women are more concentrated in your circles than any other, and a lot of beautiful women want to date you, even if your personality is worse than any other. Yet, you tamper with prepubescent girls and trafficked girls, doing so together with other rich men in an exclusive luxury club.

Where is the line to reach 'satisfaction'?

I will tell you what is missing: Jesus. Jesus in our heart.

Jesus was content drinking the cup of wrath from the Father. He underwent hematohidrosis, sweating blood - a rare medical condition caused by extreme stress and anguish. He anticipated not just severe agonizing physical pain but also spiritual terror, being separated from God, for every nanosecond of those 6 agonizing hours. He did the impossible, did not scream or cry out for it to stop, but said "It is finished," completing His salvific task as the sacrificial lamb to atone for our sins.

Most humans don't have it in us to say "I am content" with whatever privilege and abundance we have. Only when we surrender our dusty heart, our filthy desires, and our perverse flesh to God, asking for Jesus to replace ours with His heart, His blood, and His light, can we be delivered.

Pray the Rosary. Fix our eyes on Jesus - our sorrowful, gentle, unconditionally loving Savior. 

Let's pray: "Jesus, let me see my sins the way you see my sins, and let me see my worth the way You see my worth. I surrender my dusty shriveled heart, my flesh, my desires, my weaknesses to you. I surrender everything I am to You. 
Replace mine with Your Heart, Your Blood, Your Light. Your ways are higher than my ways. Increase in me faith and grace. Thank you for everything You have done for me, Jesus. Lead me not into temptation, but deliver me from evil. In the mighty name of Jesus, I pray. Amen."`,
    author: "Rosary Course Team",
    date: "December 2024",
    readTime: "8 min read",
    tags: ["Spiritual Reflection", "Prayer", "Faith"],
    likes: 127,
    comments: 23,
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFE552]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#82FAFA]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FFE552]/3 to-[#82FAFA]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-[#FFE552]/20 to-[#82FAFA]/20 rounded-full backdrop-blur-sm border border-white/10">
              <Sparkles className="w-6 h-6 text-[#FFE552]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-sora bg-gradient-to-r from-white via-[#FFE552] to-[#82FAFA] bg-clip-text text-transparent">
              Spiritual Insights
            </h1>
            <div className="p-3 bg-gradient-to-r from-[#82FAFA]/20 to-[#FFE552]/20 rounded-full backdrop-blur-sm border border-white/10">
              <BookOpen className="w-6 h-6 text-[#82FAFA]" />
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover profound reflections on faith, prayer, and spiritual growth through the lens of the Rosary
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFE552]"></div>
            <div className="w-2 h-2 bg-[#FFE552] rounded-full"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFE552]"></div>
          </div>
        </div>

        {/* Hero Article with Enhanced Layout */}
        <div className="mb-20">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-0">
              {/* Article Image/Visual */}
              <div className="lg:col-span-1 relative">
                <div className="h-64 lg:h-full bg-gradient-to-br from-[#FFE552]/20 via-[#82FAFA]/10 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                  <div className="relative z-10 text-center p-8">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                      <Heart className="w-10 h-10 text-[#FFE552]" />
                    </div>
                    <div className="text-sm font-medium text-white/80">Featured Article</div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/10 rounded-full"></div>
                </div>
              </div>

              {/* Article Content */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <div className="flex flex-wrap gap-2 mb-6">
                  {blogContent.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-[#FFE552]/20 to-[#82FAFA]/20 text-[#FFE552] text-sm rounded-full border border-[#FFE552]/30 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold font-sora text-white mb-4 leading-tight">
                  {blogContent.title}
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed mb-6 text-left">{blogContent.excerpt}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blogContent.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blogContent.readTime}</span>
                    </div>
                    <span>{blogContent.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-[#FFE552] transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>{blogContent.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-[#82FAFA] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{blogContent.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-[#FFE552] to-[#FFE552]/80 text-black px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#FFE552]/25 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid with Enhanced Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Article Image */}
              <div className="h-48 bg-gradient-to-br from-[#FFE552]/10 via-[#82FAFA]/5 to-purple-500/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-1">
                    {blogContent.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-black/50 backdrop-blur-sm text-[#FFE552] text-xs rounded-full border border-[#FFE552]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-sora text-white mb-3 group-hover:text-[#FFE552] transition-colors text-left">
                  {blogContent.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 text-left line-clamp-3">
                  {blogContent.content.substring(0, 120)}...
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{blogContent.date}</span>
                  <span>{blogContent.readTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-[#FFE552] transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{blogContent.likes - index * 5}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-[#82FAFA] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{blogContent.comments - index * 2}</span>
                    </button>
                  </div>
                  <button className="text-[#FFE552] hover:text-white transition-colors font-medium">Read →</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Enhanced Newsletter Section */}
        <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-12 text-center relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFE552]/5 via-transparent to-[#82FAFA]/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFE552] via-[#82FAFA] to-[#FFE552]"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-[#FFE552]" />
              <h3 className="text-3xl font-bold font-sora bg-gradient-to-r from-white to-[#FFE552] bg-clip-text text-transparent">
                Stay Connected
              </h3>
            </div>

            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Receive weekly spiritual insights, prayer guides, and reflections delivered to your inbox. Join our
              community of faithful hearts seeking deeper connection with Jesus.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFE552] focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#FFE552] to-[#FFE552]/80 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FFE552]/25 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-4">No spam, unsubscribe anytime. Your email is safe with us.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
