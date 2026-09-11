'use client';

import React, { useState } from 'react';
import { 
  Terminal, 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  Cpu, 
  Zap, 
  Layers, 
  Workflow, 
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  FileCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ConstellationNode {
  id: string;
  name: string;
  category: string;
  desc: string;
  level: string;
  icon: React.ComponentType<{ className?: string }>;
  coords: { x: number; y: number };
}

interface TechSkillItem {
  name: string;
  category: 'Backend & APIs' | 'Frontend' | 'AI & Data' | 'Cloud & DevOps';
  experienceLevel: string;
  productionUse: string;
  coreStrength: boolean;
}

export function SkillsSection() {
  const [activeNode, setActiveNode] = useState<ConstellationNode | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const nodes: ConstellationNode[] = [
    { id: 'python', name: 'Python', category: 'Languages', desc: 'AI/ML algorithms, FastAPI microservices, and automated scraping pipelines.', level: 'Advanced', icon: Terminal, coords: { x: 20, y: 22 } },
    { id: 'js', name: 'JavaScript', category: 'Languages', desc: 'Modern async ES6+, event architecture, DOM systems, and runtime fluency.', level: 'Advanced', icon: Terminal, coords: { x: 50, y: 15 } },
    { id: 'react', name: 'React.js', category: 'Frontend', desc: 'Modular components, reactive state management, custom hooks, and high-FPS UI.', level: 'Core Strength', icon: Layout, coords: { x: 80, y: 22 } },
    { id: 'nodejs', name: 'Node.js', category: 'Backend', desc: 'Asynchronous event runtime, RESTful routing, and high-throughput microservices.', level: 'Advanced', icon: Server, coords: { x: 85, y: 50 } },
    { id: 'fastapi', name: 'FastAPI', category: 'Backend', desc: 'High-speed Python APIs, Pydantic data schemas, and OpenAPI contracts.', level: 'Proficient', icon: Zap, coords: { x: 75, y: 78 } },
    { id: 'mongodb', name: 'MongoDB', category: 'Databases', desc: 'Document data models, aggregation pipelines, and high-volume indexing.', level: 'Advanced', icon: Database, coords: { x: 50, y: 85 } },
    { id: 'mysql', name: 'MySQL', category: 'Databases', desc: 'Relational ACID transactions, schema normalization, and complex SQL joins.', level: 'Advanced', icon: Database, coords: { x: 25, y: 78 } },
    { id: 'aws', name: 'AWS Cloud', category: 'DevOps & Cloud', desc: 'EC2 computing, S3 object storage, Lambda serverless, and CloudWatch telemetry.', level: 'Certified', icon: Cloud, coords: { x: 15, y: 50 } },
    { id: 'docker', name: 'Docker', category: 'DevOps & Cloud', desc: 'Multi-stage containerization, reproducible builds, and Docker Compose.', level: 'Proficient', icon: Workflow, coords: { x: 30, y: 38 } },
    { id: 'git', name: 'Git & GitHub', category: 'DevOps & Cloud', desc: 'Branching governance, CI/CD automated actions, and collaborative reviews.', level: 'Expert', icon: GitBranch, coords: { x: 70, y: 38 } },
  ];

  const skillLedger: TechSkillItem[] = [
    { name: 'Python (3.10+)', category: 'Backend & APIs', experienceLevel: 'Production Lead', productionUse: 'FastAPI Microservices, ML Data Pipelines, Web Crawlers', coreStrength: true },
    { name: 'JavaScript & TypeScript', category: 'Backend & APIs', experienceLevel: 'Advanced', productionUse: 'Full-Stack Async Systems, React State, REST Routing', coreStrength: true },
    { name: 'React.js & Next.js', category: 'Frontend', experienceLevel: 'Production Lead', productionUse: 'Enterprise Dashboards, Responsive UI, SSR & Edge Cache', coreStrength: true },
    { name: 'Node.js & Express.js', category: 'Backend & APIs', experienceLevel: 'Advanced', productionUse: 'High-Volume CRUD APIs, JWT Auth Middleware, Webhooks', coreStrength: true },
    { name: 'FastAPI', category: 'Backend & APIs', experienceLevel: 'Advanced', productionUse: 'Asynchronous Python Endpoints, Pydantic Schema Contracts', coreStrength: true },
    { name: 'MongoDB & Mongoose', category: 'AI & Data', experienceLevel: 'Advanced', productionUse: 'Aggregations, Document Schemas, Index Query Tuning', coreStrength: true },
    { name: 'MySQL & PostgreSQL', category: 'AI & Data', experienceLevel: 'Advanced', productionUse: 'Relational Normalization, Complex Joins, ACID Safety', coreStrength: true },
    { name: 'AWS (EC2, S3, Lambda)', category: 'Cloud & DevOps', experienceLevel: 'Certified', productionUse: 'Cloud Deployments, Object Stores, Serverless Tasks', coreStrength: true },
    { name: 'Docker & Containers', category: 'Cloud & DevOps', experienceLevel: 'Proficient', productionUse: 'Multi-stage Dockerfiles, Compose Environments', coreStrength: false },
    { name: 'Machine Learning & NLP', category: 'AI & Data', experienceLevel: 'Advanced', productionUse: 'Predictive Scikit-Learn Models, Feature Engineering', coreStrength: true },
    { name: 'Tailwind CSS & Modern UI', category: 'Frontend', experienceLevel: 'Expert', productionUse: 'Design Systems, Micro-Interactions, Mobile Responsiveness', coreStrength: true },
    { name: 'Git & GitHub CI/CD', category: 'Cloud & DevOps', experienceLevel: 'Expert', productionUse: 'Branch Governance, Automated Workflows, Code Review', coreStrength: true },
  ];

  const categories = ['All', 'Backend & APIs', 'Frontend', 'AI & Data', 'Cloud & DevOps'];

  const filteredSkills = selectedCategory === 'All'
    ? skillLedger
    : skillLedger.filter((s) => s.category === selectedCategory);

  const recruiterHighlights = [
    { title: 'Full-Stack Autonomy', desc: 'Can architect, build, and deploy complete web applications independently from zero to live production.' },
    { title: 'AI/ML Integration', desc: 'Bridges modern web applications with trained predictive intelligence, data extraction, and model APIs.' },
    { title: 'Database Optimization', desc: 'Deep fluency in both document (MongoDB) and relational (MySQL/PostgreSQL) query indexing & ACID schema design.' },
    { title: 'Immediate Impact', desc: 'Disciplined work ethic, clean modular code standards, fast learner, and rapid time-to-deliver.' },
  ];

  return (
    <section id="skills" className="py-28 px-6 sm:px-8 border-b border-[#DED3C5] bg-[#EFE8DD] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B89452] mb-3 block">
              // 04 · TECHNICAL ARSENAL &amp; HR AUDIT
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2B211B] uppercase tracking-tight leading-none">
              THE STACK &amp;<br />
              <span className="text-[#B89452] italic font-light">TECHNICAL MATRIX.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end items-center">
            <span className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-[#DED3C5]/80 select-none">
              04
            </span>
          </div>
        </div>

        {/* Constellation Interactive Orbit */}
        <div className="p-6 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#DED3C5] relative mb-16 shadow-[0_15px_40px_-20px_rgba(56,41,31,0.06)]">
          
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89452] font-bold block mb-1">
              SYSTEM TOPOLOGY
            </span>
            <p className="text-xs font-mono uppercase tracking-wider text-[#75685C]">
              Hover any satellite node to trace system dependencies
            </p>
          </div>

          {/* Interactive Constellation Visual */}
          <div className="relative w-full max-w-3xl aspect-[16/10] sm:aspect-[16/9] mx-auto flex items-center justify-center select-none">
            
            {/* SVG Connecting Constellation Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none text-[#DED3C5]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {nodes.map((node) => {
                const isActive = activeNode?.id === node.id;
                return (
                  <line
                    key={node.id}
                    x1="50"
                    y1="50"
                    x2={node.coords.x}
                    y2={node.coords.y}
                    stroke={isActive ? '#B89452' : '#DED3C5'}
                    strokeWidth={isActive ? '0.8' : '0.4'}
                    strokeDasharray={isActive ? '1 1' : '0.5 0.5'}
                    className="transition-colors duration-300"
                  />
                );
              })}

              <circle cx="50" cy="50" r="38" fill="none" stroke="#DED3C5" strokeWidth="0.3" strokeDasharray="1 1" />
            </svg>

            {/* Central Node: VIVIAN */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#38291F] border-2 border-[#B89452] shadow-xl flex flex-col items-center justify-center text-center p-2 ring-4 ring-[#EFE8DD]">
                <span className="text-[11px] sm:text-xs font-display font-black text-[#FFFDF9] tracking-wider uppercase">
                  VIVIAN
                </span>
                <span className="text-[8px] font-mono text-[#B89452] uppercase font-bold mt-0.5">
                  CORE ENGINE
                </span>
              </div>
            </div>

            {/* Constellation Nodes */}
            {nodes.map((node) => {
              const Icon = node.icon;
              const isActive = activeNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  data-cursor="tech"
                  onMouseEnter={() => setActiveNode(node)}
                  onMouseLeave={() => setActiveNode(null)}
                  style={{
                    left: `${node.coords.x}%`,
                    top: `${node.coords.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute z-30 cursor-pointer"
                >
                  <div
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-[#38291F] text-[#FFFDF9] border-[#B89452] scale-110 shadow-md ring-2 ring-[#B89452]/40'
                        : 'bg-[#FFFDF9] text-[#38291F] border-[#DED3C5] hover:border-[#B89452]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B89452]' : 'text-[#6B4F3A]'}`} />
                    <span className="text-[11px] sm:text-xs font-bold font-sans">
                      {node.name}
                    </span>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Active Node Detail Strip */}
          <div className="mt-8 p-5 rounded-2xl bg-[#F7F3EC] border border-[#DED3C5] max-w-xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
            {activeNode ? (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#B89452]">
                      {activeNode.category}
                    </span>
                    <span className="text-[#DED3C5]">·</span>
                    <span className="text-xs font-bold text-[#2B211B] uppercase">
                      {activeNode.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#75685C] leading-relaxed">
                    {activeNode.desc}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-[#FFFDF9] text-[#38291F] px-3 py-1 rounded-lg border border-[#DED3C5] shrink-0 w-fit">
                  {activeNode.level}
                </span>
              </>
            ) : (
              <p className="text-xs font-mono text-[#8C7D70] text-center w-full">
                Hover any node in the constellation to reveal architectural role and usage.
              </p>
            )}
          </div>

        </div>

        {/* HR & Recruiter Technical Matrix (Replacing repetitive boxes with an Executive Ledger) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: HR Recruiter Fit & Capability Highlights */}
          <div className="lg:col-span-4 bg-[#FFFDF9] border border-[#DED3C5] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <FileCheck className="w-5 h-5 text-[#B89452]" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#38291F]">
                HIRING AUDIT SNAPSHOT
              </span>
            </div>
            <p className="text-xs text-[#75685C] mb-6 leading-relaxed">
              Key competencies that make Vivian an exceptional candidate for full-stack and AI software engineering roles.
            </p>

            <div className="space-y-4">
              {recruiterHighlights.map((rh, idx) => (
                <div key={idx} className="pb-4 border-b border-[#EBE3D8] last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89452]"></span>
                    <h4 className="text-xs font-bold uppercase text-[#2B211B] tracking-tight">
                      {rh.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#75685C] leading-relaxed pl-3.5">
                    {rh.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#DED3C5] bg-[#F7F3EC] -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-[#8C7D70]">EDUCATION:</span>
                <span className="font-bold text-[#2B211B]">B.E. CSE (8.4 CGPA)</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8C7D70]">AVAILABILITY:</span>
                <span className="font-bold text-emerald-800">READY FOR NEW CHALLENGE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Editorial Skills Ledger Table */}
          <div className="lg:col-span-8 bg-[#FFFDF9] border border-[#DED3C5] rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {/* Ledger Category Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#EBE3D8] pb-5">
              <div>
                <h3 className="font-display font-bold text-xl text-[#2B211B] uppercase tracking-tight">
                  ENGINEERING LEDGER
                </h3>
                <p className="text-xs text-[#75685C]">
                  Granular breakdown of production tools, depth, and enterprise application
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-[#38291F] text-[#FFFDF9] shadow-sm'
                        : 'bg-[#F7F3EC] text-[#75685C] hover:text-[#2B211B] border border-[#DED3C5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Table Rows */}
            <div className="divide-y divide-[#EBE3D8]">
              {filteredSkills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  data-cursor="tech"
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F7F3EC]/70 px-3 -mx-3 rounded-xl transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#B89452] font-bold w-6">
                      0{sIdx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#2B211B] group-hover:text-[#B89452] transition-colors">
                          {skill.name}
                        </span>
                        {skill.coreStrength && (
                          <span className="text-[8px] font-mono bg-[#B89452]/15 text-[#6B4F3A] font-bold px-1.5 py-0.2 rounded border border-[#B89452]/30">
                            CORE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#75685C] mt-0.5">
                        {skill.productionUse}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center pl-9 sm:pl-0">
                    <span className="text-[10px] font-mono font-semibold text-[#6B4F3A] bg-[#F7F3EC] group-hover:bg-[#FFFDF9] border border-[#DED3C5] px-2.5 py-1 rounded-md">
                      {skill.experienceLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
