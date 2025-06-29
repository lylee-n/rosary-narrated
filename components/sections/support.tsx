"use client"

import { CustomButton } from "@/components/ui/custom-button"

export function SupportSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold mb-8">
          {"Keep This Going\n"}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed">
          Help us continue spreading the beauty and power of the Rosary to souls around the world. Your support makes
          this spiritual journey possible for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Monthly Support Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center flex flex-col items-center">
          <h3 className="text-white text-2xl font-semibold mb-6 font-sora">Monthly Support</h3>
          <p className="text-gray-300 font-inter leading-relaxed flex-grow mb-6">
            Become a monthly supporter and help us maintain and improve this spiritual resource for the global
            community.
          </p>
          <CustomButton
            variant="yellow"
            size="lg"
            className="w-full"
            onClick={() => window.open("https://stripe.com/monthly-support", "_blank")}
          >
            SUPPORT MONTHLY
          </CustomButton>
        </div>

        {/* One-Time Donation Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center flex flex-col items-center">
          <h3 className="text-white text-2xl font-semibold mb-6 font-sora">One-Time Donation</h3>
          <p className="text-gray-300 font-inter leading-relaxed flex-grow mb-6">
            Make a one-time contribution to support the development and hosting of this Rosary experience.
          </p>
          <CustomButton
            variant="yellow"
            size="lg"
            className="w-full"
            onClick={() => window.open("https://stripe.com/one-time-donation", "_blank")}
          >
            DONATE ONCE
          </CustomButton>
        </div>

        {/* Volunteering Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center flex flex-col items-center">
          <h3 className="text-white text-2xl font-semibold mb-6 font-sora">Volunteering</h3>
          <p className="text-gray-300 font-inter leading-relaxed flex-grow mb-6">
            Join our team of dedicated volunteers and contribute your time and talents to help us grow and reach more
            souls.
          </p>
          <CustomButton
            variant="yellow"
            size="lg"
            className="w-full"
            onClick={() => (window.location.href = "mailto:rosarynarrated@gmail.com")}
          >
            VOLUNTEER
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
