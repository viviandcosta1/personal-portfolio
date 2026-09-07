'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { soundEngine } from '@/components/audio/SoundEngine';
import { X, Cpu, ArrowRight, CheckCircle2, Play, Sparkles, Layers, ArrowLeft, Shield, Zap } from 'lucide-react';

export function TacticalRoomModal() {
  const { activeModal, closeModal } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'formation' | 'pipeline'>('formation');
  const [selectedPositionId, setSelectedPositionId] = useState('ST');
  const [activePipelineStep, setActivePipelineStep] = useState(1);
  const [isPlayingPass, setIsPlayingPass] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal === 'tactical') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  if (activeModal !== 'tactical') return null;

  const formation = VIVIAN_DATA.tacticalFormation;
  const currentPos = formation.find(p => p.positionId === selectedPositionId) || formation[0];

  const pipeline = VIVIAN_DATA.tacticalPipeline;
  const currentStage = pipeline.find(p => p.step === activePipelineStep) || pipeline[0];

  const handleSelectPos = (posId: string) => {
    setSelectedPositionId(posId);
    soundEngine.playTacticalPing();
  };

  const handleSelectStep = (step: number) => {
    setActivePipelineStep(step);
    soundEngine.playTacticalPing();
  };

  // Simulate passing play through architecture
  const handlePlayPassingSequence = () => {
    if (isPlayingPass) return;
    setIsPlayingPass(true);
    let step = 1;
    setActivePipelineStep(step);
    soundEngine.playKick(0.8);

    const interval = setInterval(() => {
      step += 1;
      if (step <= pipeline.length) {
        setActivePipelineStep(step);
        soundEngine.playKick(0.8 + step * 0.1);
      } else {
        clearInterval(interval);
        setIsPlayingPass(false);
        soundEngine.playGoal();
      }
    }, 600);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen text-white select-none"
    >
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#0D0D0D] via-[#050505] to-[#050505] border-2 border-[#D4AF37]/60 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.25)] p-5 sm:p-8 my-auto overflow-hidden">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#171717]">
          <div className="flex items-center gap-2">
            <button
              onClick={closeModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] border border-[#262626] text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
              <span>BACK TO STADIUM</span>
            </button>
            <span className="hidden sm:inline-flex text-xs font-mono font-bold text-[#D4AF37] uppercase items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40">
              <Cpu className="w-3.5 h-3.5" />
              TACTICAL FORMATION & ARCHITECTURE
            </span>
          </div>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 rounded-xl bg-[#171717]"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-between gap-4 border-b border-[#171717] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('formation');
                soundEngine.playUiClick();
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'formation'
                  ? 'bg-white text-[#050505] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-[#0D0D0D] text-slate-400 hover:text-white border border-[#262626]'
              }`}
            >
              ⚽ TECH STACK FORMATION
            </button>
            <button
              onClick={() => {
                setActiveTab('pipeline');
                soundEngine.playUiClick();
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-white text-[#050505] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-[#0D0D0D] text-slate-400 hover:text-white border border-[#262626]'
              }`}
            >
              🔄 ARCHITECTURE PASSING FLOW
            </button>
          </div>

          {activeTab === 'pipeline' && (
            <button
              onClick={handlePlayPassingSequence}
              disabled={isPlayingPass}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5C542] text-[#050505] font-mono text-xs font-black uppercase transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>SIMULATE PASSING PLAY</span>
            </button>
          )}
        </div>

        {/* Tab 1: Football Formation (4-2-3-1 Tech Stack Formation) */}
        {activeTab === 'formation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
            {/* Tactical Pitch Formation View */}
            <div className="lg:col-span-6 bg-[#081F12] border border-[#171717] rounded-3xl p-4 sm:p-6 relative aspect-[3/4] sm:aspect-[4/5] flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Pitch Markings */}
              <div className="absolute inset-2 border-2 border-white/20 rounded-2xl pointer-events-none" />
              <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 border-t border-white/20 pointer-events-none" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-white/20 rounded-full pointer-events-none" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-20 border-b border-x border-white/20 pointer-events-none" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-40 h-20 border-t border-x border-white/20 pointer-events-none" />

              {/* Formation Title Overlay */}
              <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                <span>TACTICAL BOARD: 4-2-3-1</span>
                <span>MATCHDAY FORMATION</span>
              </div>

              {/* Interactive Player Position Nodes */}
              <div className="relative z-10 w-full h-full">
                {formation.map(pos => {
                  const isSelected = selectedPositionId === pos.positionId;
                  return (
                    <button
                      key={pos.positionId}
                      onClick={() => handleSelectPos(pos.positionId)}
                      style={{
                        left: `${pos.coordinates.x}%`,
                        top: `${pos.coordinates.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="absolute group cursor-pointer flex flex-col items-center"
                    >
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-black text-xs font-mono transition-all duration-300 ${
                          isSelected
                            ? 'bg-white text-[#050505] border-[#D4AF37] scale-110 shadow-[0_0_25px_rgba(255,255,255,0.8)]'
                            : 'bg-[#050505]/90 text-white border-white/40 hover:border-white hover:scale-105'
                        }`}
                      >
                        {pos.positionId}
                      </div>
                      <span className="mt-1 px-1.5 py-0.5 rounded bg-[#050505]/80 text-[10px] font-mono text-[#D4AF37] font-bold uppercase whitespace-nowrap shadow">
                        {pos.technology}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Footer Note */}
              <div className="relative z-10 text-center text-[10px] font-mono text-slate-400">
                CLICK ANY POSITION TO INSPECT SYSTEM ROLE
              </div>
            </div>

            {/* Selected Position Details */}
            <div className="lg:col-span-6 flex flex-col gap-4 p-6 rounded-3xl bg-[#0D0D0D] border border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-mono font-bold uppercase">
                  {currentPos.badge}
                </span>
                <span className="text-xs font-mono font-bold text-white uppercase">
                  POSITION: {currentPos.positionId}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white uppercase font-sans">
                {currentPos.technology}
              </h3>

              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase">
                {currentPos.roleName}
              </div>

              <p className="text-slate-300 text-sm font-mono leading-relaxed bg-[#050505] p-4 rounded-2xl border border-[#171717]">
                {currentPos.description}
              </p>

              <div className="p-3.5 rounded-xl bg-[#050505] border border-[#171717] flex items-start gap-2.5 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">PRODUCTION READINESS:</span>
                  <span className="text-white font-bold">Tested in production workflows and high-volume systems.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Architectural Passing Flow */}
        {activeTab === 'pipeline' && (
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
                DATA-TO-PRODUCTION PASSING FLOW
              </h2>
              <p className="text-slate-400 font-mono text-xs sm:text-sm mt-1">
                How Vivian connects client requests, asynchronous APIs, machine learning pipelines, and containerized cloud deployments.
              </p>
            </div>

            {/* 6-Step Passing Pipeline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {pipeline.map(stage => {
                const isSelected = stage.step === activePipelineStep;
                return (
                  <button
                    key={stage.step}
                    onClick={() => handleSelectStep(stage.step)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white text-[#050505] border-[#D4AF37] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                        : 'bg-[#0D0D0D] border-[#262626] hover:border-white text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className={isSelected ? 'text-[#050505]' : 'text-slate-500'}>
                        0{stage.step}
                      </span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isSelected ? '#D4AF37' : '#262626' }} />
                    </div>
                    <div className={`text-[11px] font-bold font-sans uppercase mt-2 line-clamp-2 ${isSelected ? 'text-[#050505]' : 'text-white'}`}>
                      {stage.node}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-3xl bg-[#0D0D0D] border border-[#262626]">
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-mono font-bold uppercase">
                    {currentStage.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    PLAY ROLE: {currentStage.footballRole}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-sans">
                  {currentStage.name}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed font-mono">
                  {currentStage.description}
                </p>

                <div className="p-3 rounded-xl bg-[#050505] border border-[#171717] flex items-start gap-2.5 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">STAGE DELIVERABLE:</span>
                    <span className="text-white font-bold">{currentStage.output}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-2xl bg-[#050505] border border-[#171717] gap-4">
                <div className="text-xs font-mono text-slate-400">
                  <div className="text-[#D4AF37] font-bold mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>SYSTEM ARCHITECTURE NODE</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div>• Next.js / React UI Client Interface</div>
                    <div>• Asynchronous Node.js & FastAPI REST Services</div>
                    <div>• Python Data Engineering & Scikit-Learn Pipelines</div>
                    <div>• MongoDB & Relational MySQL Transactions</div>
                    <div>• Containerized Cloud Deployment on AWS</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#171717]">
                  <button
                    disabled={activePipelineStep === 1}
                    onClick={() => handleSelectStep(activePipelineStep - 1)}
                    className="px-3 py-1.5 rounded-lg bg-[#171717] text-xs font-mono text-slate-300 disabled:opacity-30 cursor-pointer"
                  >
                    PREV STEP
                  </button>
                  <button
                    disabled={activePipelineStep === pipeline.length}
                    onClick={() => handleSelectStep(activePipelineStep + 1)}
                    className="px-3 py-1.5 rounded-lg bg-white text-[#050505] text-xs font-mono font-bold disabled:opacity-30 cursor-pointer flex items-center gap-1"
                  >
                    <span>NEXT STEP</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-[#171717] flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-[#0D0D0D] hover:bg-[#171717] text-white font-mono text-xs font-bold border border-[#262626] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>RETURN TO 3D STADIUM ARENA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
