"use client";

import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "DataSync entirely replaced our engineering team's manual ETL scripts. The real-time mapping saved us roughly 40 hours a week.",
    author: "Sarah Chen",
    role: "VP of Engineering, InnovateAI",
    avatar: "/svg/cube-16-solid.svg",
    rating: 5,
  },
  {
    id: 2,
    quote: "The pricing is incredibly transparent. The fact that I could toggle my region and instantly see accurate localized costs was a breath of fresh air.",
    author: "Marcus Aurelius",
    role: "Founder, Rome Analytics",
    avatar: "/svg/cube-16-solid.svg",
    rating: 5,
  },
  {
    id: 3,
    quote: "We scaled from 10M to 1B rows within three months, and DataSync didn't drop a single packet. Their enterprise SLA is actually reliable.",
    author: "Elena Rodriguez",
    role: "Head of Data, ScaleUp Inc",
    avatar: "/svg/cube-16-solid.svg",
    rating: 5,
  }
];

export default function Testimonials() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-[var(--color-oceanic)] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-nocturnal)] rounded-full blur-[100px] opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 reveal ${isVisible ? "reveal-visible" : ""}`}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-arctic)]">
            Don't just take our word for it
          </h2>
          <p className="mt-4 text-lg text-[var(--color-mint)] max-w-2xl mx-auto">
            See how the fastest growing companies use DataSync to automate their pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div 
              key={testimonial.id}
              className={`bg-[var(--color-nocturnal)]/80 backdrop-blur-md p-8 rounded-3xl border border-[var(--color-mint)]/10 hover:border-[var(--color-saffron)]/40 hover:bg-[var(--color-nocturnal)] transition-all duration-[400ms] flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] shadow-lg reveal ${isVisible ? "reveal-visible" : ""} ${idx === 0 ? "delay-200" : idx === 1 ? "delay-300" : "delay-400"}`}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Image 
                    key={i} 
                    src="/svg/chart-pie.svg" 
                    alt="Star" 
                    width={20} 
                    height={20} 
                    className="filter invert sepia saturate-200 hue-rotate-[10deg]" 
                  />
                ))}
              </div>

              <blockquote className="text-[var(--color-arctic)] font-medium text-lg mb-8 flex-grow">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--color-oceanic)] to-[var(--color-nocturnal)] flex items-center justify-center p-2 border border-[var(--color-mint)]/20 shadow-inner">
                  <Image src={testimonial.avatar} alt={testimonial.author} width={24} height={24} className="filter invert opacity-70" />
                </div>
                <div>
                  <div className="font-bold text-[var(--color-arctic)]">{testimonial.author}</div>
                  <div className="text-[var(--color-mint)] text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
