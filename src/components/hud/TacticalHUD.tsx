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
  Cpu,
  Sparkles,
  Compass,
  Monitor,
  Eye,
  Orbit,
} from 'lucide-react';

export function TacticalHUD() {
  const {
    hasEnteredStadium,
    cameraZone,
    focusZone,
    openModal,
    openExperienceModal,
    selectedExperience,
    isMuted,
    toggleSound,
    toggleMiniMap,
    toggleTerminal,
    unlockedAchievements,
    goalsScored,
    isTrainingModeActive,
    toggleTrainingMode,
    startOutroCinematic,
    triggerMentalityMode,
    setCursorState,
  } = usePortfolio();

  if (!hasEnteredStadium) return null;

  const handleExperienceClick = () => {
    focusZone('trophies');
    openExperienceModal(selectedExperience || VIVIAN_DATA.experiences[0]);
  };

  const handleSkillsClick = () => {
    focusZone('lockers');
    openModal('skills');
  };

  const handleTacticsClick = () => {
    focusZone('tactical');
    openModal('tactical');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-3 sm:p-5 pointer-events-none flex flex-col gap-2 select-none">
      {/* Top Main Broadcast Banner */}
      <div className="flex items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        {/* Left: Player ID & Score */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-[#0D0D0D]/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl border border-[#262626] shadow-2xl">
          <button
            onClick={() => openModal('profile')}
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-white p-0.5 flex items-center justify-center font-black text-[#050505] text-xs font-mono group-hover:scale-105 transition-transform">
              #07
            </div>
            <div className="text-left">
              <div className="text-xs sm:text-sm font-black text-white tracking-wider uppercase group-hover:text-[#D4AF37] transition-colors font-sans">
                VIVIAN D&apos;COSTA
              </div>
              <div className="text-[10px] font-mono text-[#D4AF37] font-semibold">
                SOFTWARE DEVELOPER
              </div>
            </div>
          </button>

          <div className="h-6 w-px bg-[#262626] hidden sm:block" />

          {/* Goals Scored Tracker */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded-lg bg-[#171717] text-white border border-[#262626] font-bold">
              GOALS: <span className="text-[#D4AF37]">{goalsScored}</span>
            </span>
          </div>
        </div>

        {/* Center: Sector Navigation Fast-Travel (Desktop & Tablet) */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-[#0D0D0D]/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#262626] shadow-2xl">
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
            label="TROPHIES"
          />
          <NavButton
            active={cameraZone === 'lockers'}
            onClick={handleSkillsClick}
            icon={<Layers className="w-3.5 h-3.5" />}
            label="LOCKERS"
          />
          <NavButton
            active={cameraZone === 'tactical'}
            onClick={handleTacticsClick}
            icon={<Cpu className="w-3.5 h-3.5" />}
            label="FORMATION"
          />
          <NavButton
            active={cameraZone === 'controlroom'}
            onClick={() => focusZone('controlroom')}
            icon={<Monitor className="w-3.5 h-3.5" />}
            label="CONTROL"
          />
          <NavButton
            active={cameraZone === 'techOrbs'}
            onClick={() => focusZone('techOrbs')}
            icon={<Orbit className="w-3.5 h-3.5" />}
            label="ORBS"
          />
          <NavButton
            active={cameraZone === 'roof'}
            onClick={() => focusZone('roof')}
            icon={<Eye className="w-3.5 h-3.5" />}
            label="ROOF"
          />
        </nav>

        {/* Right: Tools & Utilities */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Training Mode Toggle */}
          <button
            onClick={toggleTrainingMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-md border text-xs font-mono font-bold transition-all cursor-pointer shadow-xl ${
              isTrainingModeActive
                ? 'bg-white text-[#050505] border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'bg-[#0D0D0D]/95 border-[#262626] text-slate-300 hover:text-white hover:border-[#D4AF37]'
            }`}
            title="Toggle Training Mode Objectives"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden lg:inline">TRAINING</span>
          </button>

          {/* Mentality Easter Egg Trigger */}
          <button
            onClick={triggerMentalityMode}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0D0D0D]/95 backdrop-blur-md border border-[#262626] text-xs font-mono text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#171717] transition-all cursor-pointer shadow-xl"
            title="Activate Mentality Mode #07"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold">#07</span>
          </button>

          {/* Achievements Shelf */}
          <button
            onClick={() => openModal('achievements')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0D0D0D]/95 backdrop-blur-md border border-[#262626] text-xs font-mono text-white hover:border-[#D4AF37] hover:bg-[#171717] transition-all cursor-pointer shadow-xl"
            title="Achievements Shelf"
          >
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold">{unlockedAchievements.length}/8</span>
          </button>

          {/* Outro Cinematic */}
          <button
            onClick={startOutroCinematic}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0D0D0D]/95 backdrop-blur-md border border-[#262626] text-xs font-mono text-slate-300 hover:text-white hover:border-white transition-all cursor-pointer shadow-xl"
            title="The Match is Never Over (Outro)"
          >
            <span>OUTRO</span>
          </button>

          {/* Resume Modal */}
          <button
            onClick={() => openModal('resume')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0D0D0D]/95 backdrop-blur-md border border-[#262626] text-xs font-mono text-white hover:border-white hover:bg-[#171717] transition-all cursor-pointer shadow-xl"
            title="Scouting Resume"
          >
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span className="hidden sm:inline font-bold">RESUME</span>
          </button>

          {/* Contact Tunnel */}
          <button
            onClick={() => openModal('contact')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#050505] font-black text-xs font-mono tracking-wider uppercase transition-all cursor-pointer shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            title="Contact Tunnel"
          >
            <Send className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">CONTACT</span>
          </button>

          {/* Terminal Console */}
          <button
            onClick={toggleTerminal}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#0D0D0D]/95 backdrop-blur-md border border-[#262626] text-xs font-mono text-white hover:border-white hover:bg-[#171717] transition-all cursor-pointer shadow-xl"
            title="Terminal Console (~)"
          >
            <Terminal className="w-4 h-4 text-[#D4AF37]" />
          </button>

          {/* Mini-Map Toggle */}
          <button
            onClick={toggleMiniMap}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#0D0D0D]/95 backdrop-blur-md border border-[#262626] text-xs font-mono text-slate-300 hover:border-slate-500 hover:bg-[#171717] transition-all cursor-pointer shadow-xl"
            title="Tactical Radar Map (M)"
          >
            <MapIcon className="w-4 h-4 text-white" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#0D0D0D]/95 backdrop-blur-md border border-[#262626] text-xs font-mono text-slate-300 hover:border-slate-500 hover:bg-[#171717] transition-all cursor-pointer shadow-xl flex items-center gap-1.5"
            title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden lg:inline text-[10px] text-slate-400">SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                <span className="hidden lg:inline text-[10px] text-[#D4AF37]">SOUND ON</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Quick Navigation Bar */}
      <div className="pointer-events-auto flex md:hidden items-center justify-center gap-1 bg-[#0D0D0D]/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#262626] shadow-xl max-w-sm mx-auto overflow-x-auto w-full">
        <NavButton active={cameraZone === 'pitch'} onClick={() => focusZone('pitch')} label="PITCH" />
        <NavButton active={cameraZone === 'goals'} onClick={() => focusZone('goals')} label="PROJECTS" />
        <NavButton active={cameraZone === 'trophies'} onClick={handleExperienceClick} label="TROPHIES" />
        <NavButton active={cameraZone === 'lockers'} onClick={handleSkillsClick} label="LOCKERS" />
        <NavButton active={cameraZone === 'tactical'} onClick={handleTacticsClick} label="TACTICS" />
        <NavButton active={cameraZone === 'controlroom'} onClick={() => focusZone('controlroom')} label="CONTROL" />
        <NavButton active={false} onClick={() => openModal('profile')} label="CARD" />
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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-white text-[#050505] shadow-[0_0_12px_rgba(255,255,255,0.4)]'
          : 'text-slate-400 hover:text-white hover:bg-[#171717]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
