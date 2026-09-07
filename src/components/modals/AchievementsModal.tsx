'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ACHIEVEMENTS } from '@/data/achievementsData';
import { X, Trophy, CheckCircle2, Lock, Sparkles, ArrowLeft } from 'lucide-react';

export function AchievementsModal() {
  const { activeModal, closeModal, unlockedAchievements } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'achievements') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'achievements') return null;

  const totalPoints = ACHIEVEMENTS.reduce(
    (acc, a) => (unlockedAchievements.includes(a.id) ? acc + a.points : acc),
    0
  );
  const maxPoints = ACHIEVEMENTS.reduce((acc, a) => acc + a.points, 0);

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
              <Trophy className="w-3.5 h-3.5" />
              CHAMPIONSHIP ACHIEVEMENTS & DISCOVERIES
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#171717] pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
              PORTFOLIO ACHIEVEMENTS
            </h2>
            <p className="text-slate-400 font-mono text-xs sm:text-sm mt-1">
              Explore the stadium pitch, score goals, open tech lockers, and uncover the hidden #07 Mentality Mode.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[#0D0D0D] border border-[#262626] text-right">
            <div className="text-[10px] font-mono text-slate-400">TOTAL SCORE</div>
            <div className="text-xl font-black text-[#D4AF37] font-mono">
              {totalPoints} / {maxPoints} PTS
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
          {ACHIEVEMENTS.map(ach => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-[#0D0D0D] border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                    : 'bg-[#050505] border-[#171717] opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-[#D4AF37] to-[#F5C542] text-[#050505] shadow-md'
                      : 'bg-[#171717] border border-[#262626] text-slate-600'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-slate-500" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">
                      +{ach.points} PTS
                    </span>
                    {isUnlocked && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-white font-bold">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                        UNLOCKED
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white uppercase font-sans">
                    {ach.title}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {ach.description}
                  </div>
                </div>
              </div>
            );
          })}
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
