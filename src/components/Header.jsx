import React, { useState, useEffect } from 'react';
import { Shield, Phone, Menu, X, ArrowRight } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Header({ currentScreen, setScreen, openQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Lifecycle', href: '#lifecycle' },
    { name: 'Practice', href: '#practice' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Telemetry / Emergency Bar */}
      <div className="bg-[#0B0F19] border-b border-surfaceBorder/60 py-1.5 px-4 text-xs font-mono text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              PADI HUB DESK: ACTIVE
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline text-gray-400">
              TAMIL NADU FIRE & RESCUE COMPLIANT
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 hidden md:inline">24/7 Hotline:</span>
            <a 
              href="tel:+919941646332" 
              className="flex items-center gap-1.5 text-fire hover:text-red-400 font-semibold tracking-wide transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 99416 46332
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#080B11]/95 backdrop-blur-md border-b border-surfaceBorder shadow-2xl py-3' 
          : 'bg-[#080B11]/80 backdrop-blur-sm border-b border-surfaceBorder/40 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              if (currentScreen !== 'main') {
                e.preventDefault();
                setScreen('main');
              }
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fire to-red-800 p-0.5 flex items-center justify-center shadow-lg shadow-fire/20 group-hover:shadow-fire/40 transition-shadow">
              <div className="w-full h-full bg-[#0E131F] rounded-[7px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-fire group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                JS ENTERPRISES
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-wider text-gray-400 -mt-0.5">
                Fire Safety Engineering • Chennai
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (currentScreen !== 'main') {
                    setScreen('main');
                  }
                }}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-fire after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => {
                if (currentScreen !== 'main') setScreen('main');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-fire hover:bg-red-600 text-white font-medium text-sm shadow-lg shadow-fire/25 hover:shadow-fire/40 transition-all active:scale-95"
            >
              <span>Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface border border-surfaceBorder text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-4 pt-3 pb-6 bg-[#0E131F] border-b border-surfaceBorder space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    if (currentScreen !== 'main') setScreen('main');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-surfaceLight transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-surfaceBorder/60 space-y-2">
              <a
                href="tel:+919941646332"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-surface border border-surfaceBorder text-fire font-medium text-sm"
              >
                <Phone className="w-4 h-4" />
                Call +91 99416 46332
              </a>
              <a
                href="#contact"
                onClick={() => {
                  if (currentScreen !== 'main') setScreen('main');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-fire text-white font-medium text-sm shadow-md shadow-fire/30"
              >
                Request On-Site Inspection
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
