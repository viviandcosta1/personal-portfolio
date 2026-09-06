'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { soundEngine } from '@/components/audio/SoundEngine';
import confetti from 'canvas-confetti';
import { Terminal as TermIcon, X, Maximize2, Minimize2 } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

export function TerminalModal() {
  const { isTerminalOpen, toggleTerminal, unlockAchievement } = usePortfolio();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', text: '╔══════════════════════════════════════════════════════════════╗' },
    { type: 'system', text: '║  CAMP NOU DEVOPS ARENA • DEVELOPER OS v2.6.0                 ║' },
    { type: 'system', text: '║  Vivian Dcosta • Full-Stack & AI/ML Developer Terminal       ║' },
    { type: 'system', text: '╚══════════════════════════════════════════════════════════════╝' },
    { type: 'output', text: 'Type "help" for a list of tactical console commands.' },
    { type: 'output', text: 'Try typing "sudo make portfolio-awesome" for a special stadium effect.' },
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
        { type: 'output', text: '  about                  - Vivian Dcosta scouting report & player profile' },
        { type: 'output', text: '  skills                 - Technical capabilities breakdown across 5 lockers' },
        { type: 'output', text: '  projects               - Production engineering projects' },
        { type: 'output', text: '  experience             - Career championship timeline' },
        { type: 'output', text: '  stats                  - Official EA FC style player stats' },
        { type: 'output', text: '  contact                - Direct email, phone, and social links' },
        { type: 'output', text: '  sudo make portfolio-awesome - Unleash stadium celebration' },
        { type: 'output', text: '  clear                  - Clear terminal screen' },
        { type: 'output', text: '  exit                   - Close terminal console' }
      );
    } else if (lower === 'sudo make portfolio-awesome' || lower === 'sudo make portfolio-awesome;') {
      soundEngine.playGoal();
      unlockAchievement('explorer');
      try {
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#00ff87', '#00f0ff', '#ffd700', '#ff007f']
        });
      } catch {}
      newHistory.push(
        { type: 'success', text: '>>> EXECUTING AWESOMENESS OVERLOAD...' },
        { type: 'success', text: '>>> [OK] Floodlights boosted to 200%' },
        { type: 'success', text: '>>> [OK] AI Engine neural sync complete' },
        { type: 'success', text: '>>> [OK] 150 Confetti particles launched' },
        { type: 'success', text: '>>> STATUS: MAXIMUM CHAMPIONSHIP ENERGY UNLOCKED ⚽🔥' }
      );
    } else if (lower === 'about') {
      newHistory.push(
        { type: 'output', text: `PLAYER: ${VIVIAN_DATA.scoutingReport.player}` },
        { type: 'output', text: `POSITION: ${VIVIAN_DATA.scoutingReport.position}` },
        { type: 'output', text: `SPECIALITY: ${VIVIAN_DATA.scoutingReport.speciality}` },
        { type: 'output', text: `LOCATION: ${VIVIAN_DATA.personal.location}` },
        { type: 'output', text: `EDUCATION: ${VIVIAN_DATA.education.degree}` },
        { type: 'output', text: `CGPA: ${VIVIAN_DATA.education.cgpa}` }
      );
    } else if (lower === 'skills') {
      newHistory.push({ type: 'output', text: 'TECHNICAL MATRIX:' });
      VIVIAN_DATA.lockers.forEach(locker => {
        newHistory.push({
          type: 'output',
          text: `  [#${locker.lockerNumber} ${locker.name}]: ${locker.skills.map(s => s.name).join(', ')}`
        });
      });
    } else if (lower === 'projects') {
      newHistory.push({ type: 'output', text: 'PRODUCTION PROJECTS:' });
      VIVIAN_DATA.projects.forEach(p => {
        newHistory.push({
          type: 'output',
          text: `  ⚽ ${p.title} (${p.category}) - ${p.description}`
        });
      });
    } else if (lower === 'experience') {
      newHistory.push({ type: 'output', text: 'CAREER TIMELINE:' });
      VIVIAN_DATA.experiences.forEach(e => {
        newHistory.push({
          type: 'output',
          text: `  🏆 ${e.company} - ${e.role} (${e.period}): ${e.summary}`
        });
      });
    } else if (lower === 'stats') {
      newHistory.push(
        { type: 'output', text: `OVERALL OVR: ${VIVIAN_DATA.scoutingReport.overallRating}/100` },
        { type: 'output', text: `  PACE (Rapid shipping): 93` },
        { type: 'output', text: `  SHOOTING (Problem Solving): 95` },
        { type: 'output', text: `  PASSING (API & Integration): 92` },
        { type: 'output', text: `  DRIBBLING (Code Architecture): 91` },
        { type: 'output', text: `  DEFENDING (Testing & Reliability): 94` },
        { type: 'output', text: `  PHYSICAL (Continuous Learning): 95` }
      );
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl h-[520px] bg-[#05090f] border-2 border-[#00ff87]/60 rounded-2xl shadow-[0_0_50px_rgba(0,255,135,0.25)] flex flex-col overflow-hidden font-mono text-sm">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
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
          className="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 cursor-text"
        >
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                line.type === 'input'
                  ? 'text-cyan-300 font-bold'
                  : line.type === 'system'
                  ? 'text-[#00ff87]'
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
        <form onSubmit={handleCommand} className="flex items-center gap-2 p-3 bg-slate-950 border-t border-slate-800">
          <span className="text-[#00ff87] font-bold">vivian@stadium:~$</span>
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
