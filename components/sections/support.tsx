"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function SupportSection() {
  const { setView } = useApp()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8">
          Keep This Going
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto font-inter font-light leading-relaxed">
          We're building something meaningful here – bridging theological insights and accessibility for global
          audiences. Your support helps us keep the lights on and reach more people who need this.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {/* Monthly Support Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center">
          <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold mb-6">Monthly Support</h2>
          <p className="text-gray-300 font-inter leading-relaxed mb-8">
            Become a monthly supporter and help us develop and maintain this program for the global community.
          </p>
          <CustomButton size="lg" className="w-full">
            SUPPORT MONTHLY
          </CustomButton>
        </div>

        {/* One-Time Donation Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center">
          <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold mb-6">One-Time Donation</h2>
          <p className="text-gray-300 font-inter leading-relaxed mb-8">
            Make a one-time contribution to support the development and hosting of these audiovisual experiences.
          </p>
          <CustomButton size="lg" className="w-full">
            DONATE ONCE
          </CustomButton>
        </div>

        {/* Volunteering Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center">
          <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold mb-6">Volunteering</h2>
          <p className="text-gray-300 font-inter leading-relaxed mb-8">
            Want to join us in building something bigger with your skills and time? Get Involved!
          </p>
          <CustomButton size="lg" className="w-full" variant="yellow">
            VOLUNTEER
          </CustomButton>
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <p className="text-lg text-gray-300 font-inter leading-relaxed">
          Have an awesome idea or feedback? Drop us an email at{" "}
          <a href="mailto:hello@rosarynarrated.com" className="text-[#82FAFA] hover:underline">
            hello@rosarynarrated.com
          </a>
        </p>
      </div>
    </div>
  )
}
