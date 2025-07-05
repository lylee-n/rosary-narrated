import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/components/app-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HR4BP2YW4K"
          strategy="afterInteractive"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Configure Google Analytics with consent mode
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500,
            });

            gtag('config', 'G-HR4BP2YW4K');
          `}
        </Script>
        
        {/* SilkTide Cookie Banner */}
        <link 
          rel="stylesheet" 
          id="silktide-consent-manager-css" 
          href="/cookie-banner/silktide-consent-manager.css"
        />
        <Script
          src="/cookie-banner/silktide-consent-manager.js"
          strategy="beforeInteractive"
        />
        <Script id="silktide-config" strategy="beforeInteractive">
          {`
            silktideCookieBannerManager.updateCookieBannerConfig({
              background: {
                showBackground: true
              },
              cookieIcon: {
                position: "bottomLeft"
              },
              cookieTypes: [
                {
                  id: "necessary",
                  name: "Necessary",
                  description: "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>",
                  required: true,
                  onAccept: function() {
                    console.log('Necessary cookies accepted');
                  }
                },
                {
                  id: "analytics",
                  name: "Analytical",
                  description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
                  defaultValue: true,
                  onAccept: function() {
                    gtag('consent', 'update', {
                      analytics_storage: 'granted',
                    });
                    dataLayer.push({
                      'event': 'consent_accepted_analytics',
                    });
                  },
                  onReject: function() {
                    gtag('consent', 'update', {
                      analytics_storage: 'denied',
                    });
                  }
                },
                {
                  id: "advertising",
                  name: "Advertising",
                  description: "<p>These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.</p>",
                  onAccept: function() {
                    gtag('consent', 'update', {
                      ad_storage: 'granted',
                      ad_user_data: 'granted',
                      ad_personalization: 'granted',
                    });
                    dataLayer.push({
                      'event': 'consent_accepted_advertising',
                    });
                  },
                  onReject: function() {
                    gtag('consent', 'update', {
                      ad_storage: 'denied',
                      ad_user_data: 'denied',
                      ad_personalization: 'denied',
                    });
                  }
                }
              ],
              text: {
                banner: {
                  description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href=\\"/privacy-policy\\" target=\\"_blank\\">Cookie Policy.</a></p>",
                  acceptAllButtonText: "Accept all",
                  acceptAllButtonAccessibleLabel: "Accept all cookies",
                  rejectNonEssentialButtonText: "Reject non-essential",
                  rejectNonEssentialButtonAccessibleLabel: "Reject non-essential",
                  preferencesButtonText: "Preferences",
                  preferencesButtonAccessibleLabel: "Toggle preferences"
                },
                preferences: {
                  title: "Customize your cookie preferences",
                  description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
                  creditLinkText: "Get this banner for free",
                  creditLinkAccessibleLabel: "Get this banner for free"
                }
              },
              position: {
                banner: "bottomLeft"
              }
            });
          `}
        </Script>

      </head>
      <body className={`${inter.variable} ${sora.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
