import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Flame, Award, PhoneCall } from 'lucide-react';
import FireExtinguisher3D from './3d/FireExtinguisher3D';

export default function Hero() {
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
              <span className="text-gray-600">•</span>
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-surfaceLight border border-surfaceBorder hover:border-gray-600 text-gray-200 font-medium text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
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
              className="pt-6 border-t border-surfaceBorder/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400 font-mono"
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

          {/* Right Column: 3D Interactive Fire Extinguisher */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <FireExtinguisher3D />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
