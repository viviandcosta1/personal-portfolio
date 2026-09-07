'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { soundEngine } from '@/components/audio/SoundEngine';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

export function TerminalModal() {
  const {
    isTerminalOpen,
    toggleTerminal,
    unlockAchievement,
    triggerMentalityMode,
    focusZone,
    openModal,
    toggleMatchDay,
    toggleTimeOfDay,
  } = usePortfolio();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', text: '╔══════════════════════════════════════════════════════════════╗' },
    { type: 'system', text: '║  MADRID NIGHT DEVELOPER ARENA • TERMINAL OS v3.0             ║' },
    { type: 'system', text: '║  Vivian D\'costa • Full-Stack & AI/ML Developer Terminal      ║' },
    { type: 'system', text: '╚══════════════════════════════════════════════════════════════╝' },
    { type: 'output', text: 'Type "help" for a list of tactical console commands.' },
    { type: 'output', text: 'Type "mentality" or "7" to trigger Mentality Mode.' },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isTerminalOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    soundEngine.playUiClick();
    const newHistory: TerminalLine[] = [...history, { type: 'input', text: `vivian@stadium:~$ ${cmd}` }];

    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      newHistory.push(
        { type: 'output', text: 'AVAILABLE COMMANDS:' },
        { type: 'output', text: '  about                  - Vivian D\'costa player profile & scouting card' },
        { type: 'output', text: '  projects               - Production software & AI platforms' },
        { type: 'output', text: '  lockers / skills       - 10 Tech Stack Lockers (#07 to #16)' },
        { type: 'output', text: '  formation              - Tactical 4-2-3-1 technology formation' },
        { type: 'output', text: '  experience / trophies  - Championship career milestones' },
        { type: 'output', text: '  controlroom            - Enter developer analytics control room' },
        { type: 'output', text: '  orbs                   - Inspect 3D technology orbs' },
        { type: 'output', text: '  roof                   - Look up at stadium roof and night sky' },
        { type: 'output', text: '  matchday               - Toggle Match Day arena mode' },
        { type: 'output', text: '  daynight               - Toggle Day / Night stadium lighting' },
        { type: 'output', text: '  mentality / 7          - Trigger Number 7 Mentality Mode' },
        { type: 'output', text: '  contact                - Direct email, phone, and professional links' },
        { type: 'output', text: '  sudo unlock            - Launch stadium celebration' },
        { type: 'output', text: '  clear                  - Clear terminal screen' },
        { type: 'output', text: '  exit                   - Close terminal console' }
      );
    } else if (lower === '7' || lower === 'mentality') {
      toggleTerminal();
      triggerMentalityMode();
      return;
    } else if (lower === 'matchday') {
      toggleMatchDay();
      newHistory.push({ type: 'success', text: '>>> MATCH DAY ARENA ATMOSPHERE TOGGLED ⚽' });
    } else if (lower === 'daynight') {
      toggleTimeOfDay();
      newHistory.push({ type: 'success', text: '>>> STADIUM LIGHTING TOGGLED ☀️🌙' });
    } else if (lower === 'controlroom') {
      toggleTerminal();
      focusZone('controlroom');
      return;
    } else if (lower === 'orbs') {
      toggleTerminal();
      focusZone('techOrbs');
      return;
    } else if (lower === 'roof') {
      toggleTerminal();
      focusZone('roof');
      return;
    } else if (lower === 'sudo unlock' || lower === 'sudo make portfolio-awesome') {
      soundEngine.playGoal();
      unlockAchievement('explorer');
      try {
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#FFFFFF', '#F5C542', '#050505']
        });
      } catch {}
      newHistory.push(
        { type: 'success', text: '>>> EXECUTING AWESOMENESS OVERLOAD...' },
        { type: 'success', text: '>>> [OK] Floodlights boosted to 200%' },
        { type: 'success', text: '>>> [OK] AI Engine neural sync complete' },
        { type: 'success', text: '>>> [OK] 150 Gold particles launched' },
        { type: 'success', text: '>>> STATUS: MAXIMUM CHAMPIONSHIP ENERGY UNLOCKED ⚽👑' }
      );
    } else if (lower === 'about') {
      newHistory.push(
        { type: 'output', text: `PLAYER: ${VIVIAN_DATA.scoutingReport.player}` },
        { type: 'output', text: `POSITION: ${VIVIAN_DATA.scoutingReport.position}` },
        { type: 'output', text: `ROLE: ${VIVIAN_DATA.scoutingReport.role}` },
        { type: 'output', text: `FOOT: ${VIVIAN_DATA.scoutingReport.foot}` },
        { type: 'output', text: `LOCATION: ${VIVIAN_DATA.personal.location}` },
        { type: 'output', text: `EDUCATION: ${VIVIAN_DATA.education.degree}` }
      );
    } else if (lower === 'lockers' || lower === 'skills') {
      newHistory.push({ type: 'output', text: '10 TECH STACK LOCKERS:' });
      VIVIAN_DATA.techLockers.forEach(locker => {
        newHistory.push({
          type: 'output',
          text: `  [#${locker.number < 10 ? `0${locker.number}` : locker.number} ${locker.tech}]: ${locker.description}`
        });
      });
    } else if (lower === 'projects') {
      newHistory.push({ type: 'output', text: 'PRODUCTION SOFTWARE PROJECTS:' });
      VIVIAN_DATA.projects.forEach(p => {
        newHistory.push({
          type: 'output',
          text: `  ⚽ ${p.title} (${p.category}) - ${p.description}`
        });
      });
    } else if (lower === 'experience' || lower === 'trophies') {
      newHistory.push({ type: 'output', text: 'CAREER TIMELINE:' });
      VIVIAN_DATA.experiences.forEach(e => {
        newHistory.push({
          type: 'output',
          text: `  🏆 ${e.company} - ${e.role} (${e.period}): ${e.summary}`
        });
      });
    } else if (lower === 'formation' || lower === 'tactics') {
      toggleTerminal();
      focusZone('tactical');
      openModal('tactical');
      return;
    } else if (lower === 'contact') {
      newHistory.push(
        { type: 'output', text: `EMAIL:    ${VIVIAN_DATA.personal.email}` },
        { type: 'output', text: `PHONE:    ${VIVIAN_DATA.personal.phone}` },
        { type: 'output', text: `GITHUB:   ${VIVIAN_DATA.personal.github}` },
        { type: 'output', text: `LINKEDIN: ${VIVIAN_DATA.personal.linkedin}` },
        { type: 'output', text: `LOCATION: ${VIVIAN_DATA.personal.location}` }
      );
    } else if (lower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (lower === 'exit' || lower === 'quit') {
      toggleTerminal();
      return;
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not found: "${cmd}". Type "help" for a list of available commands.`
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="w-full max-w-3xl h-[520px] bg-[#050505] border-2 border-[#D4AF37]/60 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.25)] flex flex-col overflow-hidden font-mono text-sm text-white">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0D0D0D] border-b border-[#171717]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <span className="text-xs text-slate-400 font-bold ml-2">
              vivian@stadium-terminal: ~ (zsh)
            </span>
          </div>

          <button
            onClick={toggleTerminal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-[#171717] cursor-text"
        >
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                line.type === 'input'
                  ? 'text-white font-bold'
                  : line.type === 'system'
                  ? 'text-[#D4AF37]'
                  : line.type === 'success'
                  ? 'text-emerald-400'
                  : line.type === 'error'
                  ? 'text-rose-400'
                  : 'text-slate-300'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt Form */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 p-3 bg-[#0D0D0D] border-t border-[#171717]">
          <span className="text-[#D4AF37] font-bold">vivian@stadium:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white focus:outline-none font-mono"
            placeholder="Type a command..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
