'use client';

import React, { useRef, useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Zap, Play, RotateCcw } from 'lucide-react';

interface MobileControlsProps {
  onJoystickChange: (x: number, y: number) => void;
  onKick: () => void;
  onSprint: (active: boolean) => void;
  onReset: () => void;
}

export function MobileControls({
  onJoystickChange,
  onKick,
  onSprint,
  onReset,
}: MobileControlsProps) {
  const { hasEnteredStadium } = usePortfolio();
  const [isSprintActive, setIsSprintActive] = useState(false);

  // Virtual Joystick Touch Handling
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const touchIdRef = useRef<number | null>(null);

  if (!hasEnteredStadium) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (touchIdRef.current !== null) return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    setIsDragging(true);
    updateJoystick(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        updateJoystick(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === touchIdRef.current) {
        touchIdRef.current = null;
        setIsDragging(false);
        setKnobPos({ x: 0, y: 0 });
        onJoystickChange(0, 0);
        break;
      }
    }
  };

  const updateJoystick = (clientX: number, clientY: number) => {
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const maxRadius = rect.width / 2;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(dist, maxRadius);

    const knobX = clampedDist * Math.cos(angle);
    const knobY = clampedDist * Math.sin(angle);

    setKnobPos({ x: knobX, y: knobY });
    onJoystickChange(knobX / maxRadius, knobY / maxRadius);
  };

  const toggleSprint = () => {
    const next = !isSprintActive;
    setIsSprintActive(next);
    onSprint(next);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-20 pointer-events-none flex items-end justify-between sm:hidden">
      {/* Virtual Analog Joystick (Left Thumb) */}
      <div
        ref={joystickBaseRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="pointer-events-auto relative w-28 h-28 rounded-full bg-slate-900/80 backdrop-blur-md border-2 border-slate-700/80 flex items-center justify-center touch-none shadow-2xl"
      >
        {/* Joystick Base Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-full h-px bg-slate-400" />
          <div className="h-full w-px bg-slate-400 absolute" />
        </div>

        {/* Joystick Thumb Knob */}
        <div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00ff87] to-[#00f0ff] shadow-lg flex items-center justify-center transition-transform duration-75 pointer-events-none"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        >
          <div className="w-4 h-4 rounded-full bg-slate-950/60" />
        </div>
      </div>

      {/* Action Buttons (Right Thumb) */}
      <div className="pointer-events-auto flex flex-col gap-2 items-end">
        {/* Reset Ball Position */}
        <button
          onClick={onReset}
          className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer"
          title="Reset Ball"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Sprint Toggle */}
        <button
          onClick={toggleSprint}
          className={`px-4 py-2 rounded-xl font-mono text-xs font-black tracking-wider flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer ${
            isSprintActive
              ? 'bg-[#00f0ff] text-slate-950 border-2 border-white'
              : 'bg-slate-900/90 text-[#00f0ff] border border-cyan-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{isSprintActive ? 'SPRINT ON' : 'SPRINT'}</span>
        </button>

        {/* Kick Button */}
        <button
          onClick={onKick}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00ff87] to-emerald-400 text-slate-950 font-black text-sm tracking-wider flex flex-col items-center justify-center shadow-xl shadow-[#00ff87]/30 active:scale-90 transition-transform cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current rotate-[-90deg]" />
          <span>KICK</span>
        </button>
      </div>
    </div>
  );
}
