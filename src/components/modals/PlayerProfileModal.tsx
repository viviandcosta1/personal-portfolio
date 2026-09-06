'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { X, Shield, Award, MapPin, GraduationCap, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

export function PlayerProfileModal() {
  const { activeModal, closeModal, openModal } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'profile') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'profile') return null;

  const report = VIVIAN_DATA.scoutingReport;
  const edu = VIVIAN_DATA.education;

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
              OFFICIAL SCOUTING DOSSIER
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ultimate Team Style Player Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[320px] rounded-3xl p-1 bg-gradient-to-b from-[#ffd700] via-[#00ff87] to-cyan-500 shadow-[0_0_40px_rgba(255,215,0,0.3)]">
              <div className="bg-[#0b0f19] rounded-[22px] p-6 text-white flex flex-col items-center">
                <div className="w-full flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-5xl font-black font-sans tracking-tight text-[#ffd700]">
                      {report.overallRating}
                    </div>
                    <div className="text-xs font-mono font-bold tracking-widest text-slate-300">
                      DEV • #10
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-[#00ff87] font-bold">
                      INDIA 🇮🇳
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      DAYLINK TECH
                    </div>
                  </div>
                </div>

                <div className="my-6 text-center">
                  <div className="text-2xl font-black tracking-tight uppercase font-sans">
                    {report.player}
                  </div>
                  <div className="text-xs font-mono text-[#00ff87] mt-1 font-bold">
                    {report.position}
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono border-t border-slate-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">PAC (SPEED):</span>
                    <span className="font-bold text-white">{report.pace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DRI (CODE):</span>
                    <span className="font-bold text-white">{report.dribbling}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SHO (ACCURACY):</span>
                    <span className="font-bold text-white">{report.shooting}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DEF (TESTING):</span>
                    <span className="font-bold text-white">{report.defending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PAS (APIs):</span>
                    <span className="font-bold text-white">{report.passing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PHY (UPTIME):</span>
                    <span className="font-bold text-white">{report.physical}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Attributes & Academic Base */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
                SCOUTING REPORT & ATTRIBUTES
              </h2>
              <p className="text-slate-300 font-mono text-xs sm:text-sm mt-2 leading-relaxed">
                {report.scoutingNotes}
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                CORE TECHNICAL PERFORMANCE SCORES:
              </div>
              {report.attributes.map(attr => (
                <div key={attr.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-white">{attr.name}</span>
                    <span className="text-[#00ff87]">
                      {attr.score} / {attr.max}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-[#00ff87] to-[#00f0ff] rounded-full ${attr.fill}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ffd700]">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <div className="text-sm font-bold text-white font-sans">
                {edu.degree}
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>{edu.institution}</span>
                <span className="text-[#00ff87] font-bold">CGPA: {edu.cgpa}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  closeModal();
                  openModal('resume');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer text-center"
              >
                VIEW FULL RESUME
              </button>
              <button
                onClick={() => {
                  closeModal();
                  openModal('contact');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#00ff87] hover:bg-[#00ff87]/90 text-slate-950 font-mono text-xs font-black uppercase transition-colors cursor-pointer text-center"
              >
                START COLLABORATION
              </button>
            </div>
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
