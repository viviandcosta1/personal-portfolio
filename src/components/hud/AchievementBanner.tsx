'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { Sparkles, Trophy, X } from 'lucide-react';

export function AchievementBanner() {
  const { recentAchievement, dismissAchievement } = usePortfolio();

  return (
    <AnimatePresence>
      {recentAchievement && (
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -60, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none"
        >
          <div className="bg-[#0D0D0D]/95 backdrop-blur-2xl border-2 border-[#D4AF37] px-5 py-3.5 rounded-2xl shadow-[0_0_35px_rgba(212,175,55,0.35)] flex items-center gap-4 text-white max-w-sm sm:max-w-md">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F5C542] text-[#050505] flex items-center justify-center text-xl shrink-0 shadow-md">
              {recentAchievement.icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  ACHIEVEMENT UNLOCKED (+{recentAchievement.points} PTS)
                </span>
              </div>
              <div className="text-sm font-black text-white font-sans uppercase">
                {recentAchievement.title}
              </div>
              <div className="text-xs font-mono text-slate-300 line-clamp-1">
                {recentAchievement.description}
              </div>
            </div>

            <button
              onClick={dismissAchievement}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
