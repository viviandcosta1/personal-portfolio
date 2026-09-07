'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { soundEngine } from '@/components/audio/SoundEngine';
import confetti from 'canvas-confetti';
import { Sparkles, Send, X, ArrowRight } from 'lucide-react';

export function OutroCinematic() {
  const { isOutroCinematicActive, closeOutroCinematic, openModal } = usePortfolio();

  if (!isOutroCinematicActive) return null;

  const handleLetsBuild = () => {
    soundEngine.playGoal();
    try {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FFFFFF', '#F5C542', '#050505']
      });
    } catch {}

    closeOutroCinematic();
    setTimeout(() => {
      openModal('contact');
    }, 400);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-12 bg-[#050505]/95 backdrop-blur-xl text-white select-none"
      >
        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button
            onClick={closeOutroCinematic}
            className="p-2.5 rounded-xl bg-[#0D0D0D] border border-[#262626] text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Exit Outro"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Outro Typography */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center my-auto">
          {/* Top Line */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs sm:text-sm font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-4"
          >
            FINAL WHISTLE
          </motion.div>

          {/* Slogans */}
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight font-sans leading-tight"
          >
            &ldquo;THE MATCH IS NEVER OVER.&rdquo;
          </motion.h2>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg sm:text-2xl font-mono text-slate-300 uppercase tracking-widest mt-4"
          >
            THERE&apos;S ALWAYS ANOTHER LEVEL.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-8 flex flex-col items-center gap-1"
          >
            <div className="text-xl sm:text-2xl font-black font-sans uppercase text-white">
              VIVIAN D&apos;COSTA
            </div>
            <div className="text-xs sm:text-sm font-mono text-[#D4AF37] tracking-widest uppercase">
              SOFTWARE DEVELOPER • FULL-STACK & AI/ML
            </div>
          </motion.div>

          {/* CTA [ LET'S BUILD ] */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mt-10"
          >
            <button
              onClick={handleLetsBuild}
              className="group px-10 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#050505] font-black text-lg tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span>LET&apos;S BUILD</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          CAMP NOU &bull; MADRID NIGHTS &bull; BUILT FOR PERFORMANCE
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
