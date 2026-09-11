'use client';

import React from 'react';
import { ArrowDown, ArrowUpRight, FileDown, Sparkles } from 'lucide-react';
import { DeveloperVisionCharacter } from './DeveloperVisionCharacter';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const scrollToExplore = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#F7F3EC] warm-grid-bg overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Editorial Text Column */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
          
          {/* Subtle Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#DED3C5] w-fit mb-6 text-[11px] font-mono font-bold tracking-wider uppercase text-[#6B4F3A] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89452]"></span>
            <span>SOFTWARE DEVELOPER · AI/ML · FULL STACK</span>
          </div>

          {/* Grand Luxury Typography */}
          <div className="mb-6">
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-[#2B211B] leading-[0.92] tracking-tight uppercase">
              VIVIAN<br />
              D&apos;COSTA
            </h1>
            <p className="font-display italic text-2xl sm:text-3xl md:text-4xl text-[#B89452] mt-2 font-light">
              Software Developer
            </p>
          </div>

          {/* Short Bio Statement */}
          <p className="text-base sm:text-lg text-[#75685C] max-w-lg font-normal leading-relaxed mb-8">
            Building web applications, AI-powered systems, and automation experiences with architectural discipline and modern craft.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              data-cursor="project"
              className="luxury-btn-primary px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
            >
              <span>VIEW MY WORK</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#B89452]" />
            </a>

            <button
              onClick={onOpenResume}
              className="luxury-btn-secondary px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <FileDown className="w-3.5 h-3.5 text-[#B89452]" />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>

          {/* Rotating Circular Stamp & Quick Explore Link */}
          <div className="flex items-center gap-6">
            {/* Rotating SVG Badge */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
              <svg
                className="w-full h-full spin-slow text-[#6B4F3A]"
                viewBox="0 0 100 100"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[7.5px] font-mono uppercase tracking-[0.24em] fill-current font-bold">
                  <textPath href="#circlePath">
                    VIVIAN D&apos;COSTA · DEVELOPER · AI/ML ·
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#B89452]/20 border border-[#B89452] flex items-center justify-center text-[8px] font-mono font-bold text-[#38291F]">
                07
              </div>
            </div>

            {/* Explore Button */}
            <button
              onClick={scrollToExplore}
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#38291F] hover:text-[#B89452] transition-colors group"
            >
              <span>EXPLORE</span>
              <span className="text-[#B89452] group-hover:translate-y-1 transition-transform">↓</span>
            </button>
          </div>

        </div>

        {/* Right Signature Character Visual */}
        <div className="lg:col-span-6 xl:col-span-5 flex justify-center items-center">
          <DeveloperVisionCharacter />
        </div>

      </div>
    </section>
  );
}
