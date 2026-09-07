'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Sun, Moon, CloudFog, CloudRain, Sparkles } from 'lucide-react';

export function AtmosphereControls() {
  const {
    hasEnteredStadium,
    timeOfDay,
    toggleTimeOfDay,
    weather,
    setWeather,
    isMatchDay,
    toggleMatchDay,
  } = usePortfolio();

  if (!hasEnteredStadium) return null;

  return (
    <div className="fixed bottom-4 left-4 z-30 pointer-events-auto hidden sm:flex items-center gap-1.5 bg-[#0D0D0D]/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#262626] shadow-xl text-white select-none">
      {/* Day / Night Toggle */}
      <button
        onClick={toggleTimeOfDay}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
          timeOfDay === 'night'
            ? 'bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/40'
            : 'bg-white text-[#050505]'
        }`}
        title="Toggle Stadium Day / Night Lighting"
      >
        {timeOfDay === 'night' ? (
          <>
            <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>NIGHT</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>DAY</span>
          </>
        )}
      </button>

      {/* Match Day Mode Button */}
      <button
        onClick={toggleMatchDay}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
          isMatchDay
            ? 'bg-[#D4AF37] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.6)] animate-pulse'
            : 'bg-[#171717] text-slate-300 hover:text-white border border-[#262626]'
        }`}
        title="Activate Full Match Day Stadium Atmosphere"
      >
        <Sparkles className="w-3.5 h-3.5 text-current" />
        <span>MATCH DAY</span>
      </button>

      {/* Weather Presets */}
      <button
        onClick={() => setWeather(weather === 'mist' ? 'clear' : 'mist')}
        className={`p-1.5 rounded-xl font-mono text-[10px] transition-all cursor-pointer ${
          weather === 'mist'
            ? 'bg-white text-[#050505]'
            : 'bg-[#171717] text-slate-400 hover:text-white'
        }`}
        title="Atmospheric Stadium Mist"
      >
        <CloudFog className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
