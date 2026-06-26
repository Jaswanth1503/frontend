"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useActiveFeature } from "../hooks/useActiveFeature";

const FEATURES = [
  {
    id: "data-sync",
    title: "Real-time Syncing",
    description: "Instantly synchronize your databases with millisecond latency across global regions.",
    icon: "/svg/arrow-path.svg",
    color: "from-[#FF9932] to-[#FFC801]"
  },
  {
    id: "ai-transform",
    title: "AI Transformations",
    description: "Let our AI automatically map schemas and clean your data pipeline on the fly.",
    icon: "/svg/cog-8-tooth.svg",
    color: "from-[#114C5A] to-[#D9E8E2]"
  },
  {
    id: "insights",
    title: "Predictive Analytics",
    description: "Forecast trends and catch anomalies before they impact your business metrics.",
    icon: "/svg/chart-pie.svg",
    color: "from-[#FFC801] to-[#F1F6F4]"
  },
  {
    id: "secure",
    title: "Enterprise Security",
    description: "End-to-end encryption with SOC2 compliance and granular role-based access control.",
    icon: "/svg/link-solid.svg",
    color: "from-[#D9E8E2] to-[#114C5A]"
  }
];

export default function Features() {
  const { activeIndex, handleFeatureHover, handleAccordionToggle } = useActiveFeature(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="features" className="py-24 bg-[var(--color-oceanic)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-arctic)]">
            Everything you need, <span className="text-[var(--color-saffron)]">nothing you don't</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-mint)] max-w-2xl mx-auto">
            Our platform is engineered for scale, delivering powerful data automation through a beautifully simple interface.
          </p>
        </div>

        {isMobile ? (
          /* Mobile Accordion */
          <div className="space-y-4 max-w-3xl mx-auto">
            {FEATURES.map((feature, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={feature.id}
                  className={`border border-[var(--color-nocturnal)] rounded-xl overflow-hidden transition-all duration-[350ms] ease-in-out ${isActive ? 'bg-[var(--color-nocturnal)]/50' : 'bg-transparent'}`}
                >
                  <button
                    onClick={() => handleAccordionToggle(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${feature.color} flex items-center justify-center`}>
                        <Image src={feature.icon} alt={feature.title} width={20} height={20} className="filter invert" />
                      </div>
                      <span className="font-semibold text-[var(--color-arctic)] text-lg">{feature.title}</span>
                    </div>
                    <Image 
                      src="/svg/chevron-down.svg" 
                      alt="Toggle" 
                      width={20} 
                      height={20} 
                      className={`filter invert opacity-60 transition-transform duration-[350ms] ${isActive ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-[350ms] ease-in-out ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="px-6 pb-6 pt-2 text-[var(--color-mint)] pr-12">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Left Column - Feature List */}
            <div className="flex flex-col gap-4">
              {FEATURES.map((feature, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={feature.id}
                    onMouseEnter={() => handleFeatureHover(idx)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-[350ms] ease-in-out border ${
                      isActive 
                        ? 'bg-[var(--color-nocturnal)] border-[var(--color-saffron)]/50 shadow-[0_0_20px_rgba(255,153,50,0.1)] transform scale-[1.02]' 
                        : 'bg-[var(--color-oceanic)] border-[var(--color-nocturnal)] hover:bg-[var(--color-nocturnal)]/30'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${feature.color} flex items-center justify-center shadow-lg`}>
                        <Image src={feature.icon} alt={feature.title} width={20} height={20} className="filter invert" />
                      </div>
                      <h3 className={`font-semibold text-lg transition-colors duration-[180ms] ${isActive ? 'text-[var(--color-saffron)]' : 'text-[var(--color-arctic)]'}`}>
                        {feature.title}
                      </h3>
                    </div>
                    <p className={`text-sm transition-all duration-[350ms] ${isActive ? 'text-[var(--color-mint)]' : 'text-[var(--color-mint)]/60'}`}>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            /* Right Column - Visual Showcase based on activeIndex */
            <div className="md:col-span-2 relative bg-[var(--color-nocturnal)] rounded-2xl border border-[var(--color-mint)]/10 overflow-hidden flex items-center justify-center min-h-[400px]">
              {/* Dynamic decorative background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-oceanic)] to-transparent opacity-50" />
              
              {FEATURES.map((feature, idx) => (
                <div
                  key={`visual-${feature.id}`}
                  className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-[500ms] ease-in-out ${
                    activeIndex === idx 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 translate-y-8 pointer-events-none'
                  }`}
                >
                   <div className={`w-32 h-32 rounded-full bg-gradient-to-tr ${feature.color} blur-3xl opacity-20 absolute`} />
                   <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${feature.color} flex items-center justify-center shadow-2xl z-10 animate-elevate mb-8`}>
                      <Image src={feature.icon} alt={feature.title} width={48} height={48} className="filter invert drop-shadow-lg" />
                   </div>
                   <h3 className="text-2xl font-bold text-[var(--color-arctic)] z-10 mb-4">{feature.title}</h3>
                   <div className="w-full max-w-md h-32 bg-[var(--color-oceanic)]/50 rounded-xl border border-[var(--color-mint)]/10 backdrop-blur-sm p-4 z-10 flex flex-col gap-3">
                      {/* Abstract visual representation of the feature */}
                      <div className="w-full h-4 bg-[var(--color-nocturnal)] rounded-full overflow-hidden">
                         <div className={`h-full bg-gradient-to-r ${feature.color} w-3/4 animate-[softFade_2s_ease-in-out_infinite_alternate]`} />
                      </div>
                      <div className="w-5/6 h-4 bg-[var(--color-nocturnal)] rounded-full overflow-hidden">
                         <div className={`h-full bg-gradient-to-r ${feature.color} w-1/2 opacity-70 animate-[softFade_2.5s_ease-in-out_infinite_alternate]`} />
                      </div>
                      <div className="w-2/3 h-4 bg-[var(--color-nocturnal)] rounded-full overflow-hidden">
                         <div className={`h-full bg-gradient-to-r ${feature.color} w-4/5 opacity-50 animate-[softFade_1.5s_ease-in-out_infinite_alternate]`} />
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
