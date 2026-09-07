'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { Project, Experience, SkillCategory, LockerItem, VIVIAN_DATA } from '@/data/portfolioData';
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
  | 'terminal'
  | 'controlroom';

export type CameraZone = 
  | 'entrance' 
  | 'pitch' 
  | 'goals' 
  | 'trophies' 
  | 'lockers' 
  | 'tactical' 
  | 'scoreboard' 
  | 'tunnel' 
  | 'roof' 
  | 'controlroom' 
  | 'techOrbs';

export type TimeOfDay = 'night' | 'day';
export type WeatherType = 'clear' | 'mist' | 'rain';
export type CursorState = 'default' | 'hover' | 'kick' | 'project' | 'discover' | 'enter';

export interface ChapterCardData {
  number: string;
  title: string;
  subtitle: string;
}

interface PortfolioContextType {
  // Hero, Boot & Floodlights
  hasEnteredStadium: boolean;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
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
  selectedTechLocker: LockerItem | null;
  setSelectedTechLocker: (l: LockerItem | null) => void;
  openLockerModal: (s: SkillCategory) => void;
  openTechLockerModal: (l: LockerItem) => void;

  // Camera & Navigation
  cameraZone: CameraZone;
  setCameraZone: (zone: CameraZone) => void;
  focusZone: (zone: CameraZone) => void;
  cameraShake: number;
  triggerCameraShake: (intensity?: number) => void;

  // Environmental Controls: Day/Night, Weather, Match Day
  timeOfDay: TimeOfDay;
  toggleTimeOfDay: () => void;
  weather: WeatherType;
  setWeather: (w: WeatherType) => void;
  isMatchDay: boolean;
  toggleMatchDay: () => void;

  // Documentary Chapter Transition Overlay
  activeChapter: ChapterCardData | null;
  triggerChapter: (number: string, title: string, subtitle: string) => void;
  dismissChapter: () => void;

  // Ball & Player Telemetry
  ballPosition: [number, number, number];
  setBallPosition: (pos: [number, number, number]) => void;
  ballVelocity: [number, number, number];
  setBallVelocity: (vel: [number, number, number]) => void;
  goalsScored: number;
  triggerGoal: (points?: number) => void;
  goalNotification: string | null;

  // Arcade Penalty Shootout Minigame
  arcadeScore: number;
  shootStreak: number;
  activeShootoutProject: Project | null;
  setActiveShootoutProject: (p: Project | null) => void;
  shootTargetPos: [number, number, number] | null;
  shootTimestamp: number;
  shootAtTarget: (target: { id: string; x: number; y: number; z: number; points: number; project: Project }) => void;

  // Mentality Mode Easter Egg (Press 7)
  isMentalityModeActive: boolean;
  triggerMentalityMode: () => void;

  // Training Mode & Outro Cinematic
  isTrainingModeActive: boolean;
  toggleTrainingMode: () => void;
  isOutroCinematicActive: boolean;
  startOutroCinematic: () => void;
  closeOutroCinematic: () => void;

  // Achievements
  unlockedAchievements: string[];
  recentAchievement: Achievement | null;
  unlockAchievement: (id: string) => void;
  dismissAchievement: () => void;

  // Custom Cursor
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;

  // Glitch Effect
  isGlitchActive: boolean;
  triggerGlitch: () => void;

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [floodlightsActive, setFloodlightsActive] = useState<boolean[]>([false, false, false, false]);
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [cameraZone, setCameraZone] = useState<CameraZone>('entrance');

  const [selectedProject, setSelectedProject] = useState<Project | null>(VIVIAN_DATA.projects[0]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(VIVIAN_DATA.experiences[0]);
  const [selectedLocker, setSelectedLocker] = useState<SkillCategory | null>(VIVIAN_DATA.lockers[0]);
  const [selectedTechLocker, setSelectedTechLocker] = useState<LockerItem | null>(VIVIAN_DATA.techLockers[0]);

  // Environment States
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
  const [weather, setWeather] = useState<WeatherType>('clear');
  const [isMatchDay, setIsMatchDay] = useState(false);

  // Camera Shake & Chapter Titles
  const [cameraShake, setCameraShake] = useState(0);
  const [activeChapter, setActiveChapter] = useState<ChapterCardData | null>(null);
  const chapterTimer = useRef<number | null>(null);

  // Ball & Player Telemetry
  const [ballPosition, setBallPosition] = useState<[number, number, number]>([0, 0.45, 0]);
  const [ballVelocity, setBallVelocity] = useState<[number, number, number]>([0, 0, 0]);
  const [goalsScored, setGoalsScored] = useState(0);
  const [goalNotification, setGoalNotification] = useState<string | null>(null);

  // Arcade Shootout Game State
  const [arcadeScore, setArcadeScore] = useState(0);
  const [shootStreak, setShootStreak] = useState(1);
  const [activeShootoutProject, setActiveShootoutProject] = useState<Project | null>(VIVIAN_DATA.projects[0]);
  const [shootTargetPos, setShootTargetPos] = useState<[number, number, number] | null>(null);
  const [shootTimestamp, setShootTimestamp] = useState(0);

  // Mentality Mode & Cinematic States
  const [isMentalityModeActive, setIsMentalityModeActive] = useState(false);
  const [isTrainingModeActive, setIsTrainingModeActive] = useState(false);
  const [isOutroCinematicActive, setIsOutroCinematicActive] = useState(false);

  // Cursor & Glitch
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isGlitchActive, setIsGlitchActive] = useState(false);

