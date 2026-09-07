'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';

export function SectionChapterCard() {
  const { activeChapter } = usePortfolio();

  return (
    <AnimatePresence>
      {activeChapter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 pointer-events-none z-35 flex items-center justify-center select-none"
        >
          {/* Subtle Dark Vignette & Gold Atmospheric Flare */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />

          {/* Chapter Text Plate */}
          <div className="relative flex flex-col items-center text-center p-8 max-w-xl">
            {/* Number Pill */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="px-4 py-1 rounded-full bg-[#0D0D0D]/90 border border-[#D4AF37] text-xs font-mono font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              CHAPTER {activeChapter.number}
            </motion.div>

            {/* Chapter Title */}
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase font-sans text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              {activeChapter.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-3 text-xs sm:text-sm font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-semibold border-t border-[#D4AF37]/30 pt-2"
            >
              {activeChapter.subtitle}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
