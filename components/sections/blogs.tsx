"use client"

import { Calendar, Clock, User, ArrowRight, BookOpen, Heart } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Power of Daily Rosary Prayer: A Journey of Faith",
    excerpt:
      "Discover how incorporating the Rosary into your daily routine can transform your spiritual life and bring you closer to God through Mary's intercession.",
    author: "Sister Maria",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Spirituality",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: "2",
    title: "Understanding the Mysteries: A Deep Dive into Joyful Mysteries",
    excerpt:
      "Explore the profound meaning behind each Joyful Mystery and how they can guide us through life's celebrations and challenges.",
    author: "Father John",
    date: "December 10, 2024",
    readTime: "7 min read",
    category: "Mysteries",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Mary's Role in Our Salvation: Lessons from the Luminous Mysteries",
    excerpt:
      "Learn how the Luminous Mysteries reveal Mary's unique role in Christ's public ministry and what it means for our faith journey.",
    author: "Dr. Catherine",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Theology",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "Finding Hope in Sorrow: The Sorrowful Mysteries Explained",
    excerpt:
      "Discover how meditating on Christ's passion through the Sorrowful Mysteries can bring comfort and strength during difficult times.",
    author: "Brother Michael",
    date: "November 28, 2024",
    readTime: "8 min read",
    category: "Reflection",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Celebrating Victory: The Glory of the Glorious Mysteries",
    excerpt:
      "Explore the triumph of Christ's resurrection and Mary's assumption, and how these mysteries inspire hope for our eternal destiny.",
    author: "Sister Teresa",
    date: "November 20, 2024",
    readTime: "5 min read",
    category: "Hope",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    title: "The History of the Rosary: From St. Dominic to Today",
    excerpt:
      "Trace the rich history of the Rosary prayer from its origins with St. Dominic through its evolution to the modern day.",
    author: "Prof. Margaret",
    date: "November 15, 2024",
    readTime: "10 min read",
    category: "History",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const categories = ["All", "Spirituality", "Mysteries", "Theology", "Reflection", "Hope", "History"]

export function BlogsSection() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-6">
            Blogs
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed mb-8">
            Deepen your understanding of the Rosary through thoughtful reflections, theological insights, and spiritual
            guidance from our community of faith.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className={`
                  border-[#82FAFA] text-[#82FAFA] hover:bg-[#82FAFA] hover:text-black
                  transition-all duration-300 font-inter
                  ${category === "All" ? "bg-[#82FAFA] text-black" : ""}
                `}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {blogPosts.find((post) => post.featured) && (
          <div className="mb-16">
            <h2 className="text-[#FFE552] font-sora text-2xl md:text-3xl font-bold mb-8 text-center">
              Featured Article
            </h2>
            <Card className="bg-black/30 border-[#82FAFA] overflow-hidden hover:bg-black/40 transition-all duration-300 group">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-[#FFE552] text-black font-inter">{blogPosts[0].category}</Badge>
                    <Badge variant="outline" className="border-[#82FAFA] text-[#82FAFA]">
                      Featured
                    </Badge>
                  </div>

                  <h3 className="text-white font-sora text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#82FAFA] transition-colors">
                    {blogPosts[0].title}
                  </h3>

                  <p className="text-gray-300 font-inter leading-relaxed mb-6">{blogPosts[0].excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{blogPosts[0].date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{blogPosts[0].readTime}</span>
                      </div>
                    </div>

                    <Button className="bg-[#82FAFA] text-black hover:bg-[#FFE552] transition-colors group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="bg-black/30 border-[#82FAFA]/30 overflow-hidden hover:bg-black/40 hover:border-[#82FAFA] transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#FFE552] text-black font-inter">{post.category}</Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-white font-sora text-xl font-bold leading-tight group-hover:text-[#82FAFA] transition-colors">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-300 font-inter text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.date}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[#82FAFA] hover:text-black hover:bg-[#82FAFA] transition-colors group p-2"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="text-center">
          <Card className="bg-black/30 border-[#FFE552] p-8 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-[#FFE552] p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
            </div>

            <h3 className="text-white font-sora text-2xl font-bold mb-4">Stay Connected</h3>

            <p className="text-gray-300 font-inter mb-6">
              Subscribe to our newsletter to receive the latest blog posts, spiritual insights, and updates from our
              Rosary community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-black/50 border border-[#82FAFA]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#82FAFA] transition-colors"
              />
              <Button className="bg-[#FFE552] text-black hover:bg-[#82FAFA] transition-colors">
                Subscribe
                <Heart className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
