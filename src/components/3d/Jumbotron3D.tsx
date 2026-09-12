'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function Jumbotron3D() {
  const { goalsScored, focusZone, openModal, isMatchDay } = usePortfolio();
  const jumbotronRef = useRef<THREE.Group>(null);

  // Scoreboard Canvas Texture
  const screenTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Dark cyber backdrop
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, 1024, 512);

    // Gold top header
    ctx.fillStyle = isMatchDay ? '#F5C542' : '#D4AF37';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('👑 VIVIAN DCOSTA • MADRID NIGHT DEVELOPER ARENA 👑', 100, 50);

    // Score Board
    ctx.fillStyle = '#0D0D0D';
    ctx.fillRect(40, 80, 944, 220);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 80, 944, 220);

    // Home Team: VIVIAN
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('VIVIAN DCOSTA', 80, 155);
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('SOFTWARE DEVELOPER', 80, 195);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 70px monospace';
    ctx.fillText(`${99 + goalsScored}`, 420, 240);

    // Separator
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 50px monospace';
    ctx.fillText(':', 500, 235);

    // Away Team: BUGS / CHALLENGES
    ctx.fillStyle = '#64748B';
    ctx.font = 'bold 70px monospace';
    ctx.fillText('0', 570, 240);
    ctx.fillStyle = '#A1A1AA';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('BUGS / EXCUSES', 640, 155);
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('CGPA: 8.4 • B.E. CSE', 640, 195);

    // Match minute
    ctx.fillStyle = '#F5C542';
    ctx.font = 'bold 26px monospace';
    ctx.fillText('PROJECTS: 03   EXPERIENCE: 03   STATUS: READY FOR NEXT CHALLENGE', 60, 285);

    // Ticker banner with Mentality Quotes
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(40, 320, 944, 150);
    ctx.fillStyle = '#050505';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('⚡ DISCIPLINE BUILDS CONSISTENCY • WORK. IMPROVE. REPEAT ⚡', 60, 370);
    ctx.fillText('🏆 B.E. CSE (CGPA 8.4) • DAYLINK TECH LABS • BITS AI/ML 🏆', 70, 425);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, [goalsScored, isMatchDay]);

  useFrame((_, delta) => {
    if (jumbotronRef.current) {
      jumbotronRef.current.rotation.y += delta * (isMatchDay ? 0.04 : 0.02);
    }
  });

  return (
    <group
      position={[0, 18, 0]}
      onClick={() => {
        focusZone('pitch');
        openModal('profile');
      }}
    >
      {/* Heavy Suspension Cables from Roof */}
      {[
        [-4, 8, -4],
        [4, 8, -4],
        [-4, 8, 4],
        [4, 8, 4],
      ].map(([cx, cy, cz], idx) => (
        <mesh key={`cable-${idx}`} position={[cx / 2, cy / 2, cz / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 8]} />
          <meshStandardMaterial color="#262626" metalness={0.9} />
        </mesh>
      ))}

      {/* Main Jumbotron Body (4-Sided) */}
      <group ref={jumbotronRef}>
        {/* Core Frame */}
        <mesh>
          <octahedronGeometry args={[5, 0]} />
          <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} />
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
        <pointLight color="#D4AF37" intensity={isMatchDay ? 280 : 180} distance={28} position={[0, -2.5, 0]} />
      </group>
    </group>
  );
}
