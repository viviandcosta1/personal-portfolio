'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { Sparkles, Crown } from 'lucide-react';

export function MentalityModeOverlay() {
  const { isMentalityModeActive } = usePortfolio();

  return (
    <AnimatePresence>
      {isMentalityModeActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] p-6 select-none pointer-events-none"
        >
          {/* Background Gold Radial Flare */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.4, 0.25] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#D4AF37]/30 to-[#F5C542]/20 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Crown Icon */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>EASTER EGG #07 DISCOVERED</span>
            </motion.div>

            {/* Giant Gold 07 */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1 className="text-8xl sm:text-9xl md:text-[14rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D4AF37] to-[#8C6D1F] leading-none font-sans drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]">
                07
              </h1>
            </motion.div>

            {/* Mentality Statement */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="mt-4 flex flex-col items-center gap-2"
            >
              <div className="text-2xl sm:text-4xl font-black text-white uppercase tracking-widest font-sans">
                MENTALITY MODE: ON
              </div>
              <div className="text-sm sm:text-base font-mono text-[#D4AF37] tracking-widest uppercase">
                &ldquo;DISCIPLINE BUILDS CONSISTENCY.&rdquo;
              </div>
            </motion.div>

            {/* Pulse Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-400"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span>CHAMPIONSHIP AURA ACTIVE • RESUMING ARENA</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
