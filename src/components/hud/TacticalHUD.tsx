'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import {
  Volume2,
  VolumeX,
  Map as MapIcon,
  Trophy,
  Terminal,
  FileText,
  Send,
  Zap,
  Target,
  Layers,
  Cpu
} from 'lucide-react';

export function TacticalHUD() {
  const {
    hasEnteredStadium,
    cameraZone,
    focusZone,
    openModal,
    openExperienceModal,
    openLockerModal,
    selectedExperience,
    selectedLocker,
    isMuted,
    toggleSound,
    toggleMiniMap,
    toggleTerminal,
    unlockedAchievements,
    goalsScored,
  } = usePortfolio();

  if (!hasEnteredStadium) return null;

  const handleExperienceClick = () => {
    focusZone('trophies');
    openExperienceModal(selectedExperience || VIVIAN_DATA.experiences[0]);
  };

  const handleSkillsClick = () => {
    focusZone('lockers');
    openLockerModal(selectedLocker || VIVIAN_DATA.lockers[0]);
  };

  const handleTacticsClick = () => {
    focusZone('tactical');
    openModal('tactical');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-3 sm:p-5 pointer-events-none flex flex-col gap-2">
      {/* Top Main Broadcast Banner */}
      <div className="flex items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        {/* Left: Player ID & Score */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-slate-900/90 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-800 shadow-xl">
          <button
            onClick={() => openModal('profile')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff87] to-[#00f0ff] p-0.5 flex items-center justify-center font-black text-slate-950 text-xs">
              10
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-black text-white tracking-wider uppercase group-hover:text-[#00ff87] transition-colors">
                VIVIAN DCOSTA
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                SOFTWARE & AI/ML DEV
              </div>
            </div>
          </button>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          {/* Live Match Score Indicator */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-[#00ff87] border border-emerald-800/60 font-bold">
              GOALS: {goalsScored}
            </span>
          </div>
        </div>

        {/* Center: Sector Navigation Fast-Travel (Desktop & Tablet) */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shadow-xl">
          <NavButton
            active={cameraZone === 'pitch'}
            onClick={() => focusZone('pitch')}
            icon={<Target className="w-3.5 h-3.5" />}
            label="PITCH"
          />
          <NavButton
            active={cameraZone === 'goals'}
            onClick={() => focusZone('goals')}
            icon={<Zap className="w-3.5 h-3.5" />}
            label="PROJECTS"
          />
          <NavButton
            active={cameraZone === 'trophies'}
            onClick={handleExperienceClick}
            icon={<Trophy className="w-3.5 h-3.5" />}
            label="EXPERIENCE"
          />
          <NavButton
            active={cameraZone === 'lockers'}
            onClick={handleSkillsClick}
            icon={<Layers className="w-3.5 h-3.5" />}
            label="SKILLS"
          />
          <NavButton
            active={cameraZone === 'tactical'}
            onClick={handleTacticsClick}
            icon={<Cpu className="w-3.5 h-3.5" />}
            label="AI / TACTICS"
          />
        </nav>

        {/* Right: Tools & Utilities */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Achievements Trigger */}
          <button
            onClick={() => openModal('achievements')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs font-mono text-amber-400 hover:border-amber-400/50 hover:bg-slate-800 transition-all cursor-pointer shadow-xl"
            title="Achievements Shelf"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-bold">{unlockedAchievements.length}/7</span>
          </button>

          {/* Resume Modal */}
          <button
            onClick={() => openModal('resume')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs font-mono text-[#00f0ff] hover:border-[#00f0ff]/50 hover:bg-slate-800 transition-all cursor-pointer shadow-xl"
            title="Scouting Resume"
          >
            <FileText className="w-4 h-4 text-[#00f0ff]" />
            <span className="hidden sm:inline font-bold">RESUME</span>
          </button>

          {/* Contact Tunnel */}
          <button
            onClick={() => openModal('contact')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#00ff87] text-[#040609] font-black text-xs font-mono tracking-wider uppercase hover:bg-[#00ff87]/90 transition-all cursor-pointer shadow-xl shadow-[#00ff87]/20"
            title="Contact Tunnel"
          >
            <Send className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">CONTACT</span>
          </button>

          {/* Terminal Console */}
          <button
            onClick={toggleTerminal}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs font-mono text-emerald-400 hover:border-emerald-400/50 hover:bg-slate-800 transition-all cursor-pointer shadow-xl"
            title="Terminal Console"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Mini-Map Toggle */}
          <button
            onClick={toggleMiniMap}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-600 hover:bg-slate-800 transition-all cursor-pointer shadow-xl"
            title="Tactical Radar Map (M)"
          >
            <MapIcon className="w-4 h-4 text-[#00ff87]" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-600 hover:bg-slate-800 transition-all cursor-pointer shadow-xl"
            title={isMuted ? 'Unmute Stadium Audio' : 'Mute Stadium Audio'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#00ff87]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Quick Navigation Bar */}
      <div className="pointer-events-auto flex md:hidden items-center justify-center gap-1 bg-slate-900/95 backdrop-blur-md p-1 rounded-xl border border-slate-800 shadow-xl max-w-sm mx-auto overflow-x-auto w-full">
        <NavButton active={cameraZone === 'pitch'} onClick={() => focusZone('pitch')} label="PITCH" />
        <NavButton active={cameraZone === 'goals'} onClick={() => focusZone('goals')} label="PROJECTS" />
        <NavButton active={cameraZone === 'trophies'} onClick={handleExperienceClick} label="EXP" />
        <NavButton active={cameraZone === 'lockers'} onClick={handleSkillsClick} label="SKILLS" />
        <NavButton active={cameraZone === 'tactical'} onClick={handleTacticsClick} label="AI" />
        <NavButton active={false} onClick={() => openModal('profile')} label="BIO" />
      </div>
    </header>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-[#00ff87] text-[#040609] shadow-[0_0_12px_rgba(0,255,135,0.4)]'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
