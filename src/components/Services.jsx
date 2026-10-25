import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Bell, Droplets, Flame, ArrowUpRight, Check, X, Info, Camera } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Services() {
  const [activeModal, setActiveModal] = useState(null);

  const serviceIcons = {
    "fire-extinguishers": Flame,
    "fire-alarm-systems": Bell,
    "fire-hydrant-systems": Shield,
    "sprinkler-systems": Droplets,
  };

  // Real photos from www.jsenterpriseschennai.com
  const servicePhotos = {
    "fire-extinguishers": "/photos/equip-dry-powder.jpg",
    "fire-alarm-systems": "/photos/equip-addressable-alarm.jpg",
    "fire-hydrant-systems": "/photos/site-hydrant-piping.jpg",
    "sprinkler-systems": "/photos/site-sprinkler-grid.jpg",
  };

  return (
    <section id="services" className="py-24 relative border-t border-surfaceBorder/60 bg-[#06090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surfaceBorder text-xs font-mono text-fire mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-fire"></span>
              CORE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Complete Fire Protection Solutions
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md font-mono">
            Engineered systems designed to detect, contain, and suppress fire threats instantly across high-risk facilities.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {companyData.services.map((service, idx) => {
            const Icon = serviceIcons[service.id] || Shield;
            const photoUrl = servicePhotos[service.id];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-surface border border-surfaceBorder hover:border-fire/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-fire/10"
              >
                {/* Photo Thumbnail Strip */}
                <div className="relative w-full h-44 overflow-hidden bg-black/60">
                  <img
                    src={photoUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] via-[#0E131F]/30 to-black/20"></div>
                  
                  {/* Standards Badge */}
                  <div className="absolute top-3 right-3 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-gray-200">
                    {service.badge}
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-3 left-4 w-11 h-11 rounded-xl bg-[#080B11]/90 backdrop-blur-md border border-surfaceBorder flex items-center justify-center text-fire group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-8 pt-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Short Description */}
                    <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                      {service.shortDesc}
                    </p>

                    {/* Service Types / Bullets */}
                    <div className="space-y-2 mb-6">
                      {service.types.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-fire shrink-0 mt-1.5"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-5 border-t border-surfaceBorder/60 flex items-center justify-between">
                    <button
                      onClick={() => setActiveModal(service)}
                      aria-label={`View technical specifications for ${service.title}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-fire hover:text-red-400 transition-colors"
                    >
                      <span>View Technical Specifications</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <span className="text-xs font-mono text-gray-500">0{idx + 1}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Technical Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0E131F] border border-surfaceBorder rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close specifications modal"
                className="absolute top-5 right-5 p-2 rounded-lg bg-surface border border-surfaceBorder text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface border border-surfaceBorder text-xs font-mono text-fire mb-3">
                {activeModal.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {activeModal.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                {activeModal.description}
              </p>

              {/* Types */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                  Configurations & Deployment Types
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModal.types.map((type, i) => (
                    <div key={i} className="p-3 rounded-lg bg-surface border border-surfaceBorder/60 text-xs text-gray-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                  Engineering Standards & Specifications
                </h4>
                <div className="space-y-2">
                  {activeModal.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-fire shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-4 border-t border-surfaceBorder flex flex-wrap items-center justify-between gap-4">
                <a
                  href="#contact"
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-fire hover:bg-red-600 text-white font-semibold text-sm transition-colors shadow-lg shadow-fire/20"
                >
                  Request Consultation for this System
                </a>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2.5 text-xs text-gray-400 hover:text-white"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
