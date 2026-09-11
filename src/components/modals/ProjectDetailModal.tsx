'use client';

import React from 'react';
import { X, CheckCircle2, Layers, Server, Database, Cloud } from 'lucide-react';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { Project } from '@/data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B211B]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#F7F3EC] border border-[#DED3C5] rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-[#F7F3EC]/95 backdrop-blur-md border-b border-[#DED3C5] px-6 sm:px-8 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 font-mono text-xs text-[#75685C]">
            <span className="text-[#B89452] font-bold">{project.stationName}</span>
            <span>·</span>
            <span className="bg-[#EFE8DD] px-2 py-0.5 rounded text-[11px] font-semibold text-[#2B211B]">
              Rating: {project.scoutingRating}/100
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded-full border border-[#DED3C5] bg-[#FFFDF9] hover:bg-[#38291F] hover:text-[#FFFDF9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6B4F3A] mb-2 block">
              {project.category}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#2B211B] uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm font-semibold text-[#B89452] mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#DED3C5] mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B4F3A] mb-2 font-bold">
              PROJECT OVERVIEW
            </h3>
            <p className="text-sm sm:text-base text-[#4A3B32] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B4F3A] mb-3 flex items-center gap-2 font-bold">
              <span className="w-1.5 h-1.5 bg-[#B89452] rounded-full"></span>
              <span>CORE CAPABILITIES &amp; HIGHLIGHTS</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-[#FFFDF9] border border-[#DED3C5] p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#B89452] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#2B211B] leading-snug font-medium">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Breakdown */}
          {project.architecture && (
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B4F3A] mb-3 font-bold">
                SYSTEM ARCHITECTURE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {project.architecture.frontend && (
                  <div className="p-3 bg-[#FFFDF9] border border-[#DED3C5] rounded-xl flex items-center gap-3">
                    <Layers className="w-4 h-4 text-[#6B4F3A]" />
                    <div>
                      <p className="font-mono text-[10px] text-[#8C7D70]">FRONTEND</p>
                      <p className="font-semibold text-[#2B211B]">{project.architecture.frontend}</p>
                    </div>
                  </div>
                )}
                {project.architecture.backend && (
                  <div className="p-3 bg-[#FFFDF9] border border-[#DED3C5] rounded-xl flex items-center gap-3">
                    <Server className="w-4 h-4 text-[#B89452]" />
                    <div>
                      <p className="font-mono text-[10px] text-[#8C7D70]">BACKEND</p>
                      <p className="font-semibold text-[#2B211B]">{project.architecture.backend}</p>
                    </div>
                  </div>
                )}
                {project.architecture.database && (
                  <div className="p-3 bg-[#FFFDF9] border border-[#DED3C5] rounded-xl flex items-center gap-3">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <div>
                      <p className="font-mono text-[10px] text-[#8C7D70]">DATABASE</p>
                      <p className="font-semibold text-[#2B211B]">{project.architecture.database}</p>
                    </div>
                  </div>
                )}
                {project.architecture.cloud && (
                  <div className="p-3 bg-[#FFFDF9] border border-[#DED3C5] rounded-xl flex items-center gap-3">
                    <Cloud className="w-4 h-4 text-amber-700" />
                    <div>
                      <p className="font-mono text-[10px] text-[#8C7D70]">DEPLOYMENT</p>
                      <p className="font-semibold text-[#2B211B]">{project.architecture.cloud}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B4F3A] mb-3 font-bold">
              TECHNOLOGIES DEPLOYED
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold text-[#2B211B] bg-[#FFFDF9] border border-[#DED3C5] px-3 py-1 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#DED3C5]">
            <a
              href={project.links.github || 'https://github.com/vivian-dcosta'}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-btn-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4 text-[#B89452]" />
              <span>Source Repository</span>
            </a>

            <button
              onClick={onClose}
              className="luxury-btn-secondary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
