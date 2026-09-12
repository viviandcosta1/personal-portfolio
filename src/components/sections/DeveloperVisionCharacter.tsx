'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Server, 
  Database, 
  Cloud, 
  Workflow, 
  Sparkles,
  Zap
} from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  role: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  coords: { x: number; y: number }; // percentage inside container
  delayClass: string;
}

export function DeveloperVisionCharacter() {
  const [activeTech, setActiveTech] = useState<TechNode | null>(null);

  const techNodes: TechNode[] = [
    {
      id: 'python',
      name: 'Python',
      role: 'Core AI/ML & Microservice Algorithms',
      category: 'Intelligence',
      icon: Terminal,
      coords: { x: 12, y: 18 },
      delayClass: 'tech-float-1',
    },
    {
      id: 'aiml',
      name: 'AI / ML',
      role: 'Predictive Pipelines & Feature Engineering',
      category: 'Intelligence',
      icon: Cpu,
      coords: { x: 84, y: 16 },
      delayClass: 'tech-float-2',
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      role: 'High-speed Async REST Endpoints (<50ms)',
      category: 'Backend',
      icon: Zap,
      coords: { x: 92, y: 44 },
      delayClass: 'tech-float-1',
    },
    {
      id: 'react',
      name: 'React.js',
      role: 'Modular Component Systems & Dynamic State',
      category: 'Frontend',
      icon: Layers,
      coords: { x: 8, y: 46 },
      delayClass: 'tech-float-2',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      role: 'High-throughput Asynchronous Microservices',
      category: 'Backend',
      icon: Server,
      coords: { x: 14, y: 76 },
      delayClass: 'tech-float-1',
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      role: 'Flexible Document Storage & Aggregation',
      category: 'Database',
      icon: Database,
      coords: { x: 84, y: 74 },
      delayClass: 'tech-float-2',
    },
    {
      id: 'aws',
      name: 'AWS Cloud',
      role: 'Containerized Deployment & EC2 Infrastructure',
      category: 'Cloud',
      icon: Cloud,
      coords: { x: 48, y: 92 },
      delayClass: 'tech-float-1',
    },
  ];

  return (
    <div className="relative w-full max-w-[500px] lg:max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none">
      
      {/* Background Orbital Constellation Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none text-[#6B4F3A]/20"
        viewBox="0 0 500 500"
        fill="none"
      >
        {/* Concentric Orbit Paths */}
        <ellipse cx="250" cy="250" rx="220" ry="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
        <ellipse cx="250" cy="250" rx="180" ry="180" stroke="#B89452" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
        <ellipse cx="250" cy="250" rx="140" ry="140" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

        {/* Dynamic Connecting Lines from active node to center */}
        {activeTech && (
          <line
            x1="250"
            y1="250"
            x2={(activeTech.coords.x * 500) / 100}
            y2={(activeTech.coords.y * 500) / 100}
            stroke="#B89452"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Central Portrait Container */}
      <div className="relative w-[300px] sm:w-[350px] aspect-square rounded-[36px] p-2 bg-gradient-to-b from-[#FFFDF9] to-[#EFE8DD] border border-[#DED3C5] shadow-[0_20px_50px_-15px_rgba(56,41,31,0.12)] overflow-hidden group">
        
        {/* Character Image */}
        <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#EFE8DD]">
          <Image
            src="/images/vivian_developer_vision.jpg"
            alt="Vivian Dcosta — Stylish Software Developer wearing Vision Glasses"
            fill
            priority
            sizes="(max-width: 768px) 300px, 350px"
            className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Vision Glasses HUD Scanning Line Overlay */}
          <div className="absolute top-[28%] left-[25%] w-[50%] h-[18%] pointer-events-none overflow-hidden rounded-md">
            <div className="vision-scan-line" />
            
            {/* Subtle holographic lens reflection badge */}
            <div className="absolute bottom-1 right-1 px-1 py-0.2 bg-[#B89452]/80 backdrop-blur-sm text-[7px] font-mono text-[#FFFDF9] rounded tracking-widest uppercase font-semibold">
              VISION v2.6
            </div>
          </div>

          {/* Soft Luxury Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B211B]/40 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Badge inside portrait */}
          <div className="absolute bottom-3 inset-x-3 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DED3C5]/80 py-1.5 px-3 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#38291F] uppercase">
                VIVIAN DCOSTA
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#B89452] font-semibold bg-[#F7F3EC] px-1.5 py-0.5 rounded border border-[#DED3C5]">
              FULL STACK · AI
            </span>
          </div>

        </div>

      </div>

      {/* Orbiting Flowing Technology Chips */}
      {techNodes.map((tech) => {
        const Icon = tech.icon;
        const isActive = activeTech?.id === tech.id;

        return (
          <div
            key={tech.id}
            data-cursor="tech"
            onMouseEnter={() => setActiveTech(tech)}
            onMouseLeave={() => setActiveTech(null)}
            style={{
              left: `${tech.coords.x}%`,
              top: `${tech.coords.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute z-20 cursor-pointer transition-all duration-300 ${tech.delayClass}`}
          >
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${
                isActive
                  ? 'bg-[#38291F] text-[#FFFDF9] border-[#B89452] scale-110 shadow-lg ring-2 ring-[#B89452]/40'
                  : 'bg-[#FFFDF9]/95 text-[#38291F] border-[#DED3C5] hover:border-[#B89452] hover:bg-[#FFFDF9]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B89452]' : 'text-[#6B4F3A]'}`} />
              <span className="text-[11px] font-bold tracking-tight font-sans">
                {tech.name}
              </span>
            </div>

            {/* Tooltip Micro-Description when hovered */}
            {isActive && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 rounded-xl bg-[#FFFDF9] border border-[#B89452] shadow-xl text-center z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#B89452] block">
                  {tech.category}
                </span>
                <p className="text-[11px] text-[#38291F] font-semibold leading-tight mt-0.5">
                  {tech.role}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Subtle Gold Pulse Aura */}
      <div className="absolute -inset-4 rounded-full bg-[#B89452]/5 blur-2xl -z-10 pointer-events-none" />

    </div>
  );
}
