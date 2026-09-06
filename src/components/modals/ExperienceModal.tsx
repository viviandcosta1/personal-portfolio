'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA, Experience } from '@/data/portfolioData';
import { X, Trophy, Calendar, MapPin, CheckCircle2, Award, ArrowLeft } from 'lucide-react';

export function ExperienceModal() {
  const { activeModal, closeModal, selectedExperience, setSelectedExperience } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'experience') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'experience' || !selectedExperience) return null;

  const experiences = VIVIAN_DATA.experiences;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen"
    >
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-[#ffd700]/60 rounded-3xl shadow-[0_0_60px_rgba(255,215,0,0.25)] p-5 sm:p-8 my-auto overflow-hidden">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={closeModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#ffd700]" />
              <span>BACK TO STADIUM</span>
            </button>
            <span className="hidden sm:inline-flex text-xs font-mono font-bold text-[#ffd700] uppercase items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd700]/15 border border-[#ffd700]/40">
              <Trophy className="w-3.5 h-3.5" />
              CHAMPIONSHIP TROPHY ROOM
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

        {/* Trophy Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800">
          {experiences.map(exp => (
            <button
              key={exp.id}
              onClick={() => setSelectedExperience(exp)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedExperience.id === exp.id
                  ? 'bg-[#ffd700] text-slate-950 shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{exp.company}</span>
            </button>
          ))}
        </div>

        {/* Experience Content */}
        <div className="flex flex-col gap-6">
          {/* Role Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#ffd700] flex items-center gap-1.5 uppercase">
                  <Award className="w-4 h-4" />
                  {selectedExperience.trophyTitle}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
                {selectedExperience.role} @ {selectedExperience.company}
              </h2>
            </div>

            <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400">
              <span className="text-[#00ff87] font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {selectedExperience.period}
              </span>
              <span className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {selectedExperience.location}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="text-slate-300 font-mono text-sm leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {selectedExperience.summary}
          </div>

          {/* Responsibilities */}
          <div>
            <div className="text-xs font-mono font-bold text-[#00ff87] uppercase tracking-wider mb-3">
              KEY MATCH DELIVERABLES & RESPONSIBILITIES:
            </div>
            <div className="space-y-2.5">
              {selectedExperience.responsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00ff87] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              APPLIED TECHNOLOGIES & TOOLS:
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedExperience.techStack.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#ffd700]" />
            <span>RETURN TO 3D STADIUM ARENA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
