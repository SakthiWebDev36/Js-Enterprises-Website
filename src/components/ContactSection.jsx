import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert, CheckCircle, RefreshCw } from 'lucide-react';
import { companyData } from '../data/companyData';

// Backend API base URL — points to local dev server; override in production with env var
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

export default function ContactSection({ onFormStart, onFormSuccess, onFormError }) {
// State for form fields
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'Fire Extinguishers',
    scope: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.scope.trim()) {
      setErrorMsg('Please complete all required fields before dispatching.');
      return;
    }

    if (onFormStart) onFormStart();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${API_BASE}/api/consultations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
          scope: formData.scope.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed. Please try again.');
      }

      // Real success — trigger Figma Success Screen with server-returned data
      onFormSuccess({
        refId: result.data.refId,
        name: result.data.name,
        company: result.data.company || 'Not Specified',
        phone: result.data.phone,
        email: result.data.email,
        service: result.data.service,
        scope: result.data.scope,
        timestamp: new Date(result.data.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      });

    } catch (err) {
      // Network failure or server error → Figma Error Screen
      onFormError({
        errorType: 'NETWORK_ERROR',
        message: err.message || 'Unable to reach the server. Please try again or call us directly.',
        retryPayload: formData,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-surfaceBorder/60 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surfaceBorder text-xs font-mono text-fire mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-fire"></span>
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let's Discuss Your Fire Safety Requirements.
          </h2>
          <p className="mt-4 text-base text-gray-300">
            Our certified engineering team is available for on-site premises audits, AutoCAD compliance blueprints, and turnkey equipment quotes.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Official Contact & Headquarters Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-surface border border-surfaceBorder space-y-3">
              <div className="flex items-center gap-3 text-white font-bold text-base">
                <MapPin className="w-5 h-5 text-fire shrink-0" />
                <span>Headquarters & Engineering Base</span>
              </div>
              <p className="text-sm text-gray-300 pl-8 leading-relaxed font-normal">
                {companyData.address.full}
              </p>
            </div>

            {/* Direct Phone Numbers Card */}
            <div className="p-6 rounded-2xl bg-surface border border-surfaceBorder space-y-4">
              <div className="flex items-center gap-3 text-white font-bold text-base">
                <Phone className="w-5 h-5 text-fire shrink-0" />
                <span>Direct Telephony Lines</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
                {companyData.phones.map((p) => (
                  <a
                    key={p.display}
                    href={`tel:${p.value}`}
                    className="p-3 rounded-xl bg-surfaceLight border border-surfaceBorder hover:border-fire/60 text-xs font-mono text-gray-200 hover:text-white flex flex-col justify-between transition-all group"
                  >
                    <span className="text-[10px] text-gray-400 group-hover:text-fire transition-colors">
                      {p.label}
                    </span>
                    <span className="font-semibold text-sm mt-1 text-white">
                      {p.display}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Email & Operation Hours */}
            <div className="p-6 rounded-2xl bg-surface border border-surfaceBorder space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-fire shrink-0" />
                <div>
                  <span className="text-xs font-mono text-gray-400 block">OFFICIAL EMAIL</span>
                  <a
                    href={`mailto:${companyData.email}`}
                    className="text-sm font-semibold text-white hover:text-fire transition-colors underline decoration-fire/40 underline-offset-4"
                  >
                    {companyData.email}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-surfaceBorder/60 flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs text-gray-300 font-mono">
                  {companyData.operationHours}
                </div>
              </div>
            </div>

            {/* Operational Desk Status */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs font-mono text-emerald-300 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span>CHENNAI OPERATIONS DESK: ON-DUTY FOR SITE VISITS</span>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-surface border border-surfaceBorder shadow-2xl relative">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">
                  Request an Engineering Consultation
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-mono">
                  Fill in your details below. Our technical desk responds within 2 business hours.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-700/60 text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">
                      Full Name <span className="text-fire">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. R. Subramanian"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080B11] border border-surfaceBorder focus:border-fire focus:ring-1 focus:ring-fire outline-none text-sm text-white placeholder-gray-600 transition-all"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">
                      Company / Facility Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Apex Industrial Works"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080B11] border border-surfaceBorder focus:border-fire focus:ring-1 focus:ring-fire outline-none text-sm text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">
                      Contact Phone <span className="text-fire">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98400 00000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080B11] border border-surfaceBorder focus:border-fire focus:ring-1 focus:ring-fire outline-none text-sm text-white placeholder-gray-600 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">
                      Email Address <span className="text-fire">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="contact@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080B11] border border-surfaceBorder focus:border-fire focus:ring-1 focus:ring-fire outline-none text-sm text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">
                    Primary Service Requirement <span className="text-fire">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B11] border border-surfaceBorder focus:border-fire focus:ring-1 focus:ring-fire outline-none text-sm text-white transition-all"
                  >
                    <option value="Fire Extinguishers">Fire Extinguishers (Supply, Hydro-testing & Refilling)</option>
                    <option value="Fire Alarm Systems">Fire Alarm Systems (Conventional / Addressable)</option>
                    <option value="Fire Hydrant Systems">Fire Hydrant Systems (Risers, Pumps & Valves)</option>
                    <option value="Sprinkler Systems">Automatic Sprinkler Systems (Wet / Dry Arrays)</option>
                    <option value="Turnkey Life Safety AMC">Complete Turnkey Package / Annual Maintenance (AMC)</option>
                  </select>
                </div>

                {/* Project Scope */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">
                    Project Scope / Facility Dimensions <span className="text-fire">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="scope"
                    required
                    placeholder="Briefly describe facility type, square footage, building height, or specific compliance audit needed..."
                    value={formData.scope}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B11] border border-surfaceBorder focus:border-fire focus:ring-1 focus:ring-fire outline-none text-sm text-white placeholder-gray-600 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-fire hover:bg-red-600 disabled:opacity-50 text-white font-semibold text-sm shadow-xl shadow-fire/30 hover:shadow-fire/50 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting Consultation Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-500 font-mono pt-1">
                  Protected under industrial nondisclosure. Official dispatch response within 2 hours.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
