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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen"
    >
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-[#00ff87]/50 rounded-3xl shadow-[0_0_60px_rgba(0,255,135,0.2)] p-5 sm:p-8 my-auto overflow-hidden">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={closeModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#00ff87]" />
              <span>BACK TO STADIUM</span>
            </button>
            <span className="hidden sm:inline-flex text-xs font-mono font-bold text-[#00ff87] uppercase items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/40">
              {selectedProject.stationName}
            </span>
          </div>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 rounded-xl bg-slate-800/60"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800">
          {allProjects.map(proj => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedProject.id === proj.id
                  ? 'bg-[#00ff87] text-slate-950 shadow-[0_0_15px_rgba(0,255,135,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
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
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-[#00ff87] border border-emerald-800 text-[10px] font-mono font-bold uppercase">
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

            <div className="text-slate-300 text-sm leading-relaxed font-mono">
              {selectedProject.longDescription}
            </div>

            {/* Key Features List */}
            <div>
              <div className="text-xs font-mono font-bold text-[#00ff87] uppercase tracking-wider mb-3">
                KEY HIGHLIGHTS & WORKFLOWS:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00ff87] shrink-0 mt-0.5" />
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
                  className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-[#00f0ff] font-mono text-xs font-bold"
                >
                  ⚡ {metric}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architecture Blueprint & Tech Stack */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* System Architecture Blueprint */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ffd700] uppercase">
                <Layers className="w-4 h-4" />
                <span>SYSTEM ARCHITECTURE</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {selectedProject.architecture.frontend && (
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">FRONTEND LAYER:</span>
                    <span className="text-white font-bold">{selectedProject.architecture.frontend}</span>
                  </div>
                )}
                {selectedProject.architecture.backend && (
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">BACKEND & CRAWLERS:</span>
                    <span className="text-white font-bold">{selectedProject.architecture.backend}</span>
                  </div>
                )}
                {selectedProject.architecture.aiModels && (
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">AI / ML INFERENCE:</span>
                    <span className="text-white font-bold">{selectedProject.architecture.aiModels}</span>
                  </div>
                )}
                {selectedProject.architecture.database && (
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
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
                    className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs font-bold"
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
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB REPO</span>
              </a>
              <a
                href={`mailto:${VIVIAN_DATA.personal.email}?subject=Project%20Inquiry%20-%20${encodeURIComponent(selectedProject.title)}`}
                className="flex-1 py-3 px-4 rounded-xl bg-[#00ff87] hover:bg-[#00ff87]/90 text-slate-950 font-mono text-xs font-black uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>INQUIRE DETAILS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00ff87]" />
            <span>RETURN TO 3D STADIUM ARENA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
