"use client"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight, Heart, MessageCircle, Share2 } from "lucide-react"

export function BlogsSection() {
  const blogPost = {
    title: "Unable to be satisfied",
    excerpt:
      "The P. Diddy/Sean Comb club and the Epstein list. Imagine: you're a multi-millionaire, billionaire even, with empires under your name...",
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
    author: "Rosary Narrated",
    date: "January 2, 2025",
    readTime: "5 min read",
    tags: ["Faith", "Prayer", "Reflection", "Jesus"],
  }

  return (
    <section className="w-full py-16 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-purple-600/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Decorative Elements */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-400/20 to-purple-600/20 mb-6">
            <MessageCircle className="w-8 h-8 text-amber-300" />
          </div>
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-6">
            Spiritual
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-400">
              Reflections
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed">
            Journey through faith, prayer, and finding Jesus in our daily lives. Discover profound insights that
            illuminate the path to spiritual fulfillment.
          </p>
        </div>

        {/* Hero Article */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-amber-900/20 border border-white/10">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-2xl"></div>

            <div className="relative p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 px-3 py-1">Featured Article</Badge>
                <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full"></div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h2 className="text-white font-sora text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    {blogPost.title}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 line-clamp-4">
                    {blogPost.content.substring(0, 300)}...
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{blogPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{blogPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{blogPost.readTime}</span>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Read Full Story
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-white font-semibold mb-4">Article Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Articles Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-white font-sora text-3xl md:text-4xl font-bold">Recent Articles</h2>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <Card
                key={index}
                className="group bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden rounded-xl"
              >
                <div className="relative">
                  {/* Article Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-purple-600/30 to-amber-600/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/30 text-white border-white/20">
                        {blogPost.tags[index % blogPost.tags.length]}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span>{blogPost.date}</span>
                      <span>•</span>
                      <span>{blogPost.readTime}</span>
                    </div>

                    <CardTitle className="text-xl font-bold mb-3 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                      {blogPost.title}
                    </CardTitle>

                    <CardDescription className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
                      {blogPost.excerpt}
                    </CardDescription>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{12 + index}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{3 + index}</span>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="text-amber-300 hover:text-amber-200 p-0">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-amber-600/10 rounded-2xl blur-xl"></div>
          <Card className="relative bg-white/5 backdrop-blur-sm border-white/10 text-white rounded-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full blur-2xl"></div>
            <CardContent className="p-8 md:p-12 text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-400/20 to-purple-600/20 mb-6">
                <Heart className="w-8 h-8 text-amber-300" />
              </div>

              <h3 className="text-white font-sora text-2xl md:text-3xl font-bold mb-4">Join Our Spiritual Journey</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Receive weekly reflections, prayer guides, and spiritual insights that will deepen your relationship
                with Jesus and enrich your faith journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                />
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Subscribe
                </Button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                No spam, unsubscribe at any time. Your email is safe with us.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
