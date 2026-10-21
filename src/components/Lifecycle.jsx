import React from 'react';
import { motion } from 'framer-motion';
import { Compass, PackageCheck, Wrench, CheckCheck, RefreshCw } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Lifecycle() {
  const stepIcons = [
    Compass,
    PackageCheck,
    Wrench,
    CheckCheck,
    RefreshCw
  ];

  return (
    <section id="lifecycle" className="py-24 relative border-t border-surfaceBorder/60 bg-[#06090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surfaceBorder text-xs font-mono text-fire mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-fire"></span>
            STRUCTURED METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineering Lifecycle: Concept to Commissioning
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-mono">
            A disciplined, standards-driven execution framework ensuring regulatory clearance, quality compliance, and long-term operational resilience.
          </p>
        </div>

        {/* 5 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {companyData.lifecycle.map((step, idx) => {
            const Icon = stepIcons[idx] || Compass;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-6 rounded-2xl bg-surface border border-surfaceBorder hover:border-fire/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono text-fire font-bold px-2 py-0.5 rounded bg-fire/10 border border-fire/20">
                      STEP {step.step}
                    </span>
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-fire transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surfaceBorder/60 flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
                  <span>MILESTONE VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
