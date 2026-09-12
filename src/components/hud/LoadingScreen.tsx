'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { Play } from 'lucide-react';

export function LoadingScreen() {
  const { hasEnteredStadium, enterStadium } = usePortfolio();
  const [progress, setProgress] = useState(7);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (hasEnteredStadium) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const jump = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + jump, 100);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [hasEnteredStadium]);

  if (hasEnteredStadium) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-[#050505] text-white select-none overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="font-mono text-xs tracking-widest text-[#D4AF37] uppercase font-bold">
              BOOTING VIVIAN DCOSTA PORTFOLIO OS v3.0
            </span>
          </div>
          <div className="font-mono text-xs text-slate-400">
            MADRID NIGHT ARENA
          </div>
        </div>

        {/* Center: Pitch Line Geometry Drawing & Percentage Counter */}
        <div className="my-auto flex flex-col items-center text-center max-w-lg mx-auto w-full">
          {/* Animated Pitch Vector SVG */}
          <div className="w-56 h-36 border-2 border-[#D4AF37]/50 rounded-2xl relative p-3 mb-8 overflow-hidden bg-[#081F12]/40 backdrop-blur-sm">
            {/* Center Circle & Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-white/40" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            </div>
            {/* Penalty boxes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-10 border-b border-x border-white/30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-10 border-t border-x border-white/30" />
          </div>

          {/* Large Monospace Percentage Counter */}
          <div className="text-6xl sm:text-8xl font-black font-mono tracking-tighter text-white">
            {progress < 10 ? `0${progress}%` : `${progress}%`}
          </div>

          <div className="mt-4 text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
            {progress < 100 ? 'INITIALIZING 3D ARENA & NEURAL PIPELINES...' : 'ALL SYSTEMS OPERATIONAL'}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs h-1.5 bg-[#171717] rounded-full mt-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-white via-[#D4AF37] to-[#F5C542]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Kick Off Button (Appears when ready) */}
          {isReady && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={enterStadium}
              className="mt-8 px-10 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#050505] font-black text-base tracking-widest uppercase flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(255,255,255,0.7)] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>KICK OFF &bull; ENTER ARENA</span>
            </motion.button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-[#171717] pt-4">
          <span>DISCIPLINE BUILDS CONSISTENCY</span>
          <span>PRESS [7] FOR MENTALITY MODE</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
