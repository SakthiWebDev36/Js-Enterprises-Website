import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Warehouse, Building2, Hospital } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function IndustriesServed() {
  const industryIcons = [
    Factory,
    Warehouse,
    Building2,
    Hospital
  ];

  return (
    <section className="py-20 relative border-t border-surfaceBorder/60 bg-[#06090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surfaceBorder text-xs font-mono text-fire mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-fire"></span>
            FACILITY APPLICATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industries & Environments Served
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Tailored fire safety engineering designed for specific occupancy hazard classifications under the National Building Code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyData.industriesServed.map((ind, idx) => {
            const Icon = industryIcons[idx] || Factory;

            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-surface border border-surfaceBorder hover:border-fire/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-surfaceLight border border-surfaceBorder flex items-center justify-center text-fire mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                  {ind.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {ind.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
