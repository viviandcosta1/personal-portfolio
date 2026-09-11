'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Database, Cpu, Activity, Globe, Shield, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/icons/BrandIcons';
import { VIVIAN_DATA, Project } from '@/data/portfolioData';
import { ProjectDetailModal } from '@/components/modals/ProjectDetailModal';

export function ProjectsSection() {
  const projects = VIVIAN_DATA.projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#F7F3EC] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B89452] mb-3 block">
              // 03 · SELECTED CASE STUDIES
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2B211B] uppercase tracking-tight leading-none">
              FEATURED<br />
              <span className="text-[#B89452] italic font-light">PROJECTS.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end items-center">
            <span className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-[#DED3C5]/60 select-none">
              03
            </span>
          </div>
        </div>

        {/* Project Editorial Case Studies */}
        <div className="space-y-16">
          {projects.map((proj, idx) => {
            const projectNumber = `0${idx + 1}`;
            return (
              <div
                key={proj.id}
                data-cursor="project"
                onClick={() => setSelectedProject(proj)}
                className="luxury-card rounded-3xl bg-[#FFFDF9] border border-[#DED3C5] overflow-hidden group hover:border-[#6B4F3A] cursor-pointer transition-all duration-300 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* Left Visual Telemetry Preview */}
                  <div className="lg:col-span-6 bg-[#EFE8DD] border-b lg:border-b-0 lg:border-r border-[#DED3C5] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden">
                    
                    {/* Subtle Warm Grid */}
                    <div className="absolute inset-0 warm-grid-bg opacity-50" />

                    {/* Project 01 Visual */}
                    {idx === 0 && (
                      <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#FFFDF9] border border-[#DED3C5] p-5 shadow-sm transition-transform duration-500 group-hover:scale-[1.03] flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-[#DED3C5] pb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                          </div>
                          <span className="text-[10px] font-mono text-[#6B4F3A] uppercase tracking-wider font-bold">
                            AI SCOUTING ENGINE · LIVE
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                        </div>

                        <div className="space-y-2.5 my-3">
                          <div className="bg-[#F7F3EC] border border-[#DED3C5] p-2.5 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Cpu className="w-3.5 h-3.5 text-[#B89452]" />
                              <span className="text-xs font-bold text-[#38291F]">Domain Scraper Pipeline</span>
                            </div>
                            <span className="text-[10px] font-mono bg-[#B89452]/15 text-[#6B4F3A] font-bold px-2 py-0.5 rounded">98.5% Valid</span>
                          </div>

                          <div className="bg-[#F7F3EC] border border-[#DED3C5] p-2.5 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Shield className="w-3.5 h-3.5 text-[#6B4F3A]" />
                              <span className="text-xs font-bold text-[#38291F]">DNS &amp; SMTP Verification</span>
                            </div>
                            <span className="text-[10px] font-mono bg-[#EFE8DD] text-[#38291F] font-bold px-2 py-0.5 rounded">Real-time</span>
                          </div>

                          <div className="bg-[#F7F3EC] border border-[#DED3C5] p-2.5 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Activity className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-xs font-bold text-[#38291F]">Hot / Warm / Cold Classifier</span>
                            </div>
                            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Scikit-Learn</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#DED3C5]">
                          <div className="text-center bg-[#F7F3EC] py-1.5 rounded-lg">
                            <p className="text-[10px] font-mono text-[#75685C]">PROSPECTING</p>
                            <p className="text-xs font-bold text-[#38291F]">10x Faster</p>
                          </div>
                          <div className="text-center bg-[#F7F3EC] py-1.5 rounded-lg">
                            <p className="text-[10px] font-mono text-[#75685C]">LATENCY</p>
                            <p className="text-xs font-bold text-[#38291F]">&lt;50ms Async</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Project 02 Visual */}
                    {idx === 1 && (
                      <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#FFFDF9] border border-[#DED3C5] p-5 shadow-sm transition-transform duration-500 group-hover:scale-[1.03] flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-[#DED3C5] pb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                          </div>
                          <span className="text-[10px] font-mono text-[#6B4F3A] uppercase tracking-wider font-bold">
                            DAYLINK HIVE · OPERATIONS
                          </span>
                          <span className="w-2 h-2 rounded-full bg-[#B89452]"></span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 my-3">
                          <div className="p-2.5 bg-[#F7F3EC] border border-[#DED3C5] rounded-xl text-center">
                            <p className="text-[9px] font-mono text-[#75685C]">API SPEED</p>
                            <p className="text-sm font-black text-[#38291F] mt-0.5">&lt;50ms</p>
                          </div>
                          <div className="p-2.5 bg-[#F7F3EC] border border-[#DED3C5] rounded-xl text-center">
                            <p className="text-[9px] font-mono text-[#75685C]">RBAC</p>
                            <p className="text-sm font-black text-[#B89452] mt-0.5">JWT Auth</p>
                          </div>
                          <div className="p-2.5 bg-[#F7F3EC] border border-[#DED3C5] rounded-xl text-center">
                            <p className="text-[9px] font-mono text-[#75685C]">DATABASE</p>
                            <p className="text-sm font-black text-[#6B4F3A] mt-0.5">MongoDB</p>
                          </div>
                        </div>

                        <div className="bg-[#F7F3EC] border border-[#DED3C5] p-3 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-[#B89452]" />
                            <span className="text-xs font-bold text-[#38291F]">High-Volume CRUD Architecture</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#75685C]">Zero Downtime</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-[#8C7D70] pt-2 border-t border-[#DED3C5]">
                          <span>SECURE TOKEN EXCHANGE</span>
                          <span>100% RESPONSIVE</span>
                        </div>
                      </div>
                    )}

                    {/* Project 03 Visual */}
                    {idx === 2 && (
                      <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#FFFDF9] border border-[#DED3C5] p-5 shadow-sm transition-transform duration-500 group-hover:scale-[1.03] flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-[#DED3C5] pb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#DED3C5]"></span>
                          </div>
                          <span className="text-[10px] font-mono text-[#6B4F3A] uppercase tracking-wider font-bold">
                            PFWCI PORTAL · CMS &amp; CDN
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        </div>

                        <div className="my-3 p-4 bg-[#F7F3EC] border border-[#DED3C5] rounded-2xl flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#75685C] block">PERFORMANCE AUDIT</span>
                            <p className="text-2xl font-black text-emerald-700 font-display">98 / 100</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono uppercase text-[#75685C] block">BANDWIDTH SAVING</span>
                            <p className="text-2xl font-black text-[#B89452] font-display">-60% CDN</p>
                          </div>
                        </div>

                        <div className="bg-[#FFFDF9] border border-[#DED3C5] p-2.5 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-[#B89452]" />
                            <span className="text-xs font-bold text-[#38291F]">Next-Gen Asset Pipeline</span>
                          </div>
                          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Optimized</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-[#8C7D70] pt-2 border-t border-[#DED3C5]">
                          <span>ADMIN CONTENT MANAGER</span>
                          <span>EDGE CACHED</span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Right Editorial Information */}
                  <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                    <div>
                      
                      {/* Project Index Number & Category */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display font-black text-4xl sm:text-5xl text-[#DED3C5] group-hover:text-[#B89452] group-hover:translate-x-1 transition-all duration-300">
                          {projectNumber}
                        </span>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B4F3A] bg-[#EFE8DD] border border-[#DED3C5] px-3.5 py-1 rounded-full">
                          {proj.category}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-[#2B211B] uppercase tracking-tight mb-2 group-hover:text-[#B89452] transition-colors duration-200">
                        {proj.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs font-semibold uppercase font-mono text-[#8C7D70] mb-4">
                        {proj.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-[#75685C] leading-relaxed mb-6">
                        {proj.description}
                      </p>

                      {/* Metrics */}
                      <div className="space-y-2 mb-6">
                        {proj.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-2 text-xs font-semibold text-[#38291F]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B89452]"></span>
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {proj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-semibold text-[#38291F] bg-[#F7F3EC] border border-[#DED3C5] px-3 py-1 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Interactive Action Row */}
                    <div className="pt-6 border-t border-[#DED3C5] flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38291F] group-hover:text-[#B89452] transition-colors">
                        <span>EXPLORE CASE STUDY</span>
                        <ArrowUpRight className="w-4 h-4 text-[#B89452] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>

                      <span className="text-xs font-mono text-[#75685C] flex items-center gap-1.5">
                        <GithubIcon className="w-3.5 h-3.5 text-[#6B4F3A]" />
                        <span>Source Code</span>
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Deep Dive Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
