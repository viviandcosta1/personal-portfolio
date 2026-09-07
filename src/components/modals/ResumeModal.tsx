'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';
import { X, Download, Printer, Mail, Phone, MapPin, ExternalLink, ShieldCheck, ArrowLeft } from 'lucide-react';

export function ResumeModal() {
  const { activeModal, closeModal } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'resume') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'resume') return null;

  const data = VIVIAN_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen text-white"
    >
      <div className="relative w-full max-w-4xl bg-[#050505] border-2 border-[#262626] rounded-3xl shadow-2xl p-5 sm:p-10 my-auto font-sans print:bg-white print:text-black print:border-none print:shadow-none print:max-w-none print:p-0 print:my-0">
        {/* Sticky Action Header */}
        <div className="sticky top-0 z-20 bg-[#050505]/95 backdrop-blur-md -mx-5 -mt-5 sm:-mx-10 sm:-mt-10 p-4 sm:p-6 border-b border-[#171717] flex items-center justify-between rounded-t-3xl print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={closeModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] border border-[#262626] text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
              <span>BACK TO STADIUM</span>
            </button>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#171717] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              OFFICIAL DEVELOPER RESUME
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs font-mono font-bold text-[#050505] transition-colors cursor-pointer shadow"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / PDF</span>
            </button>
            <button
              onClick={closeModal}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] border border-[#262626]"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="mt-6 space-y-6 print:m-0 print:space-y-4">
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#171717] pb-6 print:border-black">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white print:text-black font-sans">
                {data.personal.name}
              </h1>
              <div className="text-sm font-mono font-bold text-[#D4AF37] print:text-black mt-1">
                {data.personal.tagline}
              </div>
              <p className="text-xs text-slate-400 print:text-gray-600 mt-2 max-w-xl font-mono leading-relaxed">
                {data.personal.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-300 print:text-gray-800 shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{data.personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{data.personal.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`mailto:${data.personal.email}`} className="hover:underline">
                  {data.personal.email}
                </a>
              </div>
              <div className="flex items-center gap-3 mt-1 pt-1 border-t border-[#171717] print:border-gray-300">
                <a
                  href={data.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-[#D4AF37]"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <span>•</span>
                <a
                  href={data.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-[#D4AF37]"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Education Block */}
          <div>
            <div className="text-xs font-mono font-bold text-[#D4AF37] print:text-black uppercase tracking-wider mb-2">
              EDUCATION & QUALIFICATIONS
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0D0D] border border-[#171717] print:bg-transparent print:border-gray-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-bold text-white print:text-black">
                <span>{data.education.degree}</span>
                <span className="text-xs font-mono text-[#D4AF37] print:text-black">
                  CGPA: {data.education.cgpa}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 print:text-gray-600 mt-0.5">
                {data.education.institution}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <div className="text-xs font-mono font-bold text-white print:text-black uppercase tracking-wider mb-3">
              PROFESSIONAL EXPERIENCE & ROLES
            </div>
            <div className="space-y-4">
              {data.experiences.map(exp => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl bg-[#0D0D0D] border border-[#171717] print:bg-transparent print:border-gray-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-bold text-white print:text-black mb-1">
                    <span>
                      {exp.role} • <span className="text-[#D4AF37] print:text-black">{exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400 print:text-gray-600">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 print:text-gray-800 font-mono mt-2">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {exp.techStack.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#171717] text-[10px] font-mono text-slate-300 print:bg-gray-100 print:text-black border border-[#262626] print:border-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects Section */}
          <div>
            <div className="text-xs font-mono font-bold text-[#D4AF37] print:text-black uppercase tracking-wider mb-3">
              PRODUCTION SOFTWARE & AI PROJECTS
            </div>
            <div className="space-y-3">
              {data.projects.map(proj => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-[#0D0D0D] border border-[#171717] print:bg-transparent print:border-gray-300"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-white print:text-black">
                    <span>{proj.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171717] text-[#D4AF37] border border-[#262626] print:bg-gray-200 print:text-black">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-300 print:text-gray-700 mt-1">
                    {proj.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {proj.techStack.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#171717] text-[10px] font-mono text-slate-300 print:bg-gray-100 print:text-black border border-[#262626]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 print:text-gray-800 uppercase tracking-wider mb-2">
              TECHNICAL PROFICIENCIES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {data.lockers.map(l => (
                <div
                  key={l.id}
                  className="p-2.5 rounded-lg bg-[#0D0D0D] border border-[#171717] print:bg-transparent print:border-gray-300"
                >
                  <span className="text-[#D4AF37] print:text-black font-bold block mb-1">
                    {l.name}:
                  </span>
                  <span className="text-slate-300 print:text-gray-800">
                    {l.skills.map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] print:text-black uppercase tracking-wider mb-1.5">
                CERTIFICATIONS
              </div>
              <div className="space-y-1 text-xs font-mono text-slate-300 print:text-gray-800">
                {data.certifications.map((c, i) => (
                  <div key={i}>• {c.title} ({c.issuer})</div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-slate-400 print:text-gray-800 uppercase tracking-wider mb-1.5">
                SPOKEN LANGUAGES
              </div>
              <div className="text-xs font-mono text-slate-300 print:text-gray-800">
                {data.languages.map(l => `${l.name} (${l.level})`).join(' • ')}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-[#171717] flex justify-center print:hidden">
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
