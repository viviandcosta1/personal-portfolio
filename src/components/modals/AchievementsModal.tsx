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
              TROPHY SHELF
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
              INTERACTIVE DISCOVERIES
            </h2>
            <p className="text-slate-400 font-mono text-xs sm:text-sm mt-1">
              Explore the stadium pitch, score goals, open tech lockers, and uncover hidden Easter eggs.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <div className="text-[10px] font-mono text-slate-400">TOTAL SCORE</div>
            <div className="text-xl font-black text-[#ffd700] font-mono">
              {totalPoints} / {maxPoints} PTS
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {ACHIEVEMENTS.map(ach => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-[#ffd700]/60 shadow-[0_0_20px_rgba(255,215,0,0.15)]'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-[#ffd700] to-amber-600 shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-600'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-slate-500" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#ffd700]">
                      +{ach.points} PTS
                    </span>
                    {isUnlocked && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#00ff87] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
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
