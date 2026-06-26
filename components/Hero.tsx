import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[var(--color-nocturnal)] rounded-full blur-[120px] opacity-60 pointer-events-none -z-10 animate-fade-in" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in z-10 relative">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-arctic)] max-w-4xl mx-auto leading-tight">
          Data automation on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-forsythia)]">autopilot</span>
        </h1>
        
        <p className="mt-6 text-xl md:text-2xl text-[var(--color-mint)] max-w-2xl mx-auto leading-relaxed">
          The premium AI tooling to sync, transform, and scale your data pipelines without writing a single line of code.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="#pricing" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[var(--color-saffron)] text-[var(--color-oceanic)] font-bold text-lg hover:bg-[var(--color-forsythia)] animate-elevate text-center">
            Start Free Trial
          </Link>
          <Link href="#features" className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[var(--color-nocturnal)]/50 border border-[var(--color-mint)]/20 text-[var(--color-arctic)] font-semibold text-lg hover:bg-[var(--color-nocturnal)] transition-colors duration-[180ms] flex items-center justify-center gap-2">
            <Image src="/svg/arrow-trending-up.svg" alt="Explore" width={20} height={20} className="filter invert opacity-80" />
            Explore Features
          </Link>
        </div>

        {/* Statistics & Trust Indicators */}
        <div className="mt-20 border-t border-[var(--color-nocturnal)] pt-10">
          <p className="text-sm text-[var(--color-mint)] uppercase tracking-wider font-medium mb-6">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70">
            <div className="flex flex-col items-center">
              <span className="font-mono text-3xl font-bold text-[var(--color-forsythia)]">99.9%</span>
              <span className="text-sm mt-1">Uptime SLA</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-3xl font-bold text-[var(--color-forsythia)]">10B+</span>
              <span className="text-sm mt-1">Rows Synced</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-3xl font-bold text-[var(--color-forsythia)]">150+</span>
              <span className="text-sm mt-1">Integrations</span>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[softFade_2s_ease-in-out_infinite_alternate]">
          <span className="text-xs text-[var(--color-mint)] uppercase tracking-widest">Scroll</span>
          <Image src="/svg/chevron-down.svg" alt="Scroll down" width={16} height={16} className="filter invert opacity-60" />
        </div>
      </div>
    </section>
  );
}
