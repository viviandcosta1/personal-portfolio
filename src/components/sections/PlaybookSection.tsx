'use client';

import React from 'react';
import { Search, PenTool, CheckCircle, Rocket, ArrowRight } from 'lucide-react';

export function PlaybookSection() {
  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      tagline: 'Understand the problem.',
      description:
        'Deconstruct business requirements, analyze edge cases, review API limits, and establish explicit architectural objectives before writing code.',
      icon: Search,
      tacticBadge: 'SCOUTING & ANALYSIS',
    },
    {
      number: '02',
      title: 'BUILD',
      tagline: 'Design and develop the solution.',
      description:
        'Write modular, clean, and typed code. Implement scalable database schemas, resilient backend services, and responsive user interfaces.',
      icon: PenTool,
      tacticBadge: 'TACTICAL EXECUTION',
    },
    {
      number: '03',
      title: 'TEST',
      tagline: 'Improve reliability and usability.',
      description:
        'Conduct rigorous unit testing, API contract verification, latency benchmarks, and cross-browser responsiveness audits.',
      icon: CheckCircle,
      tacticBadge: 'PERFORMANCE TUNING',
    },
    {
      number: '04',
      title: 'SHIP',
      tagline: 'Deploy, learn and iterate.',
      description:
        'Deploy containerized microservices to production cloud infrastructure with CI/CD automation, edge caching, and active telemetry.',
      icon: Rocket,
      tacticBadge: 'MATCH WINNING GOAL',
    },
  ];

  return (
    <section id="playbook" className="py-24 px-6 sm:px-8 border-b border-[#E8E8E8] bg-[#FAFAF8] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8A951] mb-2 block">
              // 05 · METHODOLOGY &amp; WORKFLOW
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#111111] uppercase tracking-tight leading-none">
              THE DEVELOPER<br />
              <span className="text-[#C8A951] italic">PLAYBOOK.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#666666] max-w-md">
            A structured, tactical 4-step engineering playbook designed to take ideas from conceptual discovery to rock-solid production deployment.
          </p>
        </div>

        {/* Tactical Board Playbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="editorial-card p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E8E8E8] relative flex flex-col justify-between group hover:border-[#C8A951] transition-all duration-300"
              >
                {/* Subtle top indicator */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#111111]/20 group-hover:text-[#C8A951] transition-colors duration-200">
                    {step.number}
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#666666] bg-[#F4F4F1] border border-[#E8E8E8] px-2.5 py-1 rounded">
                    {step.tacticBadge}
                  </span>
                </div>

                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#E8E8E8] flex items-center justify-center text-[#111111] group-hover:bg-[#C8A951] group-hover:text-[#111111] group-hover:border-[#C8A951] transition-all duration-200 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-black text-xl text-[#111111] uppercase tracking-tight mb-1">
                    {step.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#C8A951] font-mono uppercase mb-3">
                    {step.tagline}
                  </p>

                  <p className="text-xs text-[#666666] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Flow Indicator */}
                <div className="pt-6 mt-6 border-t border-[#F0F0EC] flex items-center justify-between text-[11px] font-mono text-[#8E8E8E]">
                  <span>STEP {step.number} / 04</span>
                  {idx < 3 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-[#8E8E8E] group-hover:text-[#C8A951] group-hover:translate-x-1 transition-all" />
                  ) : (
                    <span className="text-emerald-600 font-bold">LIVE</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Tactical Pitch Decor Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8A951]"></span>
            <span className="font-mono font-bold text-[#111111] uppercase tracking-wider">
              PHILOSOPHY: PRECISION OVER SHORTCUTS
            </span>
          </div>
          <p className="text-[#666666] text-center sm:text-right font-medium">
            &ldquo;Discipline in development produces elegance in production.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
