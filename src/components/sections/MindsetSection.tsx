'use client';

import React from 'react';
import { Target, Zap, TrendingUp, Sparkles } from 'lucide-react';

export function MindsetSection() {
  const pillars = [
    {
      title: 'DISCIPLINE',
      quote: 'Consistency in system architecture builds reliable production platforms.',
      icon: Target,
    },
    {
      title: 'PRECISION',
      quote: 'Eliminate friction, optimize latency, and write modular typed code.',
      icon: Zap,
    },
    {
      title: 'EVOLUTION',
      quote: 'Continuously iterate, learn emerging technologies, and refine performance.',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-28 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#F7F3EC] relative overflow-hidden">
      
      {/* Subtle Pitch Geometry Illustration Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none text-[#6B4F3A]/[0.04]"
        viewBox="0 0 1000 600"
        fill="none"
      >
        <rect x="50" y="50" width="900" height="500" rx="20" stroke="currentColor" strokeWidth="2" />
        <line x1="500" y1="50" x2="500" y2="550" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="500" cy="300" r="120" stroke="currentColor" strokeWidth="2" />
        <circle cx="500" cy="300" r="6" fill="#B89452" opacity="0.4" />
        <rect x="50" y="180" width="180" height="240" stroke="currentColor" strokeWidth="1.5" />
        <rect x="770" y="180" width="180" height="240" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B89452] mb-6 block">
          // 05 · PHILOSOPHY &amp; MENTALITY
        </span>

        {/* Sequential Editorial Words */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-10 my-8">
          <span className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#2B211B] uppercase tracking-tight">
            PLAY.
          </span>
          <span className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#6B4F3A] uppercase tracking-tight">
            BUILD.
          </span>
          <span className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#B89452] italic uppercase tracking-tight font-light">
            IMPROVE.
          </span>
        </div>

        {/* Mindset Statement */}
        <p className="text-base sm:text-xl text-[#75685C] max-w-2xl mx-auto font-medium leading-relaxed mb-16">
          A developer mindset inspired by discipline, consistency, and continuous improvement — translating elite preparation into resilient digital engineering.
        </p>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="luxury-card p-6 rounded-2xl bg-[#FFFDF9] border border-[#DED3C5]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#F7F3EC] flex items-center justify-center text-[#B89452]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#8C7D70]">
                    #0{idx + 1}
                  </span>
                </div>
                <h4 className="font-display font-bold text-lg text-[#2B211B] uppercase tracking-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#75685C] leading-relaxed">
                  {item.quote}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
