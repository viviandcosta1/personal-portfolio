'use client';

import React from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { useControls } from '@/hooks/useControls';
import { StadiumCanvas } from '@/components/3d/StadiumCanvas';
import { HeroOverlay } from '@/components/hud/HeroOverlay';
import { TacticalHUD } from '@/components/hud/TacticalHUD';
import { MiniMap } from '@/components/hud/MiniMap';
import { MobileControls } from '@/components/hud/MobileControls';
import { AchievementBanner } from '@/components/hud/AchievementBanner';
import { MentalityModeOverlay } from '@/components/hud/MentalityModeOverlay';
import { TrainingModeHUD } from '@/components/hud/TrainingModeHUD';
import { GoalUnlockedBanner } from '@/components/hud/GoalUnlockedBanner';
import { OutroCinematic } from '@/components/hud/OutroCinematic';
import { TerminalModal } from '@/components/hud/TerminalModal';
import { ProjectShootoutGame } from '@/components/game/ProjectShootoutGame';
import { PlayerProfileModal } from '@/components/modals/PlayerProfileModal';
import { ProjectModal } from '@/components/modals/ProjectModal';
import { ExperienceModal } from '@/components/modals/ExperienceModal';
import { SkillsModal } from '@/components/modals/SkillsModal';
import { TacticalRoomModal } from '@/components/modals/TacticalRoomModal';
import { ResumeModal } from '@/components/modals/ResumeModal';
import { ContactModal } from '@/components/modals/ContactModal';
import { AchievementsModal } from '@/components/modals/AchievementsModal';

function StadiumExperience() {
  const {
    controlsRef,
    setJoystick,
    triggerMobileKick,
    triggerMobileSprint,
    triggerMobileReset,
  } = useControls();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050505] select-none touch-none">
      {/* 3D Physics Stadium Canvas */}
      <StadiumCanvas controlsRef={controlsRef} />

      {/* Opening Cinematic Football Tunnel Hero Overlay */}
      <HeroOverlay />

      {/* Broadcast HUD */}
      <TacticalHUD />

      {/* Goal Scoring Banner */}
      <GoalUnlockedBanner />

      {/* Number 7 Mentality Mode Cinematic Overlay */}
      <MentalityModeOverlay />

      {/* Interactive Training Mode HUD */}
      <TrainingModeHUD />

      {/* Outro Cinematic */}
      <OutroCinematic />

      {/* Arcade Target Shootout Mode for Projects */}
      <ProjectShootoutGame />

      {/* Tactical Radar Mini-Map */}
      <MiniMap />

      {/* Mobile Virtual Joystick & Touch Controls */}
      <MobileControls
        onJoystickChange={setJoystick}
        onKick={triggerMobileKick}
        onSprint={triggerMobileSprint}
        onReset={triggerMobileReset}
      />

      {/* Achievement Pop-up Banner */}
      <AchievementBanner />

      {/* Interactive Developer Terminal Console */}
      <TerminalModal />

      {/* Section Feature Modals */}
      <PlayerProfileModal />
      <ProjectModal />
      <ExperienceModal />
      <SkillsModal />
      <TacticalRoomModal />
      <ResumeModal />
      <ContactModal />
      <AchievementsModal />
    </main>
  );
}

export default function Home() {
  return (
    <PortfolioProvider>
      <StadiumExperience />
    </PortfolioProvider>
  );
}
