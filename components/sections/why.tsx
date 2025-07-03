"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { useApp } from "@/components/app-provider"

export function WhySection() {
  const { setView } = useApp()

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8">
            Why Pray the Rosary?
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            The Rosary is one of the most powerful prayers in the Catholic tradition, offering countless spiritual
            benefits and graces.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
              <h3 className="text-white font-sora text-2xl font-bold mb-6">Spiritual Benefits</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start space-x-3">
                  <span className="text-[#FFE552] mt-1">•</span>
                  <span>Deepens your relationship with Jesus and Mary</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#FFE552] mt-1">•</span>
                  <span>Brings peace and tranquility to your mind and heart</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#FFE552] mt-1">•</span>
                  <span>Strengthens your faith and trust in God</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#FFE552] mt-1">•</span>
                  <span>Provides protection from evil and temptation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#FFE552] mt-1">•</span>
                  <span>Helps you meditate on the life of Christ</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#FFE552] mt-1">•</span>
                  <span>Brings healing and comfort in times of suffering</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
              <h3 className="text-white font-sora text-2xl font-bold mb-6">Historical Significance</h3>
              <p className="text-white/90 leading-relaxed mb-4">
                The Rosary has been prayed by Catholics for over 800 years. It was given to St. Dominic by the Blessed
                Virgin Mary herself as a powerful weapon against heresy and sin.
              </p>
              <p className="text-white/90 leading-relaxed">
                Throughout history, the Rosary has been credited with numerous miracles, including the victory at the
                Battle of Lepanto in 1571, which saved Christian Europe from Ottoman invasion.
              </p>
            </div>
          </div>

          {/* Right Column - The 15 Promises */}
          <div className="relative rounded-lg overflow-hidden bg-[url('/images/Mary-womb-golden-light.png')] bg-cover bg-center bg-no-repeat">
            {/* Heading with solid black background */}
            <div className="bg-black py-6 px-8">
              <h2 className="text-white font-sora text-2xl font-bold mb-0">The 15 Promises of the Rosary</h2>
            </div>

            {/* Content with dark overlay and blur */}
            <div className="relative">
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

              {/* Content */}
              <div className="relative z-10 p-8 pt-4">
                <div className="space-y-4">
                  <div className="text-white/90 text-sm leading-relaxed">
                    <p className="mb-4">
                      • Whoever shall faithfully serve me by the recitation of the Rosary, shall receive signal graces.
                    </p>
                    <p className="mb-4">
                      • I promise my special protection and the greatest graces to all those who shall recite the
                      Rosary.
                    </p>
                    <p className="mb-4">
                      • The Rosary shall be a powerful armor against hell, it will destroy vice, decrease sin, and
                      defeat heresies.
                    </p>
                    <p className="mb-4">
                      • The Rosary will cause virtue and good works to flourish; it will obtain for souls the abundant
                      mercy of God.
                    </p>
                    <p className="mb-4">
                      • The soul which recommends itself to me by the recitation of the Rosary, shall not perish.
                    </p>
                    <p className="mb-4">
                      • Whoever shall recite the Rosary devoutly, applying himself to the consideration of its sacred
                      mysteries shall never be conquered by misfortune.
                    </p>
                    <p className="mb-4">
                      • God will not chastise him in His justice, he shall not perish by an unprovided death.
                    </p>
                    <p className="mb-4">
                      • If he be just he shall remain in the grace of God, and become worthy of eternal life.
                    </p>
                    <p className="mb-4">
                      • Whoever shall have a true devotion for the Rosary shall not die without the sacraments of the
                      Church.
                    </p>
                    <p className="mb-4">
                      • Those who are faithful to recite the Rosary shall have during their life and at their death the
                      light of God and the plenititude of His graces.
                    </p>
                    <p className="mb-4">• At the moment of death they shall be protected by the saints of heaven.</p>
                    <p className="mb-4">• I shall deliver from purgatory those who have been devoted to the Rosary.</p>
                    <p className="mb-4">
                      • The faithful children of the Rosary shall merit a high degree of glory in heaven.
                    </p>
                    <p className="mb-4">• You shall obtain all you ask of me by the recitation of the Rosary.</p>
                    <p className="mb-4">
                      • All those who propagate the holy Rosary shall be aided by me in their necessities.
                    </p>
                  </div>
                  <p className="text-white/70 text-xs italic mt-6">
                    — Promises given by Our Lady to St. Dominic and Blessed Alan de la Roche
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <CustomButton onClick={() => setView("HOW")} size="lg" variant="yellow">
            <span className="hidden md:inline">Learn how to pray the Rosary</span>
            <span className="md:hidden">Learn how</span>
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
