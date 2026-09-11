'use client';

import React from 'react';
import { Calendar, MapPin, Briefcase, Check, ArrowUpRight, Award, Zap } from 'lucide-react';
import { VIVIAN_DATA } from '@/data/portfolioData';

export function ExperienceSection() {
  const experiences = VIVIAN_DATA.experiences;

  // Key quantified production impact for HR & technical recruiters
  const experienceImpacts: Record<string, { stat: string; label: string }> = {
    daylink: { stat: 'Sub-50ms', label: 'API Response Latency & Zero Downtime Deployments' },
    bits: { stat: '98.5%', label: 'Predictive Model Accuracy & Automated Feature Pipeline' },
    nexel: { stat: '98+ Score', label: 'Lighthouse Performance & Zero Layout Shifts' },
  };

  return (
    <section id="experience" className="py-28 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#F7F3EC] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B89452] mb-3 block">
              // 02 · CAREER DOSSIER &amp; MATCH LOG
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2B211B] uppercase tracking-tight leading-none">
              PRODUCTION<br />
              <span className="text-[#B89452] italic font-light">EXPERIENCE.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end items-center">
            <span className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-[#DED3C5]/60 select-none">
              02
            </span>
          </div>
        </div>

        {/* Executive Timeline Dossier */}
        <div className="space-y-12">
          {experiences.map((exp, idx) => {
            const impact = experienceImpacts[exp.id] || { stat: 'Live Impact', label: 'Production Engineering' };
            return (
              <div
                key={exp.id}
                className="relative bg-[#FFFDF9] border border-[#DED3C5] hover:border-[#B89452] rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-[0_15px_35px_-20px_rgba(56,41,31,0.06)] group"
              >
                {/* Top Header Row with Year Stamp and Location */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#EBE3D8]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#38291F] bg-[#F7F3EC] border border-[#DED3C5] px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#B89452]" />
                      {exp.period}
                    </span>
                    {idx === 0 && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        Active Role
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#75685C]">
                    <MapPin className="w-3.5 h-3.5 text-[#B89452]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Role Title and Company */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
                  <div className="lg:col-span-8">
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-[#2B211B] uppercase tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-base font-bold text-[#B89452] mt-1 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#6B4F3A]" />
                      <span>{exp.company}</span>
                    </p>
                    <p className="text-sm text-[#75685C] leading-relaxed mt-3">
                      {exp.summary}
                    </p>
                  </div>

                  {/* Recruiter Impact Callout Pill */}
                  <div className="lg:col-span-4 bg-[#F7F3EC] border border-[#DED3C5] p-4 sm:p-5 rounded-2xl flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-[#B89452]" />
                      <span className="text-[10px] font-mono uppercase font-bold text-[#6B4F3A]">
                        PRODUCTION IMPACT
                      </span>
                    </div>
                    <p className="font-display font-black text-2xl text-[#2B211B]">
                      {impact.stat}
                    </p>
                    <p className="text-[11px] text-[#75685C] mt-0.5 leading-snug">
                      {impact.label}
                    </p>
                  </div>
                </div>

                {/* Key Deliverables & Engineering Accomplishments */}
                <div className="mb-8 pt-4 border-t border-[#EBE3D8]">
                  <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-[#6B4F3A] mb-3">
                    CORE DELIVERABLES &amp; RESPONSIBILITIES
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2.5 text-xs text-[#4A3B32]">
                        <span className="text-[#B89452] font-bold mt-0.5 font-mono">→</span>
                        <span className="leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stamped Technology Strip (replacing repetitive pill boxes) */}
                <div className="pt-4 border-t border-[#EBE3D8] flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#8C7D70] font-bold mr-1">
                    TECH DEPLOYED:
                  </span>
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-semibold text-[#38291F] bg-[#F7F3EC] border-b-2 border-[#B89452] px-2.5 py-1 rounded-t transition-colors hover:bg-[#EFE8DD]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
