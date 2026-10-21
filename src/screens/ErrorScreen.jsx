import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw, Phone, ShieldAlert, ArrowRight, Activity, Terminal } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ErrorScreen({ onReturnHome, onRetry, errorDetails }) {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      if (onRetry) onRetry();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-white flex flex-col justify-between">
      {/* Header */}
      <Header currentScreen="error" setScreen={(s) => {
        if (s === 'main') onReturnHome();
      }} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex items-center justify-center relative">
        {/* Ambient red alert glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 404 Hero & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Alert Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-700/60 text-xs font-mono text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>CRITICAL ALERT / CODE: 404</span>
            </div>

            {/* Giant 404 */}
            <div className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-red-500 font-mono leading-none select-none">
              404
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Fire Line Disconnected, Page Not Found.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
              {errorDetails?.message || 
                "The requested route could not be established. The link might be outdated or the safety resource may have been relocated during scheduled network maintenance."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onReturnHome}
                className="px-6 py-3.5 rounded-xl bg-fire hover:bg-red-600 text-white font-semibold text-sm shadow-xl shadow-fire/30 hover:shadow-fire/50 transition-all flex items-center gap-2 active:scale-95"
              >
                <Home className="w-4 h-4" />
                <span>Return to Main Safety Hub</span>
              </button>

              <button
                onClick={handleRetry}
                disabled={retrying}
                className="px-5 py-3.5 rounded-xl bg-surface hover:bg-surfaceLight border border-surfaceBorder hover:border-gray-500 text-gray-200 font-medium text-sm transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin text-fire' : ''}`} />
                <span>{retrying ? 'Attempting Reconnection...' : 'Retry Connection'}</span>
              </button>
            </div>

            {/* Quick emergency dispatch hotline */}
            <div className="pt-6 border-t border-surfaceBorder/60 flex items-center gap-3 text-xs text-gray-400 font-mono">
              <span className="text-gray-500">EMERGENCY ASSISTANCE:</span>
              <a href="tel:+919941646332" className="text-fire hover:underline font-semibold">
                +91 99416 46332
              </a>
              <span className="text-gray-600">•</span>
              <span>24/7 CHENNAI DESK</span>
            </div>

          </div>

          {/* Right: Technical Diagnostics Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Diagnostics Panel */}
            <div className="p-6 rounded-2xl bg-surface border border-surfaceBorder shadow-2xl space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-surfaceBorder/60">
                <span className="text-gray-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-fire" />
                  INCIDENT DIAGNOSTICS
                </span>
                <span className="text-red-400 font-bold">UNRESOLVED</span>
              </div>

              <div className="space-y-2.5 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">ERROR PROTOCOL:</span>
                  <span className="text-white">HTTP_ERR_404_NOT_FOUND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">DISPATCH NODE:</span>
                  <span className="text-white">CHN-PADI-PRIMARY-01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">TIMESTAMP:</span>
                  <span className="text-white">{new Date().toISOString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">DIAGNOSTIC LATENCY:</span>
                  <span className="text-amber-400 font-bold">404 ms</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#080B11] border border-amber-900/40 text-amber-300/90 text-[11px] leading-relaxed">
                <span className="font-bold block mb-1">PRIMARY LINE UN-BUFFERED:</span>
                The telemetry route to this safety index failed to return an operational handshake. You may safely return to the main hub.
              </div>
            </div>

            {/* Direct Safety Desk Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-surface to-red-950/20 border border-fire/30 shadow-xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-fire block mb-1">
                  IMMEDIATE FIRE HAZARD?
                </span>
                <div className="text-sm font-bold text-white">
                  Connect Directly to Site Ops
                </div>
                <div className="text-xs text-gray-400 mt-0.5 font-mono">
                  No hold time • Direct engineer dispatch
                </div>
              </div>
              <a
                href="tel:+919941646332"
                className="w-12 h-12 rounded-xl bg-fire hover:bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-fire/30 transition-transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer setScreen={() => {}} />
    </div>
  );
}
