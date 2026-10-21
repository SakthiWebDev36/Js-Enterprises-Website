import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Wrench, FileCheck2, Cpu, MapPin } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function About() {
  const pillars = [
    {
      num: "01",
      title: "Turnkey Delivery",
      desc: "End-to-end fire fighting installations from hydraulic calculation and CAD layouts to commissioning."
    },
    {
      num: "02",
      title: "Statutory Compliance",
      desc: "Strict adherence to National Building Code (NBC) 2016 and Tamil Nadu Fire & Rescue Services norms."
    },
    {
      num: "03",
      title: "Rapid Maintenance",
      desc: "Routine hydro-testing, pressure recharging, leak detection, and rapid on-site breakdown response."
    },
    {
      num: "04",
      title: "Certified Equipment",
      desc: "Sourcing only tested, standard-compliant suppression equipment, forged valves, and verified detectors."
    }
  ];

  return (
    <section id="about" className="py-24 relative border-t border-surfaceBorder/60 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surfaceBorder text-xs font-mono text-fire mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-fire"></span>
            ABOUT JS ENTERPRISES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineered for Safety, Built on Trust.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
            Headquartered in Padi, Chennai, <span className="text-white font-medium">JS Enterprises</span> delivers end-to-end fire protection engineering, turnkey execution, and statutory inspection services across Tamil Nadu. We engineer robust, fail-safe life safety infrastructure safeguarding industrial plants, commercial parks, and public facilities.
          </p>
        </div>

        {/* Content Grid: Pillars + Metrics Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 4 Feature Pillars (2x2) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-surface border border-surfaceBorder hover:border-fire/40 transition-all duration-300 group hover:translate-y-[-2px]"
              >
                <div className="text-xs font-mono text-fire font-bold tracking-wider mb-2">
                  // {pillar.num}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: Operational Metrics Card */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full p-8 rounded-2xl bg-gradient-to-br from-surface to-[#0B0F19] border border-surfaceBorder flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-surfaceBorder/60">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    OPERATIONAL METRICS
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 my-8">
                  {companyData.stats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold text-gray-300">
                        {stat.label}
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        {stat.subtext}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Corridor Callout */}
              <div className="pt-6 border-t border-surfaceBorder/60">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#080B11] border border-surfaceBorder/70 text-xs text-gray-300">
                  <MapPin className="w-4 h-4 text-fire shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Serving Industrial Corridors:</span>{" "}
                    Ambattur IE, Padi, Sriperumbudur, Oragadam, Guindy, Maraimalai Nagar, and greater Chennai.
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
