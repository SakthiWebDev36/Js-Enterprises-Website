import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, RefreshCw, AlertCircle, ArrowRight, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoadingScreen({ onFinish, onCancel }) {
  const [progress, setProgress] = useState(14);
  const [stepStatus, setStepStatus] = useState({
    extinguisher: 'loading',
    alarm: 'pending',
    hydrant: 'pending',
    sprinkler: 'pending',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress > 25) {
      setStepStatus(prev => ({ ...prev, extinguisher: 'done', alarm: 'loading' }));
    }
    if (progress > 55) {
      setStepStatus(prev => ({ ...prev, alarm: 'done', hydrant: 'loading' }));
    }
    if (progress > 80) {
      setStepStatus(prev => ({ ...prev, hydrant: 'done', sprinkler: 'loading' }));
    }
    if (progress >= 100) {
      setStepStatus(prev => ({ ...prev, sprinkler: 'done' }));
    }
  }, [progress]);

  // Circular gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#080B11] text-white flex flex-col justify-between">
      {/* Navigation Header */}
      <Header currentScreen="loading" setScreen={(s) => {
        if (s === 'main' && onFinish) onFinish();
      }} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient red atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-fire/10 blur-[130px] rounded-full pointer-events-none"></div>

        {/* Telemetry Status Strip */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between text-xs font-mono text-gray-400 mb-6 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fire animate-ping"></span>
            <span className="text-gray-300">SYSTEM STATUS: INITIALIZING</span>
          </div>
          <div className="text-fire">
            SYSTEM TELEMETRY CHECK
          </div>
        </div>

        {/* Central Terminal Card Matching Figma */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-[#0E131F] border border-surfaceBorder rounded-2xl p-8 sm:p-12 shadow-2xl relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Left: Circular Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-surfaceBorder"
                    fill="transparent"
                  />
                  {/* Progress Glow Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#E6392F"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                    fill="transparent"
                  />
                </svg>

                {/* Inner Counter */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                    {progress}%
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">
                    CALIBRATED
                  </span>
                </div>
              </div>

              <div className="mt-6 text-xs font-mono text-gray-400 tracking-wider uppercase">
                SYSTEM CALIBRATION IN PROGRESS
              </div>
            </div>

            {/* Right: Telemetry Checks & Progress Status */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-mono text-fire uppercase tracking-wider block font-semibold mb-1">
                  SYSTEM READY / INITIALIZING
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Initializing Fire Safety Command...
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed font-sans">
                  Preparing emergency dispatch protocols, system telemetry, 3D hardware pipelines, and Chennai operations routing.
                </p>
              </div>

              {/* Status Checklist items */}
              <div className="space-y-3 pt-2 font-mono text-xs">
                
                {/* 1. Fire Extinguisher Telemetry */}
                <div className="p-3 rounded-xl bg-[#080B11] border border-surfaceBorder flex items-center justify-between">
                  <span className="text-gray-300">1. Fire Extinguisher Telemetry</span>
                  {stepStatus.extinguisher === 'done' ? (
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> OK
                    </span>
                  ) : (
                    <span className="text-fire flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> VERIFYING
                    </span>
                  )}
                </div>

                {/* 2. Alarm Response Grid */}
                <div className="p-3 rounded-xl bg-[#080B11] border border-surfaceBorder flex items-center justify-between">
                  <span className="text-gray-300">2. Alarm Response Grid</span>
                  {stepStatus.alarm === 'done' ? (
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> SYNCED
                    </span>
                  ) : stepStatus.alarm === 'loading' ? (
                    <span className="text-amber-400 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> SYNCING
                    </span>
                  ) : (
                    <span className="text-gray-600">STANDBY</span>
                  )}
                </div>

                {/* 3. Hydrant Pressure Checks */}
                <div className="p-3 rounded-xl bg-[#080B11] border border-surfaceBorder flex items-center justify-between">
                  <span className="text-gray-300">3. Hydrant Pressure Checks</span>
                  {stepStatus.hydrant === 'done' ? (
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> 14.2 BAR OK
                    </span>
                  ) : stepStatus.hydrant === 'loading' ? (
                    <span className="text-fire flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> TESTING
                    </span>
                  ) : (
                    <span className="text-gray-600">STANDBY</span>
                  )}
                </div>

                {/* 4. Sprinkler Network Nodes */}
                <div className="p-3 rounded-xl bg-[#080B11] border border-surfaceBorder flex items-center justify-between">
                  <span className="text-gray-300">4. Sprinkler Network Nodes</span>
                  {stepStatus.sprinkler === 'done' ? (
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> ARMED
                    </span>
                  ) : stepStatus.sprinkler === 'loading' ? (
                    <span className="text-cyan-400 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> CHECKING
                    </span>
                  ) : (
                    <span className="text-gray-600">STANDBY</span>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onFinish}
                  className="px-5 py-2.5 rounded-xl bg-fire hover:bg-red-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-fire/25 transition-all flex items-center gap-2"
                >
                  <span>{progress >= 100 ? 'Access Main Safety Hub' : 'Skip & Enter Immediately'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="px-4 py-2.5 rounded-xl bg-surface hover:bg-surfaceLight border border-surfaceBorder text-gray-300 text-xs sm:text-sm font-medium transition-all"
                  >
                    Return to Homepage
                  </button>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer setScreen={() => {}} />
    </div>
  );
}
