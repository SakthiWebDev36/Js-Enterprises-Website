import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, Clock, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SuccessScreen({ ticketData, data, onReturnHome }) {
  const ticket = ticketData || data || {};

  useEffect(() => {
    // Scroll to top when success screen mounts
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Elegant celebratory burst
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E6392F', '#10B981', '#F59E0B', '#FFFFFF'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const projectStages = [
    {
      num: "01",
      title: "Inspection & Audit",
      desc: "Our field engineer conducts a physical premises walk-through to map fire risks, egress routes, and occupancy classifications."
    },
    {
      num: "02",
      title: "Engineering Blueprint",
      desc: "We generate comprehensive AutoCAD layouts, hydraulic pressure loss calculations, and itemized bill-of-quantities."
    },
    {
      num: "03",
      title: "Execution & Approval",
      desc: "Certified piping technicians install and commission systems with full compliance documentation for fire clearance."
    }
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-white flex flex-col justify-between">
      {/* Header */}
      <Header currentScreen="success" setScreen={(s) => {
        if (s === 'main') onReturnHome();
      }} />

      {/* Main Success Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative">
        {/* Subtle green aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="text-center space-y-4 mb-10 relative z-10">
          
          {/* Reference Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-600/50 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SUBMISSION LOGGED / REF: {ticket?.refId || 'JSE-2026-9481'}</span>
          </div>

          {/* Glowing Green Shield Icon */}
          <div className="flex justify-center pt-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Consultation Request Received
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Thank you for reaching out to JS Enterprises. Your inquiry has been routed to our Chennai engineering operations desk for priority assessment.
          </p>

        </div>

        {/* Dispatch Summary Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface border border-surfaceBorder rounded-2xl p-6 sm:p-8 shadow-2xl mb-12 relative z-10 space-y-6"
        >
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-surfaceBorder/60 text-xs font-mono">
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold">REQUEST STATUS:</span>
              <span className="text-emerald-400">DISPATCHED TO OPERATIONS</span>
            </div>
            <div className="text-gray-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-fire" />
              <span>ESTIMATED CONTACT: WITHIN 2 HOURS</span>
            </div>
          </div>

          {/* 4 Metadata Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
            <div className="p-3.5 rounded-xl bg-[#080B11] border border-surfaceBorder/60">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Reference ID</span>
              <span className="text-sm font-mono font-bold text-white mt-0.5 block">
                {ticket?.refId || 'JSE-2026-9481'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080B11] border border-surfaceBorder/60">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Facility Location</span>
              <span className="text-sm font-semibold text-white mt-0.5 block">
                CHN - Padi / Ambattur
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080B11] border border-surfaceBorder/60">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Contact Person</span>
              <span className="text-sm font-semibold text-white mt-0.5 block truncate">
                {ticket?.name || 'Designated Contact'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080B11] border border-surfaceBorder/60">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Response Desk</span>
              <span className="text-sm font-semibold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                On Duty
              </span>
            </div>
          </div>

          {/* Subtext Notice */}
          <div className="p-4 rounded-xl bg-surfaceLight border border-surfaceBorder/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-gray-300">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>An electronic acknowledgment has been recorded for this session.</span>
            </div>
            <div className="font-mono text-gray-400">
              Direct Hotline: <a href="tel:+919941646332" className="text-white hover:text-fire font-semibold">+91 99416 46332</a>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onReturnHome}
              className="px-6 py-3.5 rounded-xl bg-fire hover:bg-red-600 text-white font-semibold text-sm shadow-xl shadow-fire/30 hover:shadow-fire/50 transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return to Main Safety Hub</span>
            </button>
          </div>

          <p className="text-center text-[11px] font-mono text-gray-500 pt-1">
            For urgent on-site fire hazards, please call our 24/7 emergency dispatch line directly at +91 99416 46332.
          </p>
        </motion.div>

        {/* "Lifecycle of Your Project" Section */}
        <div className="space-y-6 relative z-10">
          <div className="text-left">
            <span className="text-xs font-mono text-fire font-bold tracking-wider uppercase block mb-1">
              WHAT HAPPENS NEXT
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Lifecycle of Your Project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projectStages.map((stage) => (
              <div
                key={stage.num}
                className="p-6 rounded-2xl bg-surface border border-surfaceBorder hover:border-emerald-500/40 transition-colors space-y-3"
              >
                <div className="text-xs font-mono text-emerald-400 font-bold">
                  // {stage.num}
                </div>
                <h3 className="text-base font-bold text-white">
                  {stage.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
