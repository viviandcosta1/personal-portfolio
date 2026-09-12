'use client';

import React, { useState } from 'react';
import { X, Download, FileText, Briefcase, GraduationCap, Code2, Award, Mail, Phone, MapPin, Check } from 'lucide-react';
import { VIVIAN_DATA } from '@/data/portfolioData';

interface ResumeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeDetailModal({ isOpen, onClose }: ResumeDetailModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Vivian Dcosta - Resume</title>
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.5; color: #2B211B; padding: 40px; }
              h1 { margin: 0; font-size: 28px; text-transform: uppercase; color: #2B211B; }
              h2 { font-size: 15px; border-bottom: 2px solid #6B4F3A; padding-bottom: 4px; margin-top: 24px; text-transform: uppercase; color: #38291F; }
              h3 { margin: 0; font-size: 14px; color: #2B211B; }
              .meta { font-size: 12px; color: #6B4F3A; margin-bottom: 8px; font-weight: bold; }
              p, li { font-size: 12px; color: #4A3B32; }
              ul { padding-left: 20px; margin: 4px 0; }
              .header-info { font-size: 12px; margin-top: 6px; color: #75685C; }
            </style>
          </head>
          <body>
            <h1>Vivian Dcosta</h1>
            <p class="header-info">Software Developer | AI/ML & Full-Stack Engineer<br/>Belagavi, Karnataka, India | dcostavivian08@gmail.com | +91 6360209255 | github.com/vivian-dcosta</p>
            
            <h2>Education</h2>
            <h3>Bachelor of Engineering (B.E.) in Computer Science & Engineering</h3>
            <p class="meta">Srinivas University Institute of Technology | CGPA: 8.4 / 10 (Distinction)</p>
            
            <h2>Professional Experience</h2>
            <h3>Daylink Tech Labs — Software Developer (2026 – Present)</h3>
            <ul>
              <li>Architecting modular full-stack applications using React.js, Node.js, Express, and MongoDB.</li>
              <li>Implementing automated business workflows, REST API integrations, and database schema optimizations.</li>
            </ul>

            <h3>BITS — AI/ML Intern (May 2025 – July 2025)</h3>
            <ul>
              <li>Built end-to-end machine learning pipelines for predictive data modeling and feature engineering.</li>
              <li>Conducted data preprocessing, normalization, and model evaluation using Python, Pandas, and Scikit-Learn.</li>
            </ul>

            <h3>Nexel — Web Development Intern (December 2023)</h3>
            <ul>
              <li>Constructed responsive, accessible UI components with HTML5, CSS3, and modern JavaScript.</li>
            </ul>

            <h2>Technical Skills</h2>
            <p><strong>Languages:</strong> Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3</p>
            <p><strong>Frontend & Backend:</strong> React.js, Next.js, Node.js, Express.js, FastAPI, REST APIs</p>
            <p><strong>Databases & Cloud:</strong> MongoDB, MySQL, PostgreSQL, AWS (EC2, S3), Docker, Git, Linux</p>

            <h2>Certifications</h2>
            <p>Database Specialist Certification | AWS Cloud Certification</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 300);
    }

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B211B]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#F7F3EC] border border-[#DED3C5] rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Bar */}
        <div className="sticky top-0 bg-[#F7F3EC]/95 backdrop-blur-md border-b border-[#DED3C5] px-6 sm:px-8 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#38291F] uppercase tracking-wider">
            <FileText className="w-4 h-4 text-[#B89452]" />
            <span>OFFICIAL CURRICULUM VITAE</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="luxury-btn-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PRINT READY</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#B89452]" />
                  <span>PRINT / SAVE PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume modal"
              className="p-1.5 rounded-full border border-[#DED3C5] bg-[#FFFDF9] hover:bg-[#38291F] hover:text-[#FFFDF9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper-Styled Resume Body */}
        <div className="p-6 sm:p-12">
          
          <div className="bg-[#FFFDF9] border border-[#DED3C5] rounded-3xl p-6 sm:p-10 shadow-sm">
            
            {/* Header */}
            <div className="border-b border-[#DED3C5] pb-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display font-black text-3xl sm:text-4xl text-[#2B211B] uppercase tracking-tight">
                    VIVIAN DCOSTA
                  </h1>
                  <p className="text-sm font-bold font-mono text-[#B89452] uppercase mt-1">
                    SOFTWARE DEVELOPER · FULL STACK · AI/ML
                  </p>
                </div>

                <div className="text-xs font-mono text-[#75685C] space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#B89452]" />
                    <span>dcostavivian08@gmail.com</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#B89452]" />
                    <span>+91 6360209255</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B89452]" />
                    <span>Belagavi, Karnataka, India</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38291F] border-b border-[#DED3C5] pb-2 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#B89452]" />
                <span>PROFESSIONAL EXPERIENCE</span>
              </h2>

              <div className="space-y-6">
                {VIVIAN_DATA.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-[#2B211B] uppercase">
                        {exp.role} — <span className="text-[#B89452]">{exp.company}</span>
                      </h3>
                      <span className="text-xs font-mono text-[#75685C]">{exp.period}</span>
                    </div>
                    <p className="text-xs text-[#555555] mb-2">{exp.summary}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#75685C]">
                      {exp.responsibilities.slice(0, 3).map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-8">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38291F] border-b border-[#DED3C5] pb-2 mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#B89452]" />
                <span>EDUCATION</span>
              </h2>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-[#2B211B] uppercase">
                    {VIVIAN_DATA.education.degree}
                  </h3>
                  <span className="text-xs font-mono text-emerald-800 font-bold">
                    CGPA: {VIVIAN_DATA.education.cgpa} ({VIVIAN_DATA.education.period})
                  </span>
                </div>
                <p className="text-xs text-[#555555] mb-1">{VIVIAN_DATA.education.institution}</p>
                <p className="text-xs text-[#75685C]">
                  {VIVIAN_DATA.education.highlights[0]}
                </p>
              </div>
            </div>

            {/* Skills Matrix */}
            <div className="mb-8">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38291F] border-b border-[#DED3C5] pb-2 mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#B89452]" />
                <span>TECHNICAL ARSENAL</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-semibold text-[#2B211B] mb-1">Languages &amp; Runtimes:</p>
                  <p className="text-[#75685C]">Python, JavaScript (ES6+), TypeScript, Node.js, SQL</p>
                </div>
                <div>
                  <p className="font-semibold text-[#2B211B] mb-1">Frameworks &amp; Web:</p>
                  <p className="text-[#75685C]">React.js, Next.js, Express.js, FastAPI, Tailwind CSS</p>
                </div>
                <div>
                  <p className="font-semibold text-[#2B211B] mb-1">Databases:</p>
                  <p className="text-[#75685C]">MongoDB, MySQL, PostgreSQL, Index Optimization</p>
                </div>
                <div>
                  <p className="font-semibold text-[#2B211B] mb-1">DevOps &amp; Cloud:</p>
                  <p className="text-[#75685C]">AWS (EC2, S3, Lambda), Docker, Git/GitHub, Linux</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38291F] border-b border-[#DED3C5] pb-2 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#B89452]" />
                <span>CERTIFICATIONS</span>
              </h2>
              <div className="space-y-1 text-xs text-[#555555]">
                <p>• <strong>Database Specialist Certification</strong> — Relational database modeling &amp; query optimization.</p>
                <p>• <strong>AWS Cloud Certification</strong> — Amazon Web Services compute, cloud security, and serverless storage.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
