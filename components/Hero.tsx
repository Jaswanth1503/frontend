"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load the Three.js scene to keep initial bundle small
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function Counter({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        // Set exact final value
        setCount(end);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <span className="font-mono text-3xl font-bold text-[var(--color-forsythia)] drop-shadow-[0_0_8px_rgba(255,200,1,0.5)]">{count}{suffix}</span>;
}

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-screen flex flex-col justify-center overflow-hidden perspective-1000">
      
      {/* Dynamic Procedural Background Scene */}
      <HeroScene />
      
      {/* Background Depth Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-nocturnal)]/20 via-[var(--color-oceanic)]/80 to-[var(--color-oceanic)] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/svg/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 z-0 pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-arctic)] max-w-4xl mx-auto leading-tight animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
          Data automation on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-forsythia)]">autopilot</span>
        </h1>
        
        <p className="mt-6 text-xl md:text-2xl text-[var(--color-mint)] max-w-2xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '300ms' }}>
          The premium AI tooling to sync, transform, and scale your data pipelines without writing a single line of code.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '500ms' }}>
          <Link href="#pricing" className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 rounded-lg bg-[var(--color-saffron)] text-[var(--color-oceanic)] font-bold text-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,153,50,0.6)] text-center">
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </Link>
          <Link href="#features" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[var(--color-nocturnal)]/40 border border-[var(--color-mint)]/20 text-[var(--color-arctic)] font-semibold text-lg hover:bg-[var(--color-nocturnal)] transition-all duration-[180ms] flex items-center justify-center gap-2 hover:border-[var(--color-mint)]/50 hover:shadow-lg group backdrop-blur-md">
            <Image src="/svg/arrow-trending-up.svg" alt="Explore" width={20} height={20} className="filter invert opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            Explore Features
          </Link>
        </div>

        {/* Statistics & Trust Indicators */}
        <div className="mt-24 border-t border-[var(--color-nocturnal)]/50 pt-10 animate-fade-in opacity-0 backdrop-blur-sm" style={{ animationFillMode: 'forwards', animationDelay: '700ms' }}>
          <p className="text-sm text-[var(--color-mint)] uppercase tracking-wider font-medium mb-8 drop-shadow-sm">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-24 items-center">
            <div className="flex flex-col items-center group">
              {isMounted ? <Counter end={99.9} suffix="%" /> : <span className="font-mono text-3xl font-bold text-[var(--color-forsythia)]">99.9%</span>}
              <span className="text-sm mt-2 text-[var(--color-mint)]/80 group-hover:text-[var(--color-mint)] transition-colors">Uptime SLA</span>
            </div>
            <div className="flex flex-col items-center group">
              {isMounted ? <Counter end={10} suffix="B+" /> : <span className="font-mono text-3xl font-bold text-[var(--color-forsythia)]">10B+</span>}
              <span className="text-sm mt-2 text-[var(--color-mint)]/80 group-hover:text-[var(--color-mint)] transition-colors">Rows Synced</span>
            </div>
            <div className="flex flex-col items-center group">
              {isMounted ? <Counter end={150} suffix="+" /> : <span className="font-mono text-3xl font-bold text-[var(--color-forsythia)]">150+</span>}
              <span className="text-sm mt-2 text-[var(--color-mint)]/80 group-hover:text-[var(--color-mint)] transition-colors">Integrations</span>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[softFade_2s_ease-in-out_infinite_alternate] opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
          <span className="text-xs text-[var(--color-mint)] uppercase tracking-widest font-semibold">Scroll</span>
          <Image src="/svg/chevron-down.svg" alt="Scroll down" width={16} height={16} className="filter invert opacity-60" />
        </div>
      </div>
    </section>
  );
}
