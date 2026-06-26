"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useActiveFeature } from "../hooks/useActiveFeature";
import { useScrollReveal } from "../hooks/useScrollReveal";

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

function FeatureCard({ 
  feature, 
  isActive, 
  onHover 
}: { 
  feature: typeof FEATURES[0], 
  isActive: boolean, 
  onHover: () => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onHover();
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation for 3D tilt (max 5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-[300ms] ease-out border overflow-hidden backdrop-blur-md ${
        isActive 
          ? 'bg-[var(--color-nocturnal)]/80 border-[var(--color-saffron)]/50 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10' 
          : 'bg-[var(--color-oceanic)]/80 border-[var(--color-nocturnal)] hover:bg-[var(--color-nocturnal)]/40'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isActive ? 1.02 : 1})`,
      }}
    >
      {/* Mouse Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 153, 50, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Top Edge Highlight */}
      {isActive && <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-saffron)] to-transparent opacity-50" />}

      <div className="relative z-10 flex items-center gap-4 mb-2">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${feature.color} flex items-center justify-center shadow-lg transition-transform duration-300 ${isActive ? 'rotate-3 scale-110' : ''}`}>
          <Image src={feature.icon} alt={feature.title} width={20} height={20} className="filter invert drop-shadow" />
        </div>
        <h3 className={`font-semibold text-lg transition-colors duration-[180ms] ${isActive ? 'text-[var(--color-saffron)]' : 'text-[var(--color-arctic)]'}`}>
          {feature.title}
        </h3>
      </div>
      <p className={`relative z-10 text-sm transition-all duration-[350ms] ${isActive ? 'text-[var(--color-mint)]' : 'text-[var(--color-mint)]/60'}`}>
        {feature.description}
      </p>
    </div>
  );
}

export default function Features() {
  const { activeIndex, handleFeatureHover, handleAccordionToggle } = useActiveFeature(0);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-[var(--color-oceanic)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 reveal ${isVisible ? "reveal-visible" : ""}`}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-arctic)]">
            Everything you need, <span className="text-[var(--color-saffron)]">nothing you don't</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-mint)] max-w-2xl mx-auto">
            Our platform is engineered for scale, delivering powerful data automation through a beautifully simple interface.
          </p>
        </div>

        {isMobile ? (
          /* Mobile Accordion */
          <div className={`space-y-4 max-w-3xl mx-auto reveal delay-200 ${isVisible ? "reveal-visible" : ""}`}>
            {FEATURES.map((feature, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={feature.id}
                  className={`border border-[var(--color-nocturnal)] rounded-xl overflow-hidden transition-all duration-[350ms] ease-in-out backdrop-blur-sm ${isActive ? 'bg-[var(--color-nocturnal)]/70 border-[var(--color-saffron)]/30' : 'bg-transparent'}`}
                >
                  <button
                    onClick={() => handleAccordionToggle(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${feature.color} flex items-center justify-center transition-transform ${isActive ? 'rotate-3 scale-110' : ''}`}>
                        <Image src={feature.icon} alt={feature.title} width={20} height={20} className="filter invert" />
                      </div>
                      <span className={`font-semibold text-lg transition-colors ${isActive ? 'text-[var(--color-saffron)]' : 'text-[var(--color-arctic)]'}`}>{feature.title}</span>
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
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto reveal delay-200 ${isVisible ? "reveal-visible" : ""}`}>
            {/* Left Column - Feature List */}
            <div className="flex flex-col gap-4 perspective-1000">
              {FEATURES.map((feature, idx) => (
                <FeatureCard 
                  key={feature.id} 
                  feature={feature} 
                  isActive={activeIndex === idx} 
                  onHover={() => handleFeatureHover(idx)} 
                />
              ))}
            </div>

            {/* Right Column - Visual Showcase */}
            <div className="md:col-span-2 relative bg-[var(--color-nocturnal)]/50 rounded-2xl border border-[var(--color-mint)]/10 overflow-hidden flex items-center justify-center min-h-[400px] backdrop-blur-xl shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-oceanic)]/80 to-transparent opacity-80" />
              
              {FEATURES.map((feature, idx) => (
                <div
                  key={`visual-${feature.id}`}
                  className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-[600ms] cubic-bezier(0.2,0.8,0.2,1) ${
                    activeIndex === idx 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 translate-y-12 pointer-events-none'
                  }`}
                >
                   <div className={`w-40 h-40 rounded-full bg-gradient-to-tr ${feature.color} blur-[60px] opacity-30 absolute transition-opacity duration-1000 ${activeIndex === idx ? 'opacity-30' : 'opacity-0'}`} />
                   
                   <div className={`w-28 h-28 rounded-2xl bg-gradient-to-tr ${feature.color} flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-10 transition-transform duration-[2000ms] ease-out ${activeIndex === idx ? 'translate-y-0 rotate-0' : '-translate-y-8 rotate-12'} mb-8 border border-white/10 backdrop-blur-md`}>
                      <Image src={feature.icon} alt={feature.title} width={56} height={56} className="filter invert drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                   </div>
                   
                   <h3 className="text-3xl font-bold text-[var(--color-arctic)] z-10 mb-6 drop-shadow-md">{feature.title}</h3>
                   
                   <div className="w-full max-w-md bg-[var(--color-oceanic)]/80 rounded-xl border border-[var(--color-mint)]/20 backdrop-blur-md p-6 z-10 flex flex-col gap-4 shadow-xl">
                      <div className="w-full h-3 bg-[var(--color-nocturnal)] rounded-full overflow-hidden shadow-inner">
                         <div className={`h-full bg-gradient-to-r ${feature.color} w-3/4 animate-[softFade_2s_ease-in-out_infinite_alternate]`} />
                      </div>
                      <div className="w-5/6 h-3 bg-[var(--color-nocturnal)] rounded-full overflow-hidden shadow-inner">
                         <div className={`h-full bg-gradient-to-r ${feature.color} w-1/2 opacity-70 animate-[softFade_2.5s_ease-in-out_infinite_alternate_200ms]`} />
                      </div>
                      <div className="w-2/3 h-3 bg-[var(--color-nocturnal)] rounded-full overflow-hidden shadow-inner">
                         <div className={`h-full bg-gradient-to-r ${feature.color} w-4/5 opacity-50 animate-[softFade_1.5s_ease-in-out_infinite_alternate_500ms]`} />
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
