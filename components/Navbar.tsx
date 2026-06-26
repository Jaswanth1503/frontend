"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function MagneticButton({ children, href, className }: { children: React.ReactNode, href: string, className: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const boundingRect = buttonRef.current?.getBoundingClientRect();
    if (boundingRect) {
      const x = (clientX - (boundingRect.left + boundingRect.width / 2)) * 0.2;
      const y = (clientY - (boundingRect.top + boundingRect.height / 2)) * 0.2;
      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
      }}
    >
      {children}
    </Link>
  );
}

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="relative text-sm font-medium text-[var(--color-mint)] hover:text-[var(--color-arctic)] transition-colors duration-[180ms] group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-forsythia)] origin-left scale-x-0 transition-transform duration-[300ms] ease-out group-hover:scale-x-100" />
  </Link>
);

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
          ? "bg-[var(--color-oceanic)]/80 backdrop-blur-md border-b border-[var(--color-nocturnal)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-[var(--color-saffron)] to-[var(--color-forsythia)] flex items-center justify-center animate-elevate group-hover:shadow-[0_0_15px_rgba(255,153,50,0.5)] transition-shadow duration-300">
               <Image src="/svg/cube-16-solid.svg" alt="Logo" width={20} height={20} />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-[var(--color-arctic)]">DataSync</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="#login">Sign in</NavLink>
            <MagneticButton 
              href="#pricing" 
              className="relative overflow-hidden px-4 py-2 rounded-md bg-[var(--color-saffron)] text-[var(--color-oceanic)] text-sm font-bold shadow-lg transition-all hover:shadow-[0_0_20px_rgba(255,200,1,0.4)] group inline-flex items-center gap-2"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-forsythia)] to-[var(--color-saffron)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-mint)] hover:text-[var(--color-arctic)] focus:outline-none p-2 transition-transform duration-300"
              style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
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
