'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Target, Zap, Trophy, Cpu, Play, CheckCircle2, X } from 'lucide-react';

export function TrainingModeHUD() {
  const {
    isTrainingModeActive,
    toggleTrainingMode,
    focusZone,
    openModal,
    openProjectModal,
    goalsScored,
    unlockedAchievements,
    selectedProject,
  } = usePortfolio();

  if (!isTrainingModeActive) return null;

  const objectives = [
    {
      id: 'dribble',
      title: 'DRIBBLE',
      desc: 'Free roam on pitch (WASD / Joystick)',
      icon: <Play className="w-4 h-4 text-white" />,
      action: () => focusZone('pitch'),
      done: true,
    },
    {
      id: 'pass',
      title: 'PASS',
      desc: 'Open project dossier',
      icon: <Zap className="w-4 h-4 text-[#D4AF37]" />,
      action: () => focusZone('goals'),
      done: unlockedAchievements.includes('full_stack'),
    },
    {
      id: 'shoot',
      title: 'SHOOT',
      desc: 'Score in North Goal net',
      icon: <Target className="w-4 h-4 text-white" />,
      action: () => focusZone('goals'),
      done: goalsScored > 0,
    },
    {
      id: 'tactics',
      title: 'TACTICAL BOARD',
      desc: 'Explore AI/ML Formation',
      icon: <Cpu className="w-4 h-4 text-[#D4AF37]" />,
      action: () => {
        focusZone('tactical');
        openModal('tactical');
      },
      done: unlockedAchievements.includes('tactical_genius'),
    },
  ];

  return (
    <div className="fixed top-20 left-4 z-30 pointer-events-auto max-w-xs w-full bg-[#0D0D0D]/95 backdrop-blur-xl border border-[#262626] rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] text-white select-none">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-[#171717] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
            TRAINING FACILITY
          </span>
        </div>
        <button
          onClick={toggleTrainingMode}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 mb-3">
        OBJECTIVE: Explore Vivian&apos;s software & engineering skill set.
      </div>

      {/* Objectives Checklist */}
      <div className="flex flex-col gap-2">
        {objectives.map(obj => (
          <button
            key={obj.id}
            onClick={obj.action}
            className="p-2.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-left transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#0D0D0D] border border-[#262626]">
                {obj.icon}
              </div>
              <div>
                <div className="text-xs font-bold font-sans uppercase group-hover:text-[#D4AF37] transition-colors">
                  {obj.title}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {obj.desc}
                </div>
              </div>
            </div>

            {obj.done ? (
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            ) : (
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                GO
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
