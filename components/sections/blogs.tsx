"use client"

import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "@/components/app-provider"

export function BlogsSection() {
  const { setCurrentView } = useApp()

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-sora text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Blogs
          </h1>
          <p className="font-sans text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Insights, reflections, and spiritual guidance for your prayer journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader className="text-center py-12">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <BookOpen className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="font-sora text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Coming Soon
              </CardTitle>
              <p className="font-sans text-slate-600 dark:text-slate-300 text-lg">
                We're preparing thoughtful content to enrich your spiritual journey. Check back soon for inspiring
                articles, theological insights, and prayer guidance.
              </p>
            </CardHeader>
            <CardContent className="text-center pb-12">
              <Button
                size="lg"
                onClick={() => setCurrentView("SUPPORT")}
                className="font-sora text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
