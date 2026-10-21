import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Clock, FileSpreadsheet, MapPin, Wrench } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function WhyChooseUs() {
  const iconMap = [
    Award,
    ShieldCheck,
    Clock,
    FileSpreadsheet,
    MapPin,
    Wrench
  ];

  return (
    <section id="why-us" className="py-24 relative border-t border-surfaceBorder/60 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surfaceBorder text-xs font-mono text-fire">
              <span className="w-1.5 h-1.5 rounded-full bg-fire"></span>
              ENGINEERING INTEGRITY
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              A Practical Approach to Fire Safety.
            </h2>

            <p className="text-base text-gray-300 leading-relaxed">
              Fire protection is not a checklist item — it is a life-critical safeguard. We combine precision hydraulic design, certified hardware, and disciplined maintenance to guarantee absolute responsiveness when every second counts.
            </p>

            <div className="p-6 rounded-2xl bg-surface border border-surfaceBorder space-y-4">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                COMPLIANCE GUARANTEE
              </div>
              <p className="text-sm text-gray-300">
                All installations are engineered and certified to meet the statutory requisites of the <span className="text-white font-semibold">Tamil Nadu Fire and Rescue Services (TNFRS)</span> and the <span className="text-white font-semibold">National Building Code of India (NBC)</span>.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Full Audit Documentation Provided
              </div>
            </div>
          </div>

          {/* Right Column: 6 Value Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companyData.whyChooseUs.map((item, idx) => {
              const Icon = iconMap[idx] || ShieldCheck;

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl bg-surface border border-surfaceBorder hover:border-fire/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-lg bg-surfaceLight border border-surfaceBorder flex items-center justify-center text-fire group-hover:bg-fire group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-gray-500 font-semibold">
                      // {item.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
