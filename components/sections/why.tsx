"use client"

import { useApp } from "@/components/app-provider"

export function WhySection() {
  const { setView } = useApp()

  return (
    <section className="w-full bg-transparent">
      {/* --- Top part (Title) --- */}
      <div className="w-full bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center pt-16 md:pt-24 pb-12 md:pb-16">
            <h2 className="text-white font-sora text-4xl md:text-6xl lg:text-7xl leading-none font-extrabold md:font-bold mb-8">
              Why Pray the Rosary?
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
              The Rosary is one of the most powerful prayers in the Catholic tradition, offering countless spiritual
              benefits and graces.
            </p>
          </div>
        </div>
      </div>

      {/* --- Full Bleed Container with Mary Background --- */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: "url('/images/Mary-womb-golden-light.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Creates a parallax effect on scroll
        }}
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Centered Content (3 Glass Cards) */}
        <div className="container relative mx-auto px-4 z-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-8">
            <div className="space-y-8">
              {/* Card 1: Spiritual Benefits */}
              <div className="w-full h-[400px] flex flex-col relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
                <div className="relative z-10 flex flex-col h-full p-8 pb-6">
                  <h3 className="text-white font-sora text-2xl font-bold mb-6 flex-shrink-0">Spiritual Benefits</h3>
                  <div className="flex-1 space-y-0 text-white/90">
                    <div className="flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      <span className="text-white/90 mt-1">•</span>
                      <span>Deepens your relationship with Jesus and Mary</span>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      <span className="text-white/90 mt-1">•</span>
                      <span>Brings peace and tranquility to your mind and heart</span>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      <span className="text-white/90 mt-1">•</span>
                      <span>Strengthens your faith and trust in God</span>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      <span className="text-white/90 mt-1">•</span>
                      <span>Provides protection from evil and temptation</span>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      <span className="text-white/90 mt-1">•</span>
                      <span>Helps you meditate on the life of Christ</span>
                    </div>
                    <div className="flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      <span className="text-white/90 mt-1">•</span>
                      <span>Brings healing and comfort in times of suffering</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Historical Significance */}
              <div className="w-full h-[400px] flex flex-col relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
                <div className="relative z-10 flex flex-col h-full p-8 pb-6">
                  <h3 className="text-white font-sora text-2xl font-bold mb-6 flex-shrink-0">
                    Historical Significance
                  </h3>
                  <div className="flex-1 space-y-0 text-white/90 leading-relaxed">
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      The Rosary has been prayed by Catholics for over 800 years. It was given to St. Dominic by the
                      Blessed Virgin Mary herself as a powerful weapon against heresy and sin.
                    </p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      Throughout history, the Rosary has been credited with numerous miracles, including the victory at
                      the Battle of Lepanto in 1571, which saved Christian Europe from Ottoman invasion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: The 15 Promises */}
            <div className="w-full h-[820px] flex flex-col relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl">
              <div className="relative z-10 flex flex-col h-full p-8">
                <h3 className="text-white font-sora text-2xl font-bold mb-6 flex-shrink-0">The 15 Promises</h3>
                <div className="flex-1 overflow-y-auto pr-4">
                  <div className="space-y-0 text-white/90 leading-relaxed">
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      • Whoever shall faithfully serve me by the recitation of the Rosary, shall receive signal graces.
                    </p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      • I promise my special protection and the greatest graces to all those who shall recite the
                      Rosary.
                    </p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      • The Rosary shall be a powerful armor against hell, it will destroy vice, decrease sin, and
                      defeat heresies.
                    </p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      • The Rosary will cause virtue and good works to flourish; it will obtain for souls the abundant
                      mercy of God.
                    </p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">• The soul which recommends itself to me by the recitation of the Rosary, shall not perish.</p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      • Whoever shall recite the Rosary devoutly, applying himself to the consideration of its sacred
                      mysteries shall never be conquered by misfortune.
                    </p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">• God will not chastise him in His justice, he shall not perish by an unprovided death.</p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">• If he be just he shall remain in the grace of God, and become worthy of eternal life.</p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      • Whoever shall have a true devotion for the Rosary shall not die without the sacraments of the
                      Church.
                    </p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">
                      • Those who are faithful to recite the Rosary shall have during their life and at their death the
                      light of God and the plenititude of His graces.
                    </p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">• At the moment of death they shall be protected by the saints of heaven.</p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">• I shall deliver from purgatory those who have been devoted to the Rosary.</p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">• The faithful children of the Rosary shall merit a high degree of glory in heaven.</p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">• You shall obtain all you ask of me by the recitation of the Rosary.</p>
                    <p className="p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg cursor-pointer">• All those who propagate the holy Rosary shall be aided by me in their necessities.</p>
                  </div>
                  <p className="text-white/70 text-xs italic mt-6">
                    — Promises given by Our Lady to St. Dominic and Blessed Alan de la Roche
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
