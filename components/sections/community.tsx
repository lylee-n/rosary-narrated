"use client"

import { CustomButton } from "@/components/ui/custom-button"

export function CommunitySection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold mb-8">
          Community
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-gray-300 font-inter font-light leading-relaxed mb-8">
            We're building something special - a vibrant virtual community space where faith meets the digital age.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Regular Meetups Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#82FAFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4 font-sora">Regular Meetups</h3>
            </div>
            <p className="text-gray-300 font-inter leading-relaxed">
              Join our virtual gatherings where community members come together to pray, share experiences, and
              strengthen their faith journey in a supportive digital environment.
            </p>
          </div>

          {/* Interactive Experiences Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#FFE552]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#FFE552]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000-6h-1m0 6V4m0 6h6m-7 0v10a2 2 0 002 2h8a2 2 0 002-2V10"
                  />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4 font-sora">Gamified Experiences</h3>
            </div>
            <p className="text-gray-300 font-inter leading-relaxed">
              Experience the gospel through interactive and gamified elements designed to make faith more relatable and
              engaging for the digitally savvy generation.
            </p>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-[#82FAFA]/20 to-[#FFE552]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-semibold mb-6 font-sora">Coming Soon</h2>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-gray-300 font-inter leading-relaxed mb-6">
              We're working hard to create a revolutionary virtual community space that bridges traditional faith with
              modern technology. Our platform will feature:
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#82FAFA] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-inter">Live prayer sessions and discussions</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FFE552] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-inter">Interactive scripture study groups</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#82FAFA] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-inter">Gamified spiritual challenges</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FFE552] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-inter">Mentorship and guidance programs</span>
              </div>
            </div>

            <p className="text-lg text-gray-300 font-inter leading-relaxed">
              Your support in developing and maintaining this program would be much appreciated as we work to make the
              gospel more accessible and engaging for today's digital generation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton onClick={() => (window.location.href = "#support")} size="lg">
              SUPPORT OUR MISSION
            </CustomButton>
            <CustomButton
              variant="outline"
              onClick={() => (window.location.href = "mailto:community@example.com?subject=Community Updates")}
              size="lg"
            >
              GET NOTIFIED
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}
