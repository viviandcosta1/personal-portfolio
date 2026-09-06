'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA, SkillCategory } from '@/data/portfolioData';
import { X, Layers, CheckCircle2, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';

export function SkillsModal() {
  const { activeModal, closeModal, selectedLocker, setSelectedLocker } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'skills') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'skills' || !selectedLocker) return null;

  const lockers = VIVIAN_DATA.lockers;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen"
    >
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-[#00ff87]/50 rounded-3xl shadow-[0_0_60px_rgba(0,255,135,0.2)] p-5 sm:p-8 my-auto overflow-hidden">
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
              LOCKER #{selectedLocker.lockerNumber} • TECH GEAR
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

        {/* Locker Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800">
          {lockers.map(l => (
            <button
              key={l.id}
              onClick={() => setSelectedLocker(l)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedLocker.id === l.id
                  ? 'bg-[#00ff87] text-slate-950 shadow-[0_0_15px_rgba(0,255,135,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>LOCKER #{l.lockerNumber}</span>
              <span className="opacity-75">• {l.name}</span>
            </button>
          ))}
        </div>

        {/* Locker Details */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
              {selectedLocker.name}
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedLocker.skills.map(skill => (
              <div
                key={skill.name}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2 transition-all hover:border-[#00ff87]/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-white font-sans">{skill.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-[#00ff87] border border-emerald-800 text-[10px] font-mono font-bold uppercase">
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00ff87] shrink-0" />
            <span>
              All technologies have been used in production environments, enterprise internal applications, or AI/ML pipelines.
            </span>
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
