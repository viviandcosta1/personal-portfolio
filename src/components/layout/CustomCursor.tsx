'use client';

import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project' | 'tech'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const techEl = target.closest('[data-cursor="tech"]');
      const interactiveEl = target.closest('a, button, [role="button"], input, textarea');

      if (projectEl) {
        setCursorType('project');
        setCursorText('VIEW');
      } else if (techEl) {
        setCursorType('tech');
        setCursorText('EXPLORE');
      } else if (interactiveEl) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isTextCursor = cursorType === 'project' || cursorType === 'tech';

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-200 ${
          isTextCursor
            ? 'w-14 h-14 bg-[#38291F] text-[#FFFDF9] text-[10px] font-bold font-mono tracking-wider shadow-lg ring-2 ring-[#B89452]'
            : cursorType === 'hover'
            ? 'w-8 h-8 bg-[#B89452]/20 border border-[#B89452]'
            : 'w-3.5 h-3.5 bg-[#6B4F3A]/70 ring-2 ring-[#B89452]/40'
        }`}
      >
        {isTextCursor && <span>{cursorText}</span>}
      </div>
    </div>
  );
}
