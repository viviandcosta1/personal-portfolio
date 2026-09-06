'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { Play, FileText, Volume2, ShieldCheck, Sparkles } from 'lucide-react';

export function HeroOverlay() {
  const { hasEnteredStadium, enterStadium, openModal } = usePortfolio();

  if (hasEnteredStadium) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
        className="fixed inset-0 z-40 flex flex-col justify-between p-6 sm:p-12 pointer-events-auto bg-gradient-to-t from-[#040609]/95 via-[#040609]/60 to-[#040609]/80 backdrop-blur-sm"
      >
        {/* Top Broadcast Match Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff87]"></span>
            </span>
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#00ff87] uppercase font-bold">
              UEFA CHAMPIONS LEAGUE • PORTFOLIO ARENA
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#00ff87]" />
            <span>BELAGAVI, INDIA • BE CSE (8.4 CGPA)</span>
          </div>
        </motion.div>

        {/* Hero Cinematic Title Area */}
        <div className="max-w-4xl mx-auto text-center my-auto flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 text-[#00ff87] text-xs sm:text-sm font-mono tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#00ff87] animate-pulse" />
            <span>MATCH READY • SOFTWARE & AI/ML DEVELOPER</span>
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none font-sans"
          >
            VIVIAN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] via-[#00f0ff] to-white">
              DCOSTA
            </span>
          </motion.h1>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 text-lg sm:text-2xl font-light text-slate-300 font-mono tracking-wide"
          >
            {VIVIAN_DATA.personal.heroQuotes.map((quote, idx) => (
              <span key={idx} className="inline-block mx-2">
                {quote}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={enterStadium}
              className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00ff87] text-[#040609] font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#00ff87]/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,135,0.6)] cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current transition-transform group-hover:translate-x-1" />
              <span>ENTER THE STADIUM</span>
            </button>

            <button
              onClick={() => openModal('resume')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-base tracking-wider uppercase border border-slate-700 hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-5 h-5 text-[#00f0ff]" />
              <span>VIEW RESUME</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Audio & Controls Tip */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4"
        >
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#00ff87]" />
            <span>EXPERIENCE BEST WITH SOUND • CONTROLS: WASD / JOYSTICK TO EXPLORE</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openModal('profile')}
              className="hover:text-[#00ff87] transition-colors underline cursor-pointer"
            >
              SCOUTING REPORT
            </button>
            <span>•</span>
            <button
              onClick={() => openModal('contact')}
              className="hover:text-[#00ff87] transition-colors underline cursor-pointer"
            >
              STADIUM TUNNEL (CONTACT)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
