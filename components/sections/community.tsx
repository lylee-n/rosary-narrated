"use client"

import { ChevronDown, Users, Calendar, BookOpen } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function CommunitySection() {
  const { setView } = useApp()

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Coming Soon - Giant Header in #82FAFA */}
      <div className="text-center mb-16">
        <h1 className="text-[#82FAFA] font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8">
          Coming Soon
        </h1>
        <div className="flex justify-center mb-12">
          <ChevronDown size={32} className="text-[#82FAFA] animate-bounce" />
        </div>

        {/* Moved text outside of card and centered */}
        <p className="text-lg text-gray-300 max-w-2xl mx-auto font-inter leading-relaxed mb-16">
          Finding your place in faith can be complicated. We get it. We've been through it. Here, we're building
          something different.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-12 mb-16">
        {/* Two cards on the same row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Regular Connections Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 relative">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mr-4">
                <Calendar size={24} className="text-[#82FAFA]" />
              </div>
              <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold">Regular Connections</h2>
            </div>
            <p className="text-lg text-gray-300 font-inter leading-relaxed">
              Virtual meetups where you can show up where you are spiritually. Discuss scriptural perspectives. Discuss
              hard stuff. Talk through life stuff. Find people who also get it, or not. Pray together.
            </p>

            {/* Arrow pointing down - hidden on mobile */}
            <div className="hidden md:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-transparent border-t-[#82FAFA]" />
            </div>
          </div>

          {/* Interactive Faith Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 relative">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#FFE552]/20 rounded-full flex items-center justify-center mr-4">
                <BookOpen size={24} className="text-[#FFE552]" />
              </div>
              <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold">Interactive Faith</h2>
            </div>
            <p className="text-lg text-gray-300 font-inter leading-relaxed">
              Making scripture study feels less intimidating and more like bite size soul foods that integrates into
              your daily world.
            </p>

            {/* Arrow pointing down - hidden on mobile */}
            <div className="hidden md:block absolute -bottom-8 right-1/2 transform translate-x-1/2">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-transparent border-t-[#FFE552]" />
            </div>
          </div>
        </div>

        {/* What We're Building Card - Centered below */}
        <div className="flex justify-center mt-16">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 md:p-12 max-w-4xl w-full">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-[#82FAFA]/20 rounded-full flex items-center justify-center mr-4">
                <Users size={24} className="text-[#82FAFA]" />
              </div>
              <h2 className="text-white font-sora text-2xl md:text-3xl font-semibold text-center">
                What We're Building
              </h2>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed text-center mb-10">
              Some exciting stuff in the works:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#82FAFA] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-inter">Live and virtual spaces for prayer and real talk</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FFE552] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-inter">
                  Scripture reflections that wake you up so hard that you cancel your Starbucks membership card
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#82FAFA] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-inter">Growth challenges that feel doable</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FFE552] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 font-inter">Peer-support that's helpful</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Call to Action - Outside of cards */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-lg text-gray-300 font-inter leading-relaxed mb-8">
          Build this with us. Help us make this happen.
        </p>
        <CustomButton onClick={() => setView("SUPPORT")} size="lg" variant="yellow">
          Get Involved!
        </CustomButton>
      </div>
    </div>
  )
}
