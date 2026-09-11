'use client';

import React from 'react';
import { Cpu, Zap, Activity, Code2, Sparkles } from 'lucide-react';

export function HeroAbstractGraphic() {
  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none group">
      {/* Outer Pitch Geometry Frame */}
      <div className="absolute inset-0 rounded-3xl border border-[#E8E8E8] bg-gradient-to-br from-[#FFFFFF] via-[#FAFAF8] to-[#F4F4F1] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 group-hover:border-[#C8A951]/50 group-hover:shadow-[0_25px_60px_-15px_rgba(200,169,81,0.12)]">
        
        {/* Subtle Pitch Grid Pattern */}
        <div className="absolute inset-0 pitch-lines-bg opacity-70" />

        {/* Tactical Pitch Geometry (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full text-[#111111]/15"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pitch Outer Touchline */}
          <rect x="30" y="30" width="440" height="440" rx="12" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Halfway Line */}
          <line x1="30" y1="250" x2="470" y2="250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          
          {/* Center Circle */}
          <circle cx="250" cy="250" r="75" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="4" fill="#C8A951" />

          {/* Golden Center Arc Accent */}
          <circle cx="250" cy="250" r="95" stroke="#C8A951" strokeWidth="1" strokeDasharray="6 8" opacity="0.6" />

          {/* Top Penalty Area */}
          <rect x="140" y="30" width="220" height="100" stroke="currentColor" strokeWidth="1.5" />
          <rect x="190" y="30" width="120" height="40" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="250" cy="95" r="3" fill="#111111" />
          <path d="M 210 130 A 40 40 0 0 0 290 130" stroke="currentColor" strokeWidth="1.2" />

          {/* Bottom Penalty Area */}
          <rect x="140" y="370" width="220" height="100" stroke="currentColor" strokeWidth="1.5" />
          <rect x="190" y="430" width="120" height="40" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="250" cy="405" r="3" fill="#111111" />
          <path d="M 210 370 A 40 40 0 0 1 290 370" stroke="currentColor" strokeWidth="1.2" />

          {/* Corner Arcs */}
          <path d="M 30 50 A 20 20 0 0 0 50 30" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 450 30 A 20 20 0 0 0 470 50" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 30 450 A 20 20 0 0 1 50 470" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 450 470 A 20 20 0 0 1 470 450" stroke="currentColor" strokeWidth="1.2" />

          {/* Tactical Vector Paths / Passing Lines */}
          <path
            d="M 100 380 Q 250 250 400 120"
            stroke="#3157A4"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.5"
          />
          <path
            d="M 120 120 Q 250 220 380 380"
            stroke="#C8A951"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.6"
          />
        </svg>

        {/* Large Subtle Editorial Number "07" Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display font-black text-[180px] sm:text-[220px] text-[#111111]/[0.04] leading-none select-none tracking-tighter transform -translate-y-2">
            07
          </span>
        </div>

        {/* Technical Data Annotations */}
        <div className="absolute top-5 left-5 font-mono text-[9px] uppercase tracking-widest text-[#666666] bg-[#FFFFFF]/80 backdrop-blur-sm border border-[#E8E8E8] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SYS.LATENCY: &lt;50MS</span>
        </div>

        <div className="absolute top-5 right-5 font-mono text-[9px] uppercase tracking-widest text-[#666666] bg-[#FFFFFF]/80 backdrop-blur-sm border border-[#E8E8E8] px-2.5 py-1 rounded-md shadow-sm">
          <span>MATCH DAY #2026</span>
        </div>

        {/* Modern Interactive Floating Cards */}
        {/* Top-Right Floating Metric */}
        <div className="absolute top-20 right-6 bg-[#FFFFFF] border border-[#E8E8E8] p-3 rounded-xl shadow-lg transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#3157A4]/10 text-[#3157A4] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-[#666666] leading-none">Engineering</p>
              <p className="text-xs font-bold text-[#111111] mt-0.5">High Performance</p>
            </div>
          </div>
        </div>

        {/* Bottom-Left Floating Metric */}
        <div className="absolute bottom-20 left-6 bg-[#FFFFFF] border border-[#E8E8E8] p-3 rounded-xl shadow-lg transform transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#C8A951]/15 text-[#C8A951] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-[#666666] leading-none">Architecture</p>
              <p className="text-xs font-bold text-[#111111] mt-0.5">AI/ML &amp; Full Stack</p>
            </div>
          </div>
        </div>

        {/* Bottom Center Tactical Tag */}
        <div className="absolute bottom-5 inset-x-0 mx-auto w-fit flex items-center gap-3 bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E8E8E8] px-4 py-1.5 rounded-full shadow-sm">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#111111]">
            <Code2 className="w-3.5 h-3.5 text-[#C8A951]" />
            <span>Clean Architecture</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-[#E8E8E8]"></span>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#111111]">
            <Activity className="w-3.5 h-3.5 text-[#3157A4]" />
            <span>Fast Delivery</span>
          </div>
        </div>

      </div>
    </div>
  );
}
