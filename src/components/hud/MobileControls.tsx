'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Play, RotateCcw, Zap } from 'lucide-react';

interface MobileControlsProps {
  onJoystickChange: (x: number, y: number) => void;
  onKick: () => void;
  onSprint: (sprinting: boolean) => void;
  onReset: () => void;
}

export function MobileControls({
  onJoystickChange,
  onKick,
  onSprint,
  onReset,
}: MobileControlsProps) {
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSprinting, setIsSprinting] = useState(false);

  const maxRadius = 40;

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !joystickBaseRef.current) return;
      const touch = e.touches[0];
      const rect = joystickBaseRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = touch.clientX - centerX;
      let dy = touch.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > maxRadius) {
        dx = (dx / distance) * maxRadius;
        dy = (dy / distance) * maxRadius;
      }

      setKnobPos({ x: dx, y: dy });
      onJoystickChange(dx / maxRadius, dy / maxRadius);
    },
    [isDragging, maxRadius, onJoystickChange]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setKnobPos({ x: 0, y: 0 });
    onJoystickChange(0, 0);
  }, [onJoystickChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchcancel', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isDragging, handleTouchMove, handleTouchEnd]);

  const toggleSprint = () => {
    const next = !isSprinting;
    setIsSprinting(next);
    onSprint(next);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 pointer-events-none flex md:hidden items-end justify-between select-none">
      {/* Virtual Joystick */}
      <div
        ref={joystickBaseRef}
        onTouchStart={() => setIsDragging(true)}
        className="pointer-events-auto w-28 h-28 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-[#262626] flex items-center justify-center relative touch-none shadow-2xl"
      >
        <div
          className="w-12 h-12 rounded-full bg-white border border-[#D4AF37] shadow-md transition-transform duration-75"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        />
      </div>

      {/* Action Buttons: Kick, Sprint, Reset */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={onReset}
          className="w-11 h-11 rounded-full bg-[#0D0D0D]/90 backdrop-blur-md border border-[#262626] text-slate-300 active:scale-95 flex items-center justify-center shadow-xl cursor-pointer"
          title="Reset Football to Center"
        >
          <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
        </button>

        <button
          onClick={toggleSprint}
          className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center active:scale-95 shadow-xl transition-all cursor-pointer ${
            isSprinting
              ? 'bg-white text-[#050505] border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
              : 'bg-[#0D0D0D]/90 text-slate-300 border-[#262626]'
          }`}
          title="Sprint Toggle"
        >
          <Zap className="w-5 h-5" />
        </button>

        <button
          onClick={onKick}
          className="w-14 h-14 rounded-full bg-white text-[#050505] font-black text-sm active:scale-90 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform cursor-pointer"
          title="Kick Football"
        >
          <Play className="w-6 h-6 fill-current translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