  // Achievements
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);

  // Audio & HUD toggles
  const [isMuted, setIsMuted] = useState(true);
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

  const triggerGlitch = useCallback(() => {
    setIsGlitchActive(true);
    soundEngine.playGlitch();
    setTimeout(() => {
      setIsGlitchActive(false);
    }, 380);
  }, []);

  const triggerCameraShake = useCallback((intensity = 1.0) => {
    setCameraShake(intensity);
    setTimeout(() => {
      setCameraShake(0);
    }, 450);
  }, []);

  const triggerChapter = useCallback((number: string, title: string, subtitle: string) => {
    if (chapterTimer.current) clearTimeout(chapterTimer.current);
    setActiveChapter({ number, title, subtitle });
    soundEngine.playWhoosh();
    chapterTimer.current = window.setTimeout(() => {
      setActiveChapter(null);
    }, 2800);
  }, []);

  const dismissChapter = useCallback(() => {
    if (chapterTimer.current) clearTimeout(chapterTimer.current);
    setActiveChapter(null);
  }, []);

  const toggleTimeOfDay = useCallback(() => {
    soundEngine.playUiClick();
    setTimeOfDay(prev => (prev === 'night' ? 'day' : 'night'));
    triggerGlitch();
  }, [triggerGlitch]);

  const toggleMatchDay = useCallback(() => {
    setIsMatchDay(prev => {
      const next = !prev;
      if (next) {
        soundEngine.playMatchDayFanfare();
        triggerCameraShake(1.2);
        try {
          confetti({
            particleCount: 140,
            spread: 110,
            origin: { y: 0.35 },
            colors: ['#D4AF37', '#FFFFFF', '#F5C542', '#050505']
          });
        } catch {}
      } else {
        soundEngine.playUiClick();
      }
      return next;
    });
  }, [triggerCameraShake]);

  const unlockAchievement = useCallback((id: string) => {
    setUnlockedAchievements(prevList => {
      if (prevList.includes(id)) return prevList;
      const achievement = ACHIEVEMENTS.find(a => a.id === id);
      if (!achievement) return prevList;

      const nextList = [...prevList, id];
      setRecentAchievement(achievement);
      soundEngine.playAchievement();

      try {
        localStorage.setItem('vivian_achievements', JSON.stringify(nextList));
      } catch {}

      // Trigger gold & white celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.2, x: 0.5 },
          colors: ['#D4AF37', '#FFFFFF', '#F5C542', '#171717']
        });
      } catch {}

      setTimeout(() => {
        setRecentAchievement(curr => (curr?.id === id ? null : curr));
      }, 5000);

      return nextList;
    });
  }, []);

  const dismissAchievement = () => {
    setRecentAchievement(null);
  };

  // Trigger Mentality Mode #07 Easter Egg
  const triggerMentalityMode = useCallback(() => {
    if (isMentalityModeActive) return;
    setIsMentalityModeActive(true);
    soundEngine.playMentalityMode();
    triggerCameraShake(1.5);
    unlockAchievement('mentality_07');

    try {
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#F5C542', '#FFFFFF', '#050505']
      });
    } catch {}

    setTimeout(() => {
      setIsMentalityModeActive(false);
    }, 4500);
  }, [isMentalityModeActive, unlockAchievement, triggerCameraShake]);

  // Global Keyboard '7' Easter Egg Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '7' && activeModal === 'none' && !isMentalityModeActive) {
        triggerMentalityMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, isMentalityModeActive, triggerMentalityMode]);

  const enterStadium = () => {
    setHasEnteredStadium(true);
    soundEngine.stopHeartbeat();
    soundEngine.playFloodlight(0);
    triggerChapter('01', 'KICK OFF', 'MADRID NIGHT DEVELOPER ARENA');

    // Turn on floodlights sequentially with dramatic stadium timing
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
    setIsOutroCinematicActive(false);
  };

  const openModal = (type: ModalType) => {
    soundEngine.playUiClick();
    setActiveModal(type);
    if (type === 'tactical') {
      unlockAchievement('tactical_genius');
    } else if (type === 'controlroom') {
      unlockAchievement('explorer');
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

  const openTechLockerModal = (l: LockerItem) => {
    setSelectedTechLocker(l);
    const cat = VIVIAN_DATA.lockers.find(c => c.lockerNumber === l.number) || VIVIAN_DATA.lockers[0];
    setSelectedLocker(cat);
    soundEngine.playLocker();
    openModal('skills');
    unlockAchievement('code_builder');
  };

  const focusZone = (zone: CameraZone) => {
    soundEngine.playWhoosh();
    setCameraZone(zone);

    // Trigger sports documentary chapter titles
    switch (zone) {
      case 'pitch':
        triggerChapter('01', 'THE PITCH', 'CENTRAL OPERATIONAL ZONE');
        break;
      case 'goals':
        triggerChapter('02', 'THE WORK', 'PRODUCTION ARSENAL & TARGETS');
        unlockAchievement('full_stack');
        break;
      case 'trophies':
        triggerChapter('03', 'THE JOURNEY', 'CHAMPIONSHIP CAREER MILESTONES');
        unlockAchievement('trophy_hunter');
        break;
      case 'lockers':
        triggerChapter('04', 'THE ARSENAL', '10 TECH STACK LOCKERS');
        unlockAchievement('code_builder');
        break;
      case 'tactical':
        triggerChapter('05', 'FORMATION', '4-2-3-1 SYSTEM ARCHITECTURE');
        break;
      case 'controlroom':
        triggerChapter('06', 'CONTROL ROOM', 'ANALYTICS & DEVOPS SUITE');
        unlockAchievement('explorer');
        break;
      case 'roof':
        triggerChapter('07', 'THE ROOF', 'STADIUM CANOPY & NIGHT SKY');
        break;
      case 'techOrbs':
        triggerChapter('08', 'TECH ORBS', '3D ENGINE & CLOUD INFRASTRUCTURE');
        break;
      case 'tunnel':
        triggerChapter('09', 'THE TUNNEL', 'GATEWAY & CONTACT NETWORK');
        unlockAchievement('explorer');
        break;
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
    setShootStreak(prev => Math.min(prev + 1, 7));
    soundEngine.playGoal();
    triggerCameraShake(1.6);
    unlockAchievement('on_target');

    // Trigger Gold Goal Notification
    setGoalNotification("GOAL! PROJECT UNLOCKED.");
    setTimeout(() => {
      setGoalNotification(null);
    }, 3200);

    try {
      confetti({
        particleCount: 120,
        spread: 95,
        origin: { y: 0.4 },
        colors: ['#D4AF37', '#FFFFFF', '#F5C542', '#050505']
      });
    } catch {}
  };

  const shootAtTarget = (target: { id: string; x: number; y: number; z: number; points: number; project: Project }) => {
    setActiveShootoutProject(target.project);
    setSelectedProject(target.project);
    setShootTargetPos([target.x, target.y, target.z]);
    setShootTimestamp(Date.now());
    soundEngine.playKick(1.6);
    triggerCameraShake(0.6);

    setTimeout(() => {
      triggerGoal(target.points);
    }, 450);
  };

  const toggleTrainingMode = () => {
    soundEngine.playUiClick();
    setIsTrainingModeActive(prev => !prev);
  };

  const startOutroCinematic = () => {
    soundEngine.playUiClick();
    setIsOutroCinematicActive(true);
    setCameraZone('pitch');
  };

  const closeOutroCinematic = () => {
    setIsOutroCinematicActive(false);
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
        isLoaded,
        setIsLoaded,
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
        selectedTechLocker,
        setSelectedTechLocker,
        openLockerModal,
        openTechLockerModal,
        cameraZone,
        setCameraZone,
        focusZone,
        cameraShake,
        triggerCameraShake,
        timeOfDay,
        toggleTimeOfDay,
        weather,
        setWeather,
        isMatchDay,
        toggleMatchDay,
        activeChapter,
        triggerChapter,
        dismissChapter,
        ballPosition,
        setBallPosition,
        ballVelocity,
        setBallVelocity,
        goalsScored,
        triggerGoal,
        goalNotification,
        arcadeScore,
        shootStreak,
        activeShootoutProject,
        setActiveShootoutProject,
        shootTargetPos,
        shootTimestamp,
        shootAtTarget,
        isMentalityModeActive,
        triggerMentalityMode,
        isTrainingModeActive,
        toggleTrainingMode,
        isOutroCinematicActive,
        startOutroCinematic,
        closeOutroCinematic,
        unlockedAchievements,
        recentAchievement,
        unlockAchievement,
        dismissAchievement,
        cursorState,
        setCursorState,
        isGlitchActive,
        triggerGlitch,
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
