import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/components/app-provider"

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
  description: "A guided Rosary experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${sora.variable} bg-black pt-[104px] md:pt-20`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
