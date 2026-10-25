import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award } from 'lucide-react';

// Lazy-load the heavy 1.1MB 3D WebGL bundle so it never blocks the initial paint or Lighthouse audit
const FireExtinguisher3D = lazy(() => import('./3d/FireExtinguisher3D'));

// High-performance, zero-latency vector preview placeholder
function ExtinguisherPlaceholder({ onActivate }) {
  return (
    <div 
      className="relative w-full h-[450px] lg:h-[540px] flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#0F1422] to-[#080B11] border border-surfaceBorder shadow-2xl group cursor-pointer"
      onClick={onActivate}
      onPointerEnter={onActivate}
      onTouchStart={onActivate}
    >
      {/* Background ambient lighting spotlight */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-80"></div>
      <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none"></div>

      {/* Top HUD Telemetry */}
      <div className="absolute top-4 right-4 flex items-center z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#0B0F19]/90 border border-surfaceBorder text-[11px] font-mono text-emerald-400">
          <span>IS:15683 CERTIFIED</span>
        </div>
      </div>

      {/* High-fidelity Vector Extinguisher with ambient floating motion */}
      <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <svg 
          viewBox="0 0 160 320" 
          className="w-48 h-80 sm:w-56 sm:h-96 filter drop-shadow-[0_20px_35px_rgba(230,57,47,0.35)] transition-all"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-label="JS Enterprises 6kg ABC Dry Powder Fire Extinguisher"
        >
          {/* Valve Brass Body */}
          <rect x="72" y="58" width="16" height="22" rx="2" fill="#D4AF37" />
          
          {/* Pressure Gauge */}
          <circle cx="60" cy="65" r="9" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="60" cy="65" r="7" fill="#0F172A" />
          <path d="M57 65 A3 3 0 0 1 63 65" stroke="#10B981" strokeWidth="2" fill="none" />
          <line x1="60" y1="65" x2="62" y2="60" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Top Carry Handle */}
          <path d="M68 58 L54 44 C52 42 50 42 48 44 L44 48 C42 50 42 52 44 54 L68 66 Z" fill="#262626" />
          
          {/* Discharge Squeeze Lever */}
          <path d="M80 58 L104 42 C106 40 109 41 110 43 L114 47 C116 49 115 52 113 53 L88 68 Z" fill="#E5E5E5" />
          
          {/* Pull Pin & Ring */}
          <circle cx="86" cy="50" r="6" stroke="#E5E5E5" strokeWidth="2" fill="none" />
          <line x1="80" y1="52" x2="90" y2="52" stroke="#FFD600" strokeWidth="3" strokeLinecap="round" />
          
          {/* Extinguisher Neck */}
          <path d="M66 78 C66 74 72 72 80 72 C88 72 94 74 94 78 L96 86 L64 86 Z" fill="#991B1B" />
          
          {/* Main Red Cylinder Body with realistic cylindrical gradient */}
          <rect x="42" y="86" width="76" height="190" rx="38" fill="url(#cylinderGradient)" />
          
          {/* Body Gloss Highlight */}
          <path d="M52 110 Q50 180 52 240" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
          
          {/* Base Boot */}
          <path d="M42 248 C42 268 58 278 80 278 C102 278 118 268 118 248 L118 266 C118 274 102 282 80 282 C58 282 42 274 42 266 Z" fill="#171717" />
          
          {/* Product Label Badge on Cylinder */}
          <rect x="52" y="130" width="56" height="85" rx="4" fill="#0A0D14" stroke="#334155" strokeWidth="1" />
          <rect x="54" y="134" width="52" height="18" fill="#DC2626" rx="2" />
          <text x="80" y="146" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">JS ENTERPRISES</text>
          <text x="80" y="162" fill="#E2E8F0" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ABC DRY POWDER</text>
          <line x1="58" y1="170" x2="102" y2="170" stroke="#475569" strokeWidth="1" />
          <text x="80" y="180" fill="#94A3B8" fontSize="5.5" textAnchor="middle" fontFamily="monospace">6 KG • IS:15683</text>
          
          {/* Discharge Hose Curve */}
          <path d="M88 74 Q126 95 120 180 Q118 210 110 230" stroke="#171717" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M88 74 Q126 95 120 180 Q118 210 110 230" stroke="#262626" strokeWidth="6" strokeLinecap="round" fill="none" />
          
          {/* Nozzle */}
          <rect x="105" y="222" width="10" height="22" rx="3" fill="#0A0A0A" transform="rotate(-15 105 222)" />
          
          {/* Linear Gradient for 3D Curved Cylindrical Look */}
          <defs>
            <linearGradient id="cylinderGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7F1D1D" />
              <stop offset="15%" stopColor="#DC2626" />
              <stop offset="45%" stopColor="#EF4444" />
              <stop offset="70%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg bg-[#0E131F]/90 backdrop-blur-md border border-surfaceBorder text-xs font-mono text-gray-300">
          <span className="text-gray-400 mr-2">SPEC:</span>
          <span>ABC Dry Powder • 6kg • 15 Bar</span>
        </div>

        <div className="text-[11px] font-mono text-gray-300 bg-[#0E131F]/80 px-2.5 py-1 rounded border border-surfaceBorder flex items-center gap-1.5 group-hover:text-fire transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>360° Inspection</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    // Automatically load the 3D model only when the browser is idle to ensure 100/100 Lighthouse performance
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(() => setLoad3D(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setLoad3D(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-fire/10 blur-[140px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Regulatory badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-surfaceBorder text-xs font-mono text-gray-300"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fire opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fire"></span>
              </span>
              <span className="text-gray-300">CERTIFIED FIRE SAFETY SOLUTIONS</span>
              <span className="text-gray-500">•</span>
              <span className="text-fire font-semibold">CHENNAI & TAMIL NADU</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Protection That <span className="text-fire inline-block text-glow-fire relative">
                Never
              </span> Compromises.
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal"
            >
              Comprehensive industrial, commercial, and residential fire protection systems engineered for uncompromising life safety, strict statutory compliance, and rapid emergency readiness across Tamil Nadu.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-fire hover:bg-red-600 text-white font-semibold text-sm sm:text-base shadow-xl shadow-fire/30 hover:shadow-fire/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-surfaceLight border border-surfaceBorder hover:border-gray-500 text-gray-200 font-medium text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </a>
            </motion.div>

            {/* Trust and Compliance Credentials */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-6 border-t border-surfaceBorder/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300 font-mono"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>TNFRS & NBC Standards Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-fire shrink-0" />
                <span>IS:15683 Certified Equipment</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Fire Extinguisher with instant placeholder and lazy loader */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {load3D ? (
                <Suspense fallback={<ExtinguisherPlaceholder onActivate={() => {}} />}>
                  <FireExtinguisher3D />
                </Suspense>
              ) : (
                <ExtinguisherPlaceholder onActivate={() => setLoad3D(true)} />
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
