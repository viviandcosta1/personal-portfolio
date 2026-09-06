'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA, Project } from '@/data/portfolioData';
import { soundEngine } from '@/components/audio/SoundEngine';
import {
  Crosshair,
  Zap,
  Target,
  Trophy,
  ExternalLink,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { GithubIcon } from '@/components/icons/BrandIcons';

export function ProjectShootoutGame() {
  const {
    cameraZone,
    focusZone,
    arcadeScore,
    shootStreak,
    activeShootoutProject,
    setActiveShootoutProject,
    shootAtTarget,
    openProjectModal,
  } = usePortfolio();

  const [aimPower, setAimPower] = useState(75);
  const [selectedTargetId, setSelectedTargetId] = useState('target-1');
  const [isShooting, setIsShooting] = useState(false);

  const projects = VIVIAN_DATA.projects;

  const targets = [
    {
      id: 'target-1',
      name: 'TARGET 01: TOP-LEFT BANGER',
      project: projects[0],
      points: 500,
      x: -3.4,
      y: 3.2,
      z: -36.3,
      color: '#00ff87',
      label: 'AI SCOUTING ENGINE',
      rating: 96,
    },
    {
      id: 'target-2',
      name: 'TARGET 02: TOP-RIGHT CORNER',
      project: projects[1],
      points: 350,
      x: 3.4,
      y: 3.2,
      z: -36.3,
      color: '#00f0ff',
      label: 'DAYLINK HIVE OPS',
      rating: 94,
    },
    {
      id: 'target-3',
      name: 'TARGET 03: BOTTOM STRIKE',
      project: projects[2],
      points: 300,
      x: 0,
      y: 1.2,
      z: -36.3,
      color: '#ffd700',
      label: 'PFWCI PORTAL',
      rating: 92,
    },
  ];

  const currentTarget = targets.find(t => t.id === selectedTargetId) || targets[0];

  const handleShoot = (target = currentTarget) => {
    if (isShooting) return;
    setIsShooting(true);
    setSelectedTargetId(target.id);
    shootAtTarget(target);

    setTimeout(() => {
      setIsShooting(false);
    }, 1200);
  };

  if (cameraZone !== 'goals') return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 sm:p-6 pb-20 sm:pb-6">
      {/* Top Arcade Match Telemetry Bar */}
      <div className="pointer-events-auto max-w-5xl mx-auto w-full mt-16 sm:mt-12">
        <div className="bg-slate-950/90 backdrop-blur-xl border-2 border-[#00ff87]/50 rounded-2xl p-3 sm:p-4 shadow-[0_0_30px_rgba(0,255,135,0.25)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff87] to-[#00f0ff] p-0.5 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shrink-0">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-sans">
                  PROJECTS TRAINING GROUND • TARGET SHOOTOUT
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-[#00ff87] border border-emerald-800 text-[10px] font-mono font-bold">
                  ARCADE MODE
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Aim at target rings or click below to launch curved shots into project stations!
              </div>
            </div>
          </div>

          {/* Score, Streak & Multiplier */}
          <div className="flex items-center gap-3 font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
              <div className="text-[9px] text-slate-400">SCORE</div>
              <div className="text-sm sm:text-base font-black text-[#ffd700]">
                {arcadeScore.toLocaleString()} PTS
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
              <div className="text-[9px] text-slate-400">STREAK</div>
              <div className="text-sm sm:text-base font-black text-[#00ff87]">
                {shootStreak}X 🔥
              </div>
            </div>

            <button
              onClick={() => focusZone('pitch')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
            >
              FREE ROAM
            </button>
          </div>
        </div>
      </div>

      {/* Center Aim Crosshair / Visual Focus Marker */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#00ff87]/80 animate-spin" />
          <Crosshair className="w-8 h-8 text-[#00ff87] absolute" />
        </div>
      </div>

      {/* Bottom Interactive Target Selection & Project Dossier Card */}
      <div className="pointer-events-auto max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* Left: 3 Quick Target Selection Cards */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
            <Target className="w-3.5 h-3.5 text-[#00ff87]" />
            <span>SELECT TARGET TO SHOOT:</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {targets.map(target => {
              const isSelected = selectedTargetId === target.id;
              return (
                <button
                  key={target.id}
                  onClick={() => handleShoot(target)}
                  disabled={isShooting}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group ${
                    isSelected
                      ? 'bg-slate-900 border-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.3)]'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: target.color }}
                    />
                    <div>
                      <div className="text-xs font-bold text-white uppercase font-sans group-hover:text-[#00ff87] transition-colors">
                        {target.project.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {target.label} • OVR: {target.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-xs font-mono font-bold text-[#ffd700] border border-slate-800">
                      +{target.points}
                    </span>
                    <span className="p-1 rounded-lg bg-[#00ff87] text-slate-950 font-black text-xs group-hover:scale-110 transition-transform">
                      <Play className="w-3 h-3 fill-current" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Focused Active Project Game Dossier */}
        {activeShootoutProject && (
          <div className="md:col-span-7 bg-slate-950/95 backdrop-blur-xl border-2 border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-[#00ff87] border border-emerald-800 text-[10px] font-mono font-bold uppercase">
                    {activeShootoutProject.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#ffd700]">
                    SCOUTING RATING: {activeShootoutProject.scoutingRating}/100
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {activeShootoutProject.stationName}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white uppercase mt-2 font-sans">
                {activeShootoutProject.title}
              </h3>
              <p className="text-xs font-mono text-slate-300 line-clamp-2 mt-1">
                {activeShootoutProject.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {activeShootoutProject.techStack.slice(0, 5).map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => openProjectModal(activeShootoutProject)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#00ff87] hover:bg-[#00ff87]/90 text-slate-950 font-black text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-[#00ff87]/20"
              >
                <span>OPEN FULL CASE STUDY</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={VIVIAN_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="View GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="hidden sm:inline">CODE</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
