'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { VIVIAN_DATA } from '@/data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 px-6 sm:px-8 bg-[#F7F3EC] text-[#2B211B] border-t border-[#DED3C5] relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Subtitle */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B89452]"></span>
            <span className="font-display font-black text-lg tracking-tight uppercase">
              VIVIAN D&apos;COSTA
            </span>
            <span className="text-[10px] font-mono text-[#6B4F3A] bg-[#EFE8DD] border border-[#DED3C5] px-1.5 py-0.5 rounded font-bold">
              #07
            </span>
          </div>
          <p className="text-xs text-[#75685C] font-medium">
            Software Developer · AI/ML · Full Stack
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-[#6B4F3A]">
          <a
            href={VIVIAN_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B89452] transition-colors font-semibold"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={VIVIAN_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B89452] transition-colors font-semibold"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={`mailto:${VIVIAN_DATA.personal.email}`}
            className="hover:text-[#B89452] transition-colors font-semibold"
          >
            Email
          </a>
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs text-[#8C7D70] font-mono">
          <span>&copy; 2026 Vivian D&apos;costa</span>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2.5 rounded-full border border-[#DED3C5] bg-[#FFFDF9] hover:bg-[#38291F] hover:text-[#FFFDF9] transition-colors shadow-sm"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
