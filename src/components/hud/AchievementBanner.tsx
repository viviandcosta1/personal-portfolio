'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { Trophy, X, Sparkles } from 'lucide-react';

export function AchievementBanner() {
  const { recentAchievement, dismissAchievement } = usePortfolio();

  return (
    <AnimatePresence>
      {recentAchievement && (
        <motion.div
          initial={{ y: -80, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -80, scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-md w-[90%] sm:w-auto"
        >
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-[#ffd700] rounded-2xl p-4 shadow-[0_0_40px_rgba(255,215,0,0.35)] flex items-center justify-between gap-4">
            {/* Trophy Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd700] to-amber-600 flex items-center justify-center text-2xl shadow-lg shrink-0">
              {recentAchievement.icon}
            </div>

            {/* Achievement Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#ffd700] font-black uppercase">
                <Sparkles className="w-3 h-3 text-[#ffd700] animate-spin" />
                <span>ACHIEVEMENT UNLOCKED • +{recentAchievement.points} PTS</span>
              </div>
              <div className="text-sm sm:text-base font-black text-white uppercase tracking-wider font-sans">
                {recentAchievement.title}
              </div>
              <div className="text-xs text-slate-300 font-mono">
                {recentAchievement.description}
              </div>
            </div>

            {/* Dismiss Button */}
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
