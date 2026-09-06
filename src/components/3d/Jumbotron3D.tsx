'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import * as THREE from 'three';

export function Jumbotron3D() {
  const { goalsScored } = usePortfolio();
  const jumbotronRef = useRef<THREE.Group>(null);
  const scoreboard = VIVIAN_DATA.scoreboard;

  // Scoreboard Canvas Texture
  const screenTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Dark cyber backdrop
    ctx.fillStyle = '#06090e';
    ctx.fillRect(0, 0, 1024, 512);

    // Cyan top header
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 30px monospace';
    ctx.fillText('⚽ UEFA CHAMPIONS LEAGUE • DEVELOPER FINAL ⚽', 120, 50);

    // Score Board
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(40, 80, 944, 220);
    ctx.strokeStyle = '#00ff87';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 80, 944, 220);

    // Home Team: VIVIAN
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('VIVIAN DCOSTA', 80, 160);
    ctx.fillStyle = '#00ff87';
    ctx.font = 'bold 80px monospace';
    ctx.fillText(`${99 + goalsScored}`, 400, 240);

    // Separator
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 50px monospace';
    ctx.fillText(':', 500, 235);

    // Away Team: BUGS
    ctx.fillStyle = '#ff4d4d';
    ctx.font = 'bold 80px monospace';
    ctx.fillText('0', 570, 240);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('BUGS / CRASHES', 650, 160);

    // Match minute
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 32px monospace';
    ctx.fillText('TIME: 90+5\' (EXTRA TIME)', 340, 290);

    // Ticker banner
    ctx.fillStyle = '#00ff87';
    ctx.fillRect(40, 320, 944, 150);
    ctx.fillStyle = '#06090e';
    ctx.font = 'bold 32px monospace';
    ctx.fillText('🌟 EDUCATION: B.E. CSE (CGPA 8.4) • AWS CERTIFIED 🌟', 60, 370);
    ctx.fillText('🚀 DAYLINK TECH LABS • BITS AI/ML • NEXEL 🚀', 120, 425);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, [goalsScored]);

  useFrame((_, delta) => {
    if (jumbotronRef.current) {
      jumbotronRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group position={[0, 18, 0]}>
      {/* Heavy Suspension Cables from Roof */}
      {[
        [-4, 8, -4],
        [4, 8, -4],
        [-4, 8, 4],
        [4, 8, 4],
      ].map(([cx, cy, cz], idx) => (
        <mesh key={`cable-${idx}`} position={[cx / 2, cy / 2, cz / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
      ))}

      {/* Main Jumbotron Body (4-Sided) */}
      <group ref={jumbotronRef}>
        {/* Core Frame */}
        <mesh>
          <octahedronGeometry args={[5, 0]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* 4 Large Display Screens */}
        {/* North Screen */}
        <mesh position={[0, 0, -3.6]} rotation={[0, Math.PI, 0]}>
          <boxGeometry args={[6.8, 3.8, 0.2]} />
          <meshBasicMaterial map={screenTexture || undefined} />
        </mesh>
        {/* South Screen */}
        <mesh position={[0, 0, 3.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[6.8, 3.8, 0.2]} />
          <meshBasicMaterial map={screenTexture || undefined} />
        </mesh>
        {/* East Screen */}
        <mesh position={[3.6, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[6.8, 3.8, 0.2]} />
          <meshBasicMaterial map={screenTexture || undefined} />
        </mesh>
        {/* West Screen */}
        <mesh position={[-3.6, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[6.8, 3.8, 0.2]} />
          <meshBasicMaterial map={screenTexture || undefined} />
        </mesh>

        {/* Underbody Stadium Downlight */}
        <pointLight color="#00ff87" intensity={150} distance={25} position={[0, -2.5, 0]} />
      </group>
    </group>
  );
}
