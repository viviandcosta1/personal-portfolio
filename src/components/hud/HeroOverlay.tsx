'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { soundEngine } from '@/components/audio/SoundEngine';
import { Play, FileText, Sparkles, Shield, ChevronRight } from 'lucide-react';

export function HeroOverlay() {
  const { hasEnteredStadium, enterStadium, openModal } = usePortfolio();

  // Cinematic sequence phases:
  // 0: Complete Black & Heartbeat
  // 1: First light + Football rolling
  // 2: Phased Text 1 ("EVERY CAREER STARTS WITH A FIRST TOUCH.")
  // 3: Phased Text 2 ("VIVIAN D'COSTA" / SOFTWARE DEVELOPER)
  // 4: Phased Text 3 ("BUILD. PLAY. IMPROVE.") + Stadium Lights Flare & CTA
  const [cinematicPhase, setCinematicPhase] = useState(0);

  useEffect(() => {
    if (hasEnteredStadium) return;

    // Start subtle heartbeat audio loop
    soundEngine.startHeartbeatLoop();

    const t1 = setTimeout(() => {
      setCinematicPhase(1);
      soundEngine.playFloodlight(0);
    }, 1200);

    const t2 = setTimeout(() => {
      setCinematicPhase(2);
      soundEngine.playFloodlight(1);
    }, 2800);

    const t3 = setTimeout(() => {
      setCinematicPhase(3);
      soundEngine.playFloodlight(2);
    }, 5000);

    const t4 = setTimeout(() => {
      setCinematicPhase(4);
      soundEngine.playFloodlight(3);
    }, 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      soundEngine.stopHeartbeat();
    };
  }, [hasEnteredStadium]);

  if (hasEnteredStadium) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.4, ease: 'easeInOut' } }}
        className="fixed inset-0 z-40 flex flex-col justify-between p-6 sm:p-12 pointer-events-auto bg-[#050505] text-white select-none overflow-hidden"
      >
        {/* Cinematic Stadium Tunnel Background Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Tunnel Fog and Perspective Lines */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0D0D0D]/90 to-[#050505]" />
          
          {/* Glowing Pitch at End of Tunnel */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: cinematicPhase >= 1 ? 1 : 0.8,
              opacity: cinematicPhase >= 1 ? 0.35 : 0
            }}
            transition={{ duration: 2.0 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-t from-[#D4AF37]/20 via-white/15 to-transparent blur-3xl"
          />

          {/* Stadium Floodlight Cones */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-12 opacity-30">
            <div className={`w-32 h-96 bg-gradient-to-b from-white/40 to-transparent blur-2xl transform -rotate-12 transition-opacity duration-1000 ${cinematicPhase >= 1 ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`w-32 h-96 bg-gradient-to-b from-[#D4AF37]/40 to-transparent blur-2xl transform rotate-12 transition-opacity duration-1000 ${cinematicPhase >= 2 ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>

        {/* Top Broadcast Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: cinematicPhase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
            </span>
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#D4AF37] uppercase font-bold">
              CHAMPIONS NIGHT • STADIUM TUNNEL
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0D0D] border border-[#262626] text-xs font-mono text-slate-300">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>BELAGAVI, INDIA • SOFTWARE DEVELOPER</span>
          </div>
        </motion.div>

        {/* Center Main Stage Cinematic Typography */}
        <div className="relative z-10 max-w-4xl mx-auto text-center my-auto flex flex-col items-center">
          {/* Phase 1 & 2: First Touch Quote */}
          {cinematicPhase >= 2 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="mb-4"
            >
              <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#D4AF37] font-semibold border-b border-[#D4AF37]/30 pb-1">
                EVERY CAREER STARTS WITH A FIRST TOUCH.
              </span>
            </motion.div>
          )}

          {/* Phase 3 & 4: Player Name & Discipline */}
          {cinematicPhase >= 3 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none font-sans">
                <span className="text-white">VIVIAN </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-[#F5C542]">
                  D&apos;COSTA
                </span>
              </h1>

              <div className="mt-4 text-xs sm:text-base font-mono tracking-[0.25em] text-slate-300 uppercase">
                SOFTWARE DEVELOPER • FULL-STACK & AI/ML
              </div>
            </motion.div>
          )}

          {/* Phase 4: Slogan & CTAs */}
          {cinematicPhase >= 4 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center mt-8 w-full"
            >
              {/* Mentality Slogan */}
              <div className="text-sm sm:text-lg font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-8 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>BUILD. PLAY. IMPROVE.</span>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={enterStadium}
                  className="group relative w-full sm:w-auto px-10 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#050505] font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,255,255,0.8)] cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current transition-transform group-hover:translate-x-1" />
                  <span>ENTER THE STADIUM</span>
                </button>

                <button
                  onClick={() => openModal('resume')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] text-white font-bold text-base tracking-wider uppercase border border-[#262626] hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  <span>VIEW RESUME</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Status Ticker */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: cinematicPhase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4 border-t border-[#171717] pt-4"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[#D4AF37] font-bold">PRO-TIP:</span>
            <span>PRESS [7] ANYTIME TO TRIGGER MENTALITY MODE EASTER EGG</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openModal('profile')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              SCOUTING REPORT
            </button>
            <span>•</span>
            <button
              onClick={() => openModal('contact')}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              CONTACT TUNNEL
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
