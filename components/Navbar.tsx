"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-[350ms] ease-in-out ${
        isScrolled
          ? "bg-[var(--color-oceanic)]/90 backdrop-blur-md border-b border-[var(--color-nocturnal)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-[var(--color-saffron)] to-[var(--color-forsythia)] flex items-center justify-center animate-elevate">
               <Image src="/svg/cube-16-solid.svg" alt="Logo" width={20} height={20} />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight">DataSync</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-sm font-medium text-[var(--color-mint)] hover:text-[var(--color-forsythia)] transition-colors duration-[180ms]">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-[var(--color-mint)] hover:text-[var(--color-forsythia)] transition-colors duration-[180ms]">Pricing</Link>
            <Link href="#testimonials" className="text-sm font-medium text-[var(--color-mint)] hover:text-[var(--color-forsythia)] transition-colors duration-[180ms]">Testimonials</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="#login" className="text-sm font-medium text-[var(--color-mint)] hover:text-[var(--color-arctic)] transition-colors">Sign in</Link>
            <Link href="#pricing" className="px-4 py-2 rounded-md bg-[var(--color-saffron)] text-[var(--color-oceanic)] text-sm font-bold hover:bg-[var(--color-forsythia)] transition-colors animate-elevate">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-mint)] hover:text-[var(--color-arctic)] focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <Image 
                src={mobileMenuOpen ? "/svg/x-mark.svg" : "/svg/arrow-path.svg"} 
                alt="Menu" 
                width={24} 
                height={24}
                className="filter invert opacity-80"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-[350ms] ease-in-out ${mobileMenuOpen ? "max-h-64 border-b border-[var(--color-nocturnal)] bg-[var(--color-oceanic)]" : "max-h-0"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[var(--color-mint)] hover:text-[var(--color-forsythia)] hover:bg-[var(--color-nocturnal)] rounded-md transition-colors duration-[180ms]">Features</Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[var(--color-mint)] hover:text-[var(--color-forsythia)] hover:bg-[var(--color-nocturnal)] rounded-md transition-colors duration-[180ms]">Pricing</Link>
          <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[var(--color-mint)] hover:text-[var(--color-forsythia)] hover:bg-[var(--color-nocturnal)] rounded-md transition-colors duration-[180ms]">Testimonials</Link>
          <Link href="#login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[var(--color-mint)] hover:text-[var(--color-arctic)] hover:bg-[var(--color-nocturnal)] rounded-md transition-colors duration-[180ms]">Sign in</Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium bg-[var(--color-saffron)] text-[var(--color-oceanic)] rounded-md mt-4 text-center font-bold">Get Started</Link>
        </div>
      </div>
    </header>
  );
}
