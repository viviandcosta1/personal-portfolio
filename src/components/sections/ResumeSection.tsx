'use client';

import React from 'react';
import { FileText, Download, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export function ResumeSection({ onOpenResume }: ResumeSectionProps) {
  return (
    <section className="py-28 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#F7F3EC] relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="relative rounded-3xl bg-[#FFFDF9] border-2 border-[#DED3C5] hover:border-[#B89452] p-8 sm:p-14 lg:p-16 transition-all duration-300 shadow-[0_20px_50px_-20px_rgba(56,41,31,0.08)] overflow-hidden">
          
          <div className="max-w-3xl relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EC] border border-[#DED3C5] text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B4F3A] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89452]"></span>
              <span>OFFICIAL CURRICULUM VITAE</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2B211B] uppercase tracking-tight leading-[1.02] mb-6">
              READY FOR THE<br />
              <span className="text-[#B89452] italic font-light">NEXT CHALLENGE?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#75685C] leading-relaxed mb-8 max-w-2xl">
              Explore my verified production experience, full-stack systems, machine learning pipelines, and complete technical background in detail.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenResume}
                className="luxury-btn-primary px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2.5 shadow-sm group"
              >
                <FileText className="w-4 h-4 text-[#B89452]" />
                <span>VIEW RESUME</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFFDF9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenResume}
                className="luxury-btn-secondary px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 group"
              >
                <Download className="w-4 h-4 text-[#B89452]" />
                <span>DOWNLOAD RESUME</span>
              </button>
            </div>

            {/* Verified Meta */}
            <div className="mt-8 pt-8 border-t border-[#EBE3D8] flex flex-wrap items-center gap-6 text-xs font-mono text-[#8C7D70]">
              <div className="flex items-center gap-2 text-[#38291F] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Updated for 2026</span>
              </div>
              <span>·</span>
              <span>B.E. Computer Science (Distinction)</span>
              <span>·</span>
              <span>Full-Stack &amp; AI/ML</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
