import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070B] border-t border-surfaceBorder text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surfaceLight border border-surfaceBorder p-1 flex items-center justify-center">
                <img src="/logo.png" alt="JS Enterprises Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                JS ENTERPRISES
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Certified life safety engineering and industrial fire suppression contractor. Delivering turnkey design, installation, testing, and periodic AMC across Chennai and Tamil Nadu.
            </p>
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              TAMIL NADU FIRE & RESCUE COMPLIANT
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Systems & Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {companyData.services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-fire transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#services" className="hover:text-fire transition-colors">
                  Annual Maintenance (AMC)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-fire transition-colors">
                  Hydrostatic Pressure Testing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About JSE</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Capabilities</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#lifecycle" className="hover:text-white transition-colors">Lifecycle Process</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Request Quote</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Contact Us
            </h4>
            
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-fire shrink-0 mt-0.5" />
                <span>{companyData.address.full}</span>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-fire shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919941646332" className="hover:text-white font-mono font-medium">
                    +91 99416 46332
                  </a>
                  <a href="tel:+919941453527" className="hover:text-white font-mono font-medium">
                    +91 99414 53527
                  </a>
                  <a href="tel:+919841179836" className="hover:text-white font-mono font-medium">
                    +91 98411 79836
                  </a>
                  <a href="tel:+914426561223" className="hover:text-white font-mono font-medium">
                    044-26561223
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-4 h-4 text-fire shrink-0" />
                <a href={`mailto:${companyData.email}`} className="hover:text-white underline decoration-fire/40">
                  {companyData.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-surfaceBorder/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} JS Enterprises. All rights reserved. Chennai, India.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-gray-400">Padi • Ambattur • Chennai Hub</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-surface border border-surfaceBorder text-gray-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
