'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';
import { soundEngine } from '@/components/audio/SoundEngine';
import { X, Send, Mail, Phone, MapPin, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';

export function ContactModal() {
  const { activeModal, closeModal } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'contact') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'contact') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playGoal();
    setSubmitted(true);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen"
    >
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-[#00ff87]/50 rounded-3xl shadow-[0_0_60px_rgba(0,255,135,0.25)] p-5 sm:p-8 my-auto overflow-hidden">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={closeModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#00ff87]" />
              <span>BACK TO STADIUM</span>
            </button>
            <span className="hidden sm:inline-flex text-xs font-mono font-bold text-[#00ff87] uppercase items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/40">
              <Sparkles className="w-3.5 h-3.5" />
              STADIUM EXIT TUNNEL
            </span>
          </div>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 rounded-xl bg-slate-800/60"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-sans">
            THE NEXT MATCH STARTS HERE.
          </h2>
          <p className="text-slate-300 font-mono text-sm sm:text-base mt-1">
            Let&apos;s build high-impact software, AI automation pipelines, or full-stack products together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-[#00ff87] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT EMAIL</div>
                <a
                  href={`mailto:${VIVIAN_DATA.personal.email}`}
                  className="text-xs sm:text-sm font-bold text-white hover:text-[#00ff87] font-mono truncate block"
                >
                  {VIVIAN_DATA.personal.email}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 text-[#00f0ff] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">PHONE / WHATSAPP</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono">
                  {VIVIAN_DATA.personal.phone}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-[#ffd700] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">LOCATION</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono">
                  {VIVIAN_DATA.personal.location}
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={VIVIAN_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/60 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4 text-[#00a0dc]" />
                <span>LINKEDIN</span>
              </a>
              <a
                href={VIVIAN_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-[#00ff87] text-[#00ff87] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-sans uppercase">
                  MESSAGE TRANSMITTED!
                </h3>
                <p className="text-xs font-mono text-slate-400 max-w-sm">
                  Thank you for reaching out. Vivian will review your message and respond directly via email.
                </p>
                <a
                  href={`mailto:${VIVIAN_DATA.personal.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                  className="mt-2 text-xs font-mono text-[#00ff87] underline"
                >
                  Or click here to send directly via mail client
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Hiring Manager"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-[#00ff87]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. manager@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-[#00ff87]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">
                    OPPORTUNITY / SUBJECT
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Full-Stack Role / AI Project Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-[#00ff87]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">
                    MESSAGE / SCOUTING BRIEF
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your vision, technical requirements, or team..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-[#00ff87] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00ff87] hover:bg-[#00ff87]/90 text-slate-950 font-black text-xs sm:text-sm font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#00ff87]/20"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00ff87]" />
            <span>RETURN TO 3D STADIUM ARENA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
