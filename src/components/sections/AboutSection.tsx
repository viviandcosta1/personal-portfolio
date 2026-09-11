'use client';

import React from 'react';
import { Code2, Cpu, Globe, Workflow, Network, Cloud, CheckCircle2, GraduationCap, ArrowUpRight, Sparkles } from 'lucide-react';
import { VIVIAN_DATA } from '@/data/portfolioData';

export function AboutSection() {
  const specializations = [
    { title: 'Full-Stack Web Systems', stack: 'React.js, Next.js, Node.js, Express, REST APIs', role: 'Architecting scalable, reactive end-to-end applications from dynamic UI components to backend services.', icon: Globe },
    { title: 'AI & Data Engineering', stack: 'Python, FastAPI, Scikit-Learn, Pandas, NLP', role: 'Building predictive data pipelines, automated machine learning models, and automated business crawlers.', icon: Cpu },
    { title: 'Database & Storage Architecture', stack: 'MongoDB, MySQL, PostgreSQL, Query Indexing', role: 'Designing normalized relational schemas and document databases optimized for high-volume transactions.', icon: Network },
    { title: 'Cloud Infrastructure & DevOps', stack: 'AWS (EC2, S3, Lambda), Docker, GitHub CI/CD', role: 'Containerizing microservices, setting up automated deployment pipelines, and managing edge delivery.', icon: Cloud },
  ];

  return (
    <section id="about" className="py-28 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#EFE8DD] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Grid with Large 01 Numeral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          <div className="lg:col-span-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B89452] mb-3 block">
              // 01 · ABOUT THE DEVELOPER
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2B211B] leading-[0.98] uppercase tracking-tight">
              I BUILD<br />
              DIGITAL<br />
              <span className="text-[#B89452] italic font-light">EXPERIENCES.</span>
            </h2>
          </div>

          {/* Large Side Numeral */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end items-center">
            <span className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-[#DED3C5]/80 select-none">
              01
            </span>
          </div>

        </div>

        {/* Editorial Bio & Academic Credential */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-[#75685C] leading-relaxed mb-6">
              I am a disciplined software developer based in Karnataka, India, dedicated to engineering high-performance web systems, AI-powered products, and reliable automation solutions. With a Bachelor of Engineering in Computer Science &amp; Engineering (Graduated with Distinction, 8.4 CGPA), I combine architectural rigour with creative problem-solving.
            </p>
            <p className="text-sm sm:text-base text-[#75685C] leading-relaxed">
              Whether architecting full-stack business applications at Daylink Tech Labs or building predictive ML workflows, my engineering philosophy is straightforward: write clean, maintainable code, eliminate bottlenecks, and deliver measurable production value.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#FFFDF9] border border-[#DED3C5] p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-[#EBE3D8] pb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#B89452]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#38291F]">
                  ACADEMIC DISTINCTION
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Graduated with Distinction
              </span>
            </div>
            
            <p className="font-display font-bold text-xl text-[#2B211B] mb-1">
              B.E. Computer Science &amp; Engineering
            </p>
            <p className="text-xs font-mono text-[#B89452] font-semibold mb-3">
              Srinivas University Institute of Technology · CGPA: 8.4 / 10
            </p>
            <p className="text-xs text-[#75685C] leading-relaxed">
              Comprehensive coursework in Data Structures &amp; Algorithms, Relational &amp; Document Databases, Machine Learning Pipelines, and Distributed Networks.
            </p>
          </div>
        </div>

        {/* Specialized Capability Ledger (Replacing plain boxes with an Executive Capability Breakdown) */}
        <div className="bg-[#FFFDF9] border border-[#DED3C5] rounded-3xl p-6 sm:p-10 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 border-b border-[#EBE3D8] pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89452] font-bold block mb-1">
                DOMAIN EXPERTISE
              </span>
              <h3 className="font-display font-bold text-2xl text-[#2B211B] uppercase tracking-tight">
                CORE TECHNICAL SPECIALIZATIONS
              </h3>
            </div>
            <span className="text-xs font-mono text-[#75685C] bg-[#F7F3EC] border border-[#DED3C5] px-3 py-1 rounded-full w-fit">
              4 Core Competencies
            </span>
          </div>

          <div className="divide-y divide-[#EBE3D8]">
            {specializations.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.title}
                  className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#F7F3EC]/50 px-4 -mx-4 rounded-2xl transition-colors group"
                >
                  <div className="flex items-start gap-4 lg:max-w-md">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F3EC] border border-[#DED3C5] flex items-center justify-center text-[#38291F] group-hover:bg-[#38291F] group-hover:text-[#FFFDF9] transition-colors shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-[#B89452]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#B89452] font-bold">
                        DOMAIN #0{idx + 1}
                      </span>
                      <h4 className="font-display font-bold text-lg text-[#2B211B] uppercase tracking-tight">
                        {spec.title}
                      </h4>
                      <p className="text-xs font-mono text-[#6B4F3A] mt-0.5">
                        {spec.stack}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#75685C] lg:max-w-lg leading-relaxed">
                    {spec.role}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
