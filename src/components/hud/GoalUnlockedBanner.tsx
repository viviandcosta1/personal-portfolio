'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { Sparkles, Trophy } from 'lucide-react';

export function GoalUnlockedBanner() {
  const { goalNotification } = usePortfolio();

  return (
    <AnimatePresence>
      {goalNotification && (
        <motion.div
          initial={{ y: -60, scale: 0.85, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -40, scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <div className="bg-[#050505]/95 backdrop-blur-2xl border-2 border-[#D4AF37] px-6 py-3 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.4)] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F5C542] p-0.5 flex items-center justify-center font-black text-[#050505] text-sm shrink-0">
              ⚽
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-white font-sans uppercase tracking-widest flex items-center gap-1.5">
                <span>GOAL!</span>
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              </div>
              <div className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase font-bold">
                {goalNotification}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
