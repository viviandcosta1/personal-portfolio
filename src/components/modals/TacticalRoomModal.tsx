'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import { soundEngine } from '@/components/audio/SoundEngine';
import { X, Cpu, ArrowRight, CheckCircle2, Play, Sparkles, Layers, ArrowLeft } from 'lucide-react';

export function TacticalRoomModal() {
  const { activeModal, closeModal } = usePortfolio();
  const [activeStep, setActiveStep] = useState(1);

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

  const pipeline = VIVIAN_DATA.tacticalPipeline;
  const currentStage = pipeline.find(p => p.step === activeStep) || pipeline[0];

  const handleSelectStep = (step: number) => {
    setActiveStep(step);
    soundEngine.playTacticalPing();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 sm:py-10 flex justify-center items-start min-h-screen"
    >
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-[#00f0ff]/60 rounded-3xl shadow-[0_0_60px_rgba(0,240,255,0.2)] p-5 sm:p-8 my-auto overflow-hidden">
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={closeModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#00f0ff]" />
              <span>BACK TO STADIUM</span>
            </button>
            <span className="hidden sm:inline-flex text-xs font-mono font-bold text-[#00f0ff] uppercase items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40">
              <Cpu className="w-3.5 h-3.5" />
              AI / ML TACTICAL BOARDROOM
            </span>
          </div>

          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 rounded-xl bg-slate-800/60"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
            DATA-TO-PRODUCTION PIPELINE ARCHITECTURE
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mt-1">
            How Vivian transforms raw data, machine learning models, and backend APIs into robust production web applications.
          </p>
        </div>

        {/* 5-Step Pipeline Steps Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-6">
          {pipeline.map(stage => {
            const isSelected = stage.step === activeStep;
            return (
              <button
                key={stage.step}
                onClick={() => handleSelectStep(stage.step)}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#00f0ff]/15 border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className={isSelected ? 'text-[#00f0ff]' : 'text-slate-500'}>
                    0{stage.step}
                  </span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isSelected ? '#00f0ff' : '#475569' }} />
                </div>
                <div className="text-[11px] sm:text-xs font-bold font-sans uppercase mt-2 line-clamp-2 text-white">
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Deep-Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-[#00f0ff] border border-cyan-800 text-[10px] font-mono font-bold uppercase">
                {currentStage.badge}
              </span>
              <span className="text-xs font-mono font-bold text-[#ffd700]">
                MATCH POSITION: {currentStage.footballRole}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-sans">
              {currentStage.name}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed font-mono">
              {currentStage.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#00ff87] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px]">STAGE OUTPUT ARTIFACT:</span>
                <span className="text-white font-bold">{currentStage.output}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 gap-4">
            <div className="text-xs font-mono text-slate-400">
              <div className="text-[#00ff87] font-bold mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>INTEGRATION ARCHITECTURE</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div>• Scikit-Learn & Python Feature Engineering</div>
                <div>• Asynchronous FastAPI RESTful Endpoints</div>
                <div>• MongoDB / SQL Scalable Schemas</div>
                <div>• React.js Real-Time State & UI Tickers</div>
                <div>• Dockerized Container Cloud Deployment</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                disabled={activeStep === 1}
                onClick={() => handleSelectStep(activeStep - 1)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 disabled:opacity-30 cursor-pointer"
              >
                PREV STEP
              </button>
              <button
                disabled={activeStep === pipeline.length}
                onClick={() => handleSelectStep(activeStep + 1)}
                className="px-3 py-1.5 rounded-lg bg-[#00f0ff] text-slate-950 text-xs font-mono font-bold disabled:opacity-30 cursor-pointer flex items-center gap-1"
              >
                <span>NEXT STEP</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#00f0ff]" />
            <span>RETURN TO 3D STADIUM ARENA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
