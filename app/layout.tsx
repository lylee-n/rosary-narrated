import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/components/app-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rosary Guide",
  description: "Interactive Rosary Prayer Guide",
  keywords: "rosary, prayer, catholic, meditation, holy rosary, mysteries",
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
    title: "Rosary Guide",
    description: "Interactive Rosary Prayer Guide",
    url: "https://rosary-course.vercel.app",
    siteName: "Rosary Course",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosary Guide",
    description: "Interactive Rosary Prayer Guide",
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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
