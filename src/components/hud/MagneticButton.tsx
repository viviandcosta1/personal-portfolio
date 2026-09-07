'use client';

import React, { useRef, useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  className = '',
  magneticStrength = 0.25,
  onClick,
  ...props
}: MagneticButtonProps) {
  const { setCursorState } = usePortfolio();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * magneticStrength, y: y * magneticStrength });
  };

  const handleMouseEnter = () => {
    setCursorState('enter');
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setCursorState('default');
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`relative cursor-pointer select-none active:scale-95 transition-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
