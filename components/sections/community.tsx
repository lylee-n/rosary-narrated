"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function CommunitySection() {
  const { setView } = useApp()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-semibold mb-8">
          Community
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed">
          Finding your place in faith can be complicated. We get it. We’ve been through it. Here, we’re building
          something different.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center">
          <h2 className="text-white font-sora text-3xl md:text-4xl font-semibold mb-4">Regular Connections</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed">
            Virtual meetups where you can show up where you are spiritually. Discuss scriptural perspectives. Discuss
            hard stuff. Talk through life stuff. Find people who also get it, or not. Pray together.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-white font-sora text-3xl md:text-4xl font-semibold mb-4">Interactive Faith</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed">
            Making scripture study feels less intimidating and more like bite size soul foods that integrates into your
            daily world.
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 md:p-12">
          <h2 className="text-white font-sora text-3xl md:text-4xl font-semibold mb-4 text-center">
            What We’re Building
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed text-center mb-10">
            Some exciting stuff in the works:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto mb-12">
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
              <span className="text-gray-300 font-inter">Peer-support that’s helpful</span>
            </li>
          </ul>
          <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed mb-10">
            Build this with us. Help us make this happen.
          </p>
          <div className="text-center">
            <CustomButton onClick={() => setView("SUPPORT")} size="lg">
              Get Involved!
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}
