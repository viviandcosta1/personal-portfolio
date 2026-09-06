'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Experience, SkillCategory, VIVIAN_DATA } from '@/data/portfolioData';
import { ACHIEVEMENTS, Achievement } from '@/data/achievementsData';
import { soundEngine } from '@/components/audio/SoundEngine';
import confetti from 'canvas-confetti';

export type ModalType = 
  | 'none' 
  | 'profile' 
  | 'project' 
  | 'experience' 
  | 'skills' 
  | 'tactical' 
  | 'resume' 
  | 'contact' 
  | 'achievements'
  | 'terminal';

export type CameraZone = 'entrance' | 'pitch' | 'goals' | 'trophies' | 'lockers' | 'tactical' | 'scoreboard' | 'tunnel';

interface PortfolioContextType {
  // Hero & Floodlights
  hasEnteredStadium: boolean;
  floodlightsActive: boolean[];
  enterStadium: () => void;
  resetToEntrance: () => void;

  // Active Modals & Zone Focus
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  
  // Focused items
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  openProjectModal: (p: Project) => void;

  selectedExperience: Experience | null;
  setSelectedExperience: (e: Experience | null) => void;
  openExperienceModal: (e: Experience) => void;

  selectedLocker: SkillCategory | null;
  setSelectedLocker: (s: SkillCategory | null) => void;
  openLockerModal: (s: SkillCategory) => void;

  // Camera & Navigation
  cameraZone: CameraZone;
  setCameraZone: (zone: CameraZone) => void;
  focusZone: (zone: CameraZone) => void;

  // Ball & Player Telemetry
  ballPosition: [number, number, number];
  setBallPosition: (pos: [number, number, number]) => void;
  goalsScored: number;
  triggerGoal: (points?: number) => void;

  // Arcade Penalty Shootout Minigame
  arcadeScore: number;
  shootStreak: number;
  activeShootoutProject: Project | null;
  setActiveShootoutProject: (p: Project | null) => void;
  shootTargetPos: [number, number, number] | null;
  shootTimestamp: number;
  shootAtTarget: (target: { id: string; x: number; y: number; z: number; points: number; project: Project }) => void;

  // Achievements
  unlockedAchievements: string[];
  recentAchievement: Achievement | null;
  unlockAchievement: (id: string) => void;
  dismissAchievement: () => void;

  // Audio
  isMuted: boolean;
  toggleSound: () => void;

  // Mini-map & Terminal
  isMiniMapOpen: boolean;
  toggleMiniMap: () => void;
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [hasEnteredStadium, setHasEnteredStadium] = useState(false);
  const [floodlightsActive, setFloodlightsActive] = useState<boolean[]>([false, false, false, false]);
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [cameraZone, setCameraZone] = useState<CameraZone>('entrance');

