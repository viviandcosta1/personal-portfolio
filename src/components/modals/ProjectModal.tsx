'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA, Project } from '@/data/portfolioData';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Server, Database, ArrowLeft } from 'lucide-react';

export function ProjectModal() {
  const { activeModal, closeModal, selectedProject, setSelectedProject } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'project') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'project' || !selectedProject) return null;

  const allProjects = VIVIAN_DATA.projects;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen text-white"
    >
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#0D0D0D] via-[#050505] to-[#050505] border-2 border-[#D4AF37]/60 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.25)] p-5 sm:p-8 my-auto overflow-hidden">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#171717]">
          <div className="flex items-center gap-2">
            <button
              onClick={closeModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] border border-[#262626] text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
              <span>BACK TO STADIUM</span>
            </button>
            <span className="hidden sm:inline-flex text-xs font-mono font-bold text-[#D4AF37] uppercase items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40">
              {selectedProject.stationName}
            </span>
          </div>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 rounded-xl bg-[#171717]"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[#171717]">
          {allProjects.map(proj => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedProject.id === proj.id
                  ? 'bg-white text-[#050505] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-[#0D0D0D] text-slate-400 hover:text-white border border-[#262626]'
              }`}
            >
              {proj.stationName}
            </button>
          ))}
        </div>

        {/* Project Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project Overview & Specs */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-mono font-bold uppercase">
                  {selectedProject.category}
                </span>
                <span className="text-slate-400 font-mono text-xs">
                  SCOUTING RATING: {selectedProject.scoutingRating}/100
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
                {selectedProject.title}
              </h2>
              <p className="text-slate-400 font-mono text-xs sm:text-sm mt-1">
                {selectedProject.subtitle}
              </p>
            </div>

            <div className="text-slate-300 text-sm leading-relaxed font-mono bg-[#0D0D0D] p-4 rounded-2xl border border-[#171717]">
              {selectedProject.longDescription}
            </div>

            {/* Key Features List */}
            <div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                KEY HIGHLIGHTS & ARCHITECTURE:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-[#0D0D0D] border border-[#262626] text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#171717] border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-bold"
                >
                  ⚡ {metric}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architecture Blueprint & Tech Stack */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* System Architecture Blueprint */}
            <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#262626] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] uppercase">
                <Layers className="w-4 h-4" />
                <span>SYSTEM ARCHITECTURE</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {selectedProject.architecture.frontend && (
                  <div className="p-2.5 rounded-xl bg-[#050505] border border-[#171717]">
                    <span className="text-slate-400 block text-[10px]">FRONTEND LAYER:</span>
                    <span className="text-white font-bold">{selectedProject.architecture.frontend}</span>
                  </div>
                )}
                {selectedProject.architecture.backend && (
                  <div className="p-2.5 rounded-xl bg-[#050505] border border-[#171717]">
                    <span className="text-slate-400 block text-[10px]">BACKEND & CRAWLERS:</span>
                    <span className="text-white font-bold">{selectedProject.architecture.backend}</span>
                  </div>
                )}
                {selectedProject.architecture.aiModels && (
                  <div className="p-2.5 rounded-xl bg-[#050505] border border-[#171717]">
                    <span className="text-slate-400 block text-[10px]">AI / ML INFERENCE:</span>
                    <span className="text-white font-bold">{selectedProject.architecture.aiModels}</span>
                  </div>
                )}
                {selectedProject.architecture.database && (
                  <div className="p-2.5 rounded-xl bg-[#050505] border border-[#171717]">
                    <span className="text-slate-400 block text-[10px]">DATA PERSISTENCE:</span>
                    <span className="text-white font-bold">{selectedProject.architecture.database}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                TECHNOLOGY STACK:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-[#171717] text-slate-200 border border-[#262626] font-mono text-xs font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={VIVIAN_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#171717] hover:bg-[#262626] text-white font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB REPO</span>
              </a>
              <a
                href={`mailto:${VIVIAN_DATA.personal.email}?subject=Project%20Inquiry%20-%20${encodeURIComponent(selectedProject.title)}`}
                className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#050505] font-mono text-xs font-black uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>INQUIRE DETAILS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-[#171717] flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] text-white font-mono text-xs font-bold border border-[#262626] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>RETURN TO 3D STADIUM ARENA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
