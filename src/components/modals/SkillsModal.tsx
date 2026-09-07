'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA, LockerItem } from '@/data/portfolioData';
import { X, Layers, CheckCircle2, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';

export function SkillsModal() {
  const { activeModal, closeModal, selectedTechLocker, setSelectedTechLocker } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'skills') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'skills') return null;

  const lockers = VIVIAN_DATA.techLockers;
  const currentLocker = selectedTechLocker || lockers[0];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen text-white"
    >
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#0D0D0D] via-[#050505] to-[#050505] border-2 border-[#D4AF37]/60 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.25)] p-5 sm:p-8 my-auto overflow-hidden">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#171717]">
          <div className="flex items-center gap-2">
            <button
              onClick={closeModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] border border-[#262626] text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
              <span>BACK TO STADIUM</span>
            </button>
            <span className="hidden sm:inline-flex text-xs font-mono font-bold text-[#D4AF37] uppercase items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40">
              <Sparkles className="w-3.5 h-3.5" />
              LOCKER ROOM #{currentLocker.number} &bull; {currentLocker.tech}
            </span>
          </div>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 rounded-xl bg-[#171717]"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Locker Selector Tabs (10 Lockers: 07 to 16) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[#171717]">
          {lockers.map(l => (
            <button
              key={l.number}
              onClick={() => setSelectedTechLocker(l)}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                currentLocker.number === l.number
                  ? 'bg-white text-[#050505] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-[#0D0D0D] text-slate-400 hover:text-white border border-[#262626]'
              }`}
            >
              <span className="text-[#D4AF37]">#{l.number < 10 ? `0${l.number}` : l.number}</span>
              <span>{l.tech}</span>
            </button>
          ))}
        </div>

        {/* Locker Details */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#171717] pb-3">
            <div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase">
                {currentLocker.category} &bull; LOCKER #{currentLocker.number < 10 ? `0${currentLocker.number}` : currentLocker.number}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans mt-0.5">
                {currentLocker.tech}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-mono font-bold uppercase w-fit">
              PROFICIENCY: {currentLocker.level}
            </span>
          </div>

          {/* Description & Analogy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#262626] flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase">
                TECHNICAL CAPABILITY:
              </span>
              <p className="text-xs font-mono text-slate-300 leading-relaxed">
                {currentLocker.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#262626] flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase">
                MATCH ROLE ANALOGY:
              </span>
              <p className="text-xs font-mono text-slate-300 leading-relaxed">
                {currentLocker.footballAnalogy}
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#171717] text-xs font-mono text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              All technologies have been used in production environments, enterprise business platforms, or AI/ML pipelines.
            </span>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-[#171717] flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] text-white font-mono text-xs font-bold border border-[#262626] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>RETURN TO 3D STADIUM ARENA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