  const [selectedProject, setSelectedProject] = useState<Project | null>(VIVIAN_DATA.projects[0]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(VIVIAN_DATA.experiences[0]);
  const [selectedLocker, setSelectedLocker] = useState<SkillCategory | null>(VIVIAN_DATA.lockers[0]);

  const [ballPosition, setBallPosition] = useState<[number, number, number]>([0, 0.4, 0]);
  const [goalsScored, setGoalsScored] = useState(0);

  // Arcade Shootout Game State
  const [arcadeScore, setArcadeScore] = useState(0);
  const [shootStreak, setShootStreak] = useState(1);
  const [activeShootoutProject, setActiveShootoutProject] = useState<Project | null>(VIVIAN_DATA.projects[0]);
  const [shootTargetPos, setShootTargetPos] = useState<[number, number, number] | null>(null);
  const [shootTimestamp, setShootTimestamp] = useState(0);

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isMiniMapOpen, setIsMiniMapOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Load saved state
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedAchievements = localStorage.getItem('vivian_achievements');
    if (savedAchievements) {
      try {
        setUnlockedAchievements(JSON.parse(savedAchievements));
      } catch {}
    }
    const savedScore = localStorage.getItem('vivian_arcade_score');
    if (savedScore) {
      try {
        setArcadeScore(parseInt(savedScore, 10) || 0);
      } catch {}
    }
    setIsMuted(soundEngine.getMuted());
  }, []);

  const toggleSound = () => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
    if (!next) {
      soundEngine.playUiClick();
    }
  };

  const unlockAchievement = (id: string) => {
    if (unlockedAchievements.includes(id)) return;
    const achievement = ACHIEVEMENTS.find(a => a.id === id);
    if (!achievement) return;

    const nextList = [...unlockedAchievements, id];
    setUnlockedAchievements(nextList);
    setRecentAchievement(achievement);
    soundEngine.playAchievement();

    try {
      localStorage.setItem('vivian_achievements', JSON.stringify(nextList));
    } catch {}

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.2, x: 0.5 },
        colors: ['#00ff87', '#00f0ff', '#ffd700', '#ffffff']
      });
    } catch {}

    setTimeout(() => {
      setRecentAchievement(prev => (prev?.id === id ? null : prev));
    }, 5000);
  };

  const dismissAchievement = () => {
    setRecentAchievement(null);
  };

  const enterStadium = () => {
    setHasEnteredStadium(true);
    soundEngine.playFloodlight(0);

    // Turn on floodlights sequentially with authentic delay
    [0, 1, 2, 3].forEach(idx => {
      setTimeout(() => {
        setFloodlightsActive(prev => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
        soundEngine.playFloodlight(idx + 1);
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      setCameraZone('pitch');
      unlockAchievement('first_touch');
    }, 1500);
  };

  const resetToEntrance = () => {
    setHasEnteredStadium(false);
    setCameraZone('entrance');
    setActiveModal('none');
  };

  const openModal = (type: ModalType) => {
    soundEngine.playUiClick();
    setActiveModal(type);
    if (type === 'tactical') {
      unlockAchievement('tactical_genius');
    }
  };

  const closeModal = () => {
    soundEngine.playUiClick();
    setActiveModal('none');
  };

  const openProjectModal = (p: Project) => {
    setSelectedProject(p);
    openModal('project');
    unlockAchievement('full_stack');
  };

  const openExperienceModal = (e: Experience) => {
    setSelectedExperience(e);
    soundEngine.playTrophy();
    openModal('experience');
    unlockAchievement('trophy_hunter');
  };

  const openLockerModal = (s: SkillCategory) => {
    setSelectedLocker(s);
    soundEngine.playLocker();
    openModal('skills');
    unlockAchievement('code_builder');
  };

  const focusZone = (zone: CameraZone) => {
    soundEngine.playUiClick();
    setCameraZone(zone);
    if (zone === 'trophies') {
      unlockAchievement('trophy_hunter');
    } else if (zone === 'goals') {
      unlockAchievement('full_stack');
    } else if (zone === 'lockers') {
      unlockAchievement('code_builder');
    } else if (zone === 'tunnel') {
      unlockAchievement('explorer');
    }
  };

  const triggerGoal = (pts = 250) => {
    setGoalsScored(prev => prev + 1);
    setArcadeScore(prev => {
      const next = prev + pts * shootStreak;
      try {
        localStorage.setItem('vivian_arcade_score', next.toString());
      } catch {}
      return next;
    });
    setShootStreak(prev => Math.min(prev + 1, 5));
    soundEngine.playGoal();
    unlockAchievement('on_target');

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.4 },
        colors: ['#00ff87', '#00f0ff', '#ffffff', '#ffd700']
      });
    } catch {}
  };

  const shootAtTarget = (target: { id: string; x: number; y: number; z: number; points: number; project: Project }) => {
    setActiveShootoutProject(target.project);
    setSelectedProject(target.project);
    setShootTargetPos([target.x, target.y, target.z]);
    setShootTimestamp(Date.now());
    soundEngine.playKick(1.6);

    setTimeout(() => {
      triggerGoal(target.points);
    }, 450);
  };

  const toggleMiniMap = () => {
    soundEngine.playUiClick();
    setIsMiniMapOpen(prev => !prev);
  };

  const toggleTerminal = () => {
    soundEngine.playUiClick();
    setIsTerminalOpen(prev => !prev);
    if (!isTerminalOpen) {
      unlockAchievement('explorer');
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        hasEnteredStadium,
        floodlightsActive,
        enterStadium,
        resetToEntrance,
        activeModal,
        openModal,
        closeModal,
        selectedProject,
        setSelectedProject,
        openProjectModal,
        selectedExperience,
        setSelectedExperience,
        openExperienceModal,
        selectedLocker,
        setSelectedLocker,
        openLockerModal,
        cameraZone,
        setCameraZone,
        focusZone,
        ballPosition,
        setBallPosition,
        goalsScored,
        triggerGoal,
        arcadeScore,
        shootStreak,
        activeShootoutProject,
        setActiveShootoutProject,
        shootTargetPos,
        shootTimestamp,
        shootAtTarget,
        unlockedAchievements,
        recentAchievement,
        unlockAchievement,
        dismissAchievement,
        isMuted,
        toggleSound,
        isMiniMapOpen,
        toggleMiniMap,
        isTerminalOpen,
        toggleTerminal,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
