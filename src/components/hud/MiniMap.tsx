'use client';

import React from 'react';
import { usePortfolio, CameraZone } from '@/context/PortfolioContext';
import { X, Crosshair } from 'lucide-react';

export function MiniMap() {
  const { isMiniMapOpen, toggleMiniMap, ballPosition, focusZone } = usePortfolio();

  if (!isMiniMapOpen) return null;

  // Mini-map coordinate mapping:
  // 3D Pitch: X in [-26, 26], Z in [-38, 38]
  // Map dimensions: 220px wide, 320px high
  const mapW = 220;
  const mapH = 320;

  const [bx, , bz] = ballPosition;
  const dotX = ((bx + 26) / 52) * (mapW - 20) + 10;
  const dotY = ((bz + 38) / 76) * (mapH - 20) + 10;

  const pointsOfInterest: { id: CameraZone; name: string; x: number; y: number; color: string }[] = [
    { id: 'goals', name: 'PROJECTS', x: mapW / 2, y: 25, color: '#D4AF37' },
    { id: 'tactical', name: 'FORMATION', x: mapW - 35, y: 55, color: '#FFFFFF' },
    { id: 'trophies', name: 'TROPHIES', x: mapW - 25, y: mapH / 2, color: '#F5C542' },
    { id: 'lockers', name: 'LOCKERS', x: 25, y: mapH / 2, color: '#FFFFFF' },
    { id: 'controlroom', name: 'CONTROL ROOM', x: 35, y: mapH - 55, color: '#38BDF8' },
    { id: 'techOrbs', name: 'TECH ORBS', x: mapW / 2, y: 75, color: '#4ADE80' },
    { id: 'pitch', name: 'CENTER', x: mapW / 2, y: mapH / 2, color: '#FFFFFF' },
    { id: 'tunnel', name: 'EXIT TUNNEL', x: mapW / 2, y: mapH - 25, color: '#D4AF37' },
  ];

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 pointer-events-auto bg-[#0D0D0D]/95 backdrop-blur-xl border border-[#262626] p-4 rounded-2xl shadow-2xl flex flex-col gap-3 max-w-[260px] text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#171717] pb-2">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-[#D4AF37] animate-spin" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
            TACTICAL RADAR
          </span>
        </div>
        <button
          onClick={toggleMiniMap}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Radar Canvas Pitch */}
      <div
        className="relative bg-[#081F12] rounded-xl border border-[#171717] overflow-hidden mx-auto"
        style={{ width: `${mapW}px`, height: `${mapH}px` }}
      >
        {/* Pitch Stripes */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-15 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`h-full ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`} />
          ))}
        </div>

        {/* Pitch Lines */}
        <div className="absolute inset-2 border border-white/30 rounded-sm pointer-events-none" />
        {/* Halfway Line */}
        <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 border-t border-white/30 pointer-events-none" />
        {/* Center Circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/30 rounded-full pointer-events-none" />

        {/* Penalty Areas */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-12 border-b border-x border-white/30 pointer-events-none" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-12 border-t border-x border-white/30 pointer-events-none" />

        {/* Clickable POI Markers */}
        {pointsOfInterest.map(poi => (
          <button
            key={poi.id}
            onClick={() => focusZone(poi.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${poi.x}px`, top: `${poi.y}px` }}
            title={`Fast travel to ${poi.name}`}
          >
            <span
              className="flex h-3 w-3 rounded-full relative"
              style={{ backgroundColor: poi.color }}
            >
              <span
                className="animate-ping absolute inset-0 rounded-full opacity-75"
                style={{ backgroundColor: poi.color }}
              />
            </span>
            <span className="hidden group-hover:block absolute left-4 top-1/2 -translate-y-1/2 bg-[#050505] border border-[#262626] text-[9px] font-mono text-white px-1.5 py-0.5 rounded whitespace-nowrap z-10">
              {poi.name}
            </span>
          </button>
        ))}

        {/* Real-time Ball Position Indicator */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
          style={{ left: `${dotX}px`, top: `${dotY}px` }}
        >
          <div className="w-4 h-4 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_#D4AF37]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-[10px] font-mono text-slate-400 text-center">
        CLICK ANY POINT TO FAST TRAVEL
      </div>
    </div>
  );
}
