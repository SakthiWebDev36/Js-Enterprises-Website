import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, ExternalLink, X, ZoomIn, ChevronLeft, ChevronRight, CheckCircle2, Camera } from 'lucide-react';
import { liveSitePhotos } from '../data/liveSitePhotos';

export default function PracticeGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const filters = [
    { id: 'all', label: 'All Photos (14)' },
    { id: 'hydrant', label: 'Hydrant & Piping' },
    { id: 'extinguisher', label: 'Extinguishers' },
    { id: 'alarm', label: 'Alarm Systems' },
    { id: 'sprinkler', label: 'Sprinklers' },
  ];

  const filteredPhotos = activeFilter === 'all'
    ? liveSitePhotos
    : liveSitePhotos.filter(p => p.filter === activeFilter);

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  const activePhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="practice" className="py-24 relative border-t border-surfaceBorder/60 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surfaceBorder text-xs font-mono text-fire mb-4">
              <Camera className="w-3.5 h-3.5 text-fire" />
              <span>OFFICIAL FIELD INSTALLATIONS • WWW.JSENTERPRISESCHENNAI.COM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Fire Safety in Practice
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300">
              Authentic on-site photographs of fire hydrant lines, automatic sprinkler arrays, alarm panels, and suppression equipment deployed by JS Enterprises across industrial and commercial facilities in Chennai.
            </p>
          </div>

          {/* Source Attribution Badge */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-surfaceBorder text-xs font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>VERIFIED ON-SITE ARCHIVE</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-8 mb-8 border-b border-surfaceBorder/60">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeFilter === f.id
                  ? 'bg-fire text-white shadow-lg shadow-fire/25 font-semibold'
                  : 'bg-surface hover:bg-surfaceLight border border-surfaceBorder text-gray-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="group relative rounded-2xl bg-surface border border-surfaceBorder hover:border-fire/60 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo Image Container */}
              <div 
                className="relative w-full h-52 bg-[#05070B] overflow-hidden cursor-pointer"
                onClick={() => setSelectedPhotoIndex(idx)}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] via-transparent to-black/30"></div>
                
                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-200 uppercase tracking-wider">
                  {photo.category}
                </div>

                {/* Inspect Zoom Hover Button */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-fire" />
                </div>

                {/* Location overlay bottom */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center gap-1.5 text-[11px] font-mono text-gray-300 truncate">
                  <MapPin className="w-3.5 h-3.5 text-fire shrink-0" />
                  <span className="truncate">{photo.location}</span>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {photo.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {photo.desc}
                  </p>
                </div>

                {/* Specs footer inside card */}
                <div className="pt-3 border-t border-surfaceBorder/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 flex items-center gap-1 truncate max-w-[190px]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{photo.specs}</span>
                  </span>
                  <button
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className="text-fire hover:text-red-400 font-semibold underline underline-offset-2 shrink-0"
                  >
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner linking to official website */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-surface via-[#0F1424] to-surface border border-surfaceBorder flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fire/20 border border-fire/40 flex items-center justify-center text-fire shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Live Installation Gallery Archive
              </div>
              <div className="text-xs text-gray-400">
                Directly referenced from JS Enterprises Chennai official photo archive.
              </div>
            </div>
          </div>

          <a
            href="https://www.jsenterpriseschennai.com/gallery/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surfaceLight hover:bg-[#1E273D] border border-surfaceBorder text-xs font-mono text-gray-200 hover:text-white transition-all"
          >
            <span>Visit Official Gallery Archive</span>
            <ExternalLink className="w-3.5 h-3.5 text-fire" />
          </a>
        </div>

      </div>

      {/* Full-Screen Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#0E131F] border border-surfaceBorder rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Header Bar */}
              <div className="p-4 px-6 bg-[#080B11] border-b border-surfaceBorder flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-fire/10 border border-fire/30 text-fire text-xs font-mono">
                    {activePhoto.category}
                  </span>
                  <span className="text-sm font-bold text-white truncate max-w-md">
                    {activePhoto.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-1.5 rounded-lg bg-surface border border-surfaceBorder text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Viewport */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] max-h-[550px] overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="max-h-full max-w-full object-contain"
                />

                {/* Prev / Next Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-fire transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-fire transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Footer Details */}
              <div className="p-6 bg-[#0E131F] border-t border-surfaceBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-fire" />
                    <span>{activePhoto.location}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{activePhoto.specs}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-300 max-w-xl">
                    {activePhoto.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="#contact"
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="px-4 py-2 rounded-xl bg-fire hover:bg-red-600 text-white text-xs font-semibold shadow-lg shadow-fire/30 transition-all"
                  >
                    Inquire About This Installation
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
