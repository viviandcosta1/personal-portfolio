'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { X, Shield, Award, MapPin, GraduationCap, Sparkles, CheckCircle2, ArrowLeft, ArrowRight, Zap } from 'lucide-react';

export function PlayerProfileModal() {
  const { activeModal, closeModal, openModal } = usePortfolio();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'profile') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -12);
    setRotateY(((x - centerX) / centerX) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

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
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#0D0D0D] via-[#050505] to-[#050505] border-2 border-[#D4AF37]/60 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.25)] p-5 sm:p-8 my-auto overflow-hidden text-white">
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
              OFFICIAL SCOUTING PLAYER CARD
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Interactive Scouting Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-[320px] rounded-3xl p-1 bg-gradient-to-b from-[#FFFFFF] via-[#D4AF37] to-[#171717] shadow-[0_0_50px_rgba(212,175,55,0.35)] cursor-pointer select-none"
            >
              <div className="bg-[#0D0D0D] rounded-[22px] p-6 text-white flex flex-col items-center relative overflow-hidden">
                {/* Gold light sweep overlay */}
                <div className="absolute inset-0 gold-sweep pointer-events-none" />

                {/* Top Badge Info */}
                <div className="w-full flex items-start justify-between border-b border-[#262626] pb-3">
                  <div>
                    <div className="text-4xl font-black font-sans tracking-tight text-white">
                      #07
                    </div>
                    <div className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                      DEV &bull; ELITE
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-white font-bold">
                      INDIA 🇮🇳
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      DAYLINK TECH
                    </div>
                  </div>
                </div>

                {/* Player Identity */}
                <div className="my-6 text-center">
                  <div className="text-2xl sm:text-3xl font-black tracking-tight uppercase font-sans text-white">
                    {report.player}
                  </div>
                  <div className="text-xs font-mono text-[#D4AF37] mt-1 font-bold tracking-widest">
                    {report.position}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {report.role}
                  </div>
                </div>

                {/* Core Scouting Attributes */}
                <div className="w-full grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs font-mono border-t border-[#262626] pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400">FOOT:</span>
                    <span className="font-bold text-white uppercase">{report.foot}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400">ROLE:</span>
                    <span className="font-bold text-[#D4AF37] uppercase">FULL-STACK</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400">AI / ML:</span>
                    <span className="font-bold text-white uppercase">ADVANCED</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400">STATUS:</span>
                    <span className="font-bold text-[#D4AF37] uppercase text-[10px]">AVAILABLE</span>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-4 pt-3 border-t border-[#171717] w-full text-center">
                  <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">
                    &ldquo;BUILD. PLAY. IMPROVE.&rdquo;
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Attributes & Profile Details */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
                TECHNICAL ATTRIBUTES & SCOUTING DOSSIER
              </h2>
              <p className="text-slate-300 font-mono text-xs sm:text-sm mt-1.5 leading-relaxed">
                {report.scoutingNotes}
              </p>
            </div>

            {/* Technical Attribute Cards */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-bold text-[#D4AF37] tracking-wider uppercase">
                CORE ATTRIBUTES MATRIX:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {report.technicalAttributes.map(attr => (
                  <div
                    key={attr.name}
                    className="p-3 rounded-2xl bg-[#0D0D0D] border border-[#262626] flex flex-col gap-1 hover:border-[#D4AF37]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-sans uppercase">
                        {attr.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#171717] text-[#D4AF37] border border-[#262626]">
                        {attr.proficiency}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 leading-normal">
                      {attr.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Foundation Card */}
            <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#262626] flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37]">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <div className="text-sm font-bold text-white font-sans">
                {edu.degree}
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>{edu.institution}</span>
                <span className="text-[#D4AF37] font-bold">CGPA: {edu.cgpa}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  closeModal();
                  openModal('resume');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#171717] hover:bg-[#262626] text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer text-center"
              >
                VIEW FULL RESUME
              </button>
              <button
                onClick={() => {
                  closeModal();
                  openModal('contact');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#050505] font-mono text-xs font-black uppercase transition-colors cursor-pointer text-center"
              >
                START COLLABORATION
              </button>
            </div>
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
