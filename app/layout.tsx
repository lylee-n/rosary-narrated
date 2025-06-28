import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/components/app-provider"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: "Rosary Narrated",
  description: "Experience the beauty and power of the Rosary through immersive storytelling",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans", inter.variable, sora.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
