'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export function CustomCursor() {
  const { cursorState } = usePortfolio();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isSpecial = cursorState !== 'default' && cursorState !== 'hover';

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 top-0 left-0 -ml-2 -mt-2 will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      {/* Normal dot */}
      {cursorState === 'default' && (
        <div className="w-3.5 h-3.5 rounded-full bg-white border border-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
      )}

      {/* Hover state */}
      {cursorState === 'hover' && (
        <div className="w-7 h-7 -ml-2 -mt-2 rounded-full border-2 border-[#D4AF37] bg-white/20 backdrop-blur-sm scale-110 shadow-[0_0_15px_#D4AF37]" />
      )}

      {/* Action badges: KICK, VIEW, DISCOVER, ENTER */}
      {isSpecial && (
        <div className="px-3 py-1.5 -ml-8 -mt-3 rounded-full bg-[#050505]/95 border border-[#D4AF37] text-[10px] font-mono font-black text-[#D4AF37] tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)] whitespace-nowrap flex items-center gap-1.5">
          <span>⚽</span>
          <span>
            {cursorState === 'kick'
              ? 'KICK'
              : cursorState === 'project'
              ? 'VIEW PROJECT'
              : cursorState === 'discover'
              ? 'DISCOVER'
              : 'ENTER'}
          </span>
        </div>
      )}
    </div>
  );
}
