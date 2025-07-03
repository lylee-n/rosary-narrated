import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ErrorBoundary } from "@/components/ui/error-boundary"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: "Rosary Course - Guided Prayer Experience",
  description: "Experience the beauty of the Rosary with guided prayers and reflections for all ages.",
  keywords: ["rosary", "prayer", "catholic", "meditation", "spiritual", "guided prayer"],
  authors: [{ name: "Rosary Course Team" }],
  creator: "Rosary Course",
  publisher: "Rosary Course",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rosary-course.vercel.app"),
  openGraph: {
    title: "Rosary Course - Guided Prayer Experience",
    description: "Experience the beauty of the Rosary with guided prayers and reflections for all ages.",
    url: "https://rosary-course.vercel.app",
    siteName: "Rosary Course",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosary Course - Guided Prayer Experience",
    description: "Experience the beauty of the Rosary with guided prayers and reflections for all ages.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-inter antialiased`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
