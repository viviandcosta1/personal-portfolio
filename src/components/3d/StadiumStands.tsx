'use client';

import React, { useMemo } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function StadiumStands() {
  const pitchWidth = 52;
  const pitchLength = 76;

  return (
    <group>
      {/* East Grandstand */}
      <GrandstandTier
        position={[pitchWidth / 2 + 10, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        length={pitchLength + 10}
        tiers={8}
        title="EAST STAND • DAYLINK TECH ENCLOSURE"
      />

      {/* West Grandstand */}
      <GrandstandTier
        position={[-pitchWidth / 2 - 10, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        length={pitchLength + 10}
        tiers={8}
        title="WEST STAND • FULL STACK SECTOR"
      />

      {/* North Grandstand (Training End) */}
      <GrandstandTier
        position={[0, 0, -pitchLength / 2 - 10]}
        rotation={[0, 0, 0]}
        length={pitchWidth + 10}
        tiers={6}
        title="NORTH STAND • AI/ML INTELLIGENCE HUB"
      />

      {/* South Grandstand (Exit & Press End) */}
      <GrandstandTier
        position={[0, 0, pitchLength / 2 + 10]}
        rotation={[0, Math.PI, 0]}
        length={pitchWidth + 10}
        tiers={6}
        title="SOUTH STAND • MADRID NIGHT DEVOPS"
      />
    </group>
  );
}

function GrandstandTier({
  position,
  rotation,
  length,
  tiers,
  title,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
  tiers: number;
  title: string;
}) {
  const { timeOfDay, isMatchDay } = usePortfolio();
  const isNight = timeOfDay === 'night';

  // Generate spectator points for high-performance single-draw rendering
  const { crowdPositions, crowdColors } = useMemo(() => {
    const dots: { x: number; y: number; z: number; color: THREE.Color }[] = [];
    const colors = isNight
      ? ['#FFFFFF', '#D4AF37', '#F5C542', '#A1A1AA', '#E4E4E7'].map(c => new THREE.Color(c))
      : ['#FFFFFF', '#38BDF8', '#D4AF37', '#64748B', '#0F172A'].map(c => new THREE.Color(c));

    for (let t = 1; t <= tiers; t++) {
      const numPeople = Math.floor(length * 1.2);
      for (let p = 0; p < numPeople; p++) {
        if (Math.random() > 0.45) {
          const x = (p / numPeople) * length - length / 2 + (Math.random() - 0.5) * 0.4;
          const y = t * 1.1 + 0.35;
          const z = t * 1.5;
          const color = colors[Math.floor(Math.random() * colors.length)];
          dots.push({ x, y, z, color });
        }
      }
    }

    const pos = new Float32Array(dots.length * 3);
    const col = new Float32Array(dots.length * 3);
    for (let i = 0; i < dots.length; i++) {
      pos[i * 3] = dots[i].x;
      pos[i * 3 + 1] = dots[i].y;
      pos[i * 3 + 2] = dots[i].z;
      col[i * 3] = dots[i].color.r;
      col[i * 3 + 1] = dots[i].color.g;
      col[i * 3 + 2] = dots[i].color.b;
    }

    return { crowdPositions: pos, crowdColors: col };
  }, [length, tiers, isNight]);

  return (
    <group position={position} rotation={rotation}>
      {/* Tiered Concrete Steps */}
      {Array.from({ length: tiers }).map((_, i) => (
        <mesh key={`tier-step-${i}`} position={[0, (i + 1) * 0.55, (i + 1) * 1.5]} receiveShadow>
          <boxGeometry args={[length, 1.1, 1.5]} />
          <meshStandardMaterial
            color={isNight ? '#0D0D0D' : '#334155'}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Stand Structural Back Wall */}
      <mesh position={[0, (tiers * 1.1) / 2 + 2, tiers * 1.5 + 0.8]}>
        <boxGeometry args={[length, tiers * 1.1 + 4, 1.2]} />
        <meshStandardMaterial color={isNight ? '#050505' : '#1E293B'} roughness={0.9} />
      </mesh>

      {/* Stand Banner */}
      <mesh position={[0, tiers * 1.1 + 3.5, tiers * 1.5 + 0.1]}>
        <boxGeometry args={[length * 0.7, 1.2, 0.2]} />
        <meshBasicMaterial color={isMatchDay ? '#F5C542' : '#FFFFFF'} />
      </mesh>

      {/* High-Performance Instanced Crowd Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[crowdPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[crowdColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.7} vertexColors />
      </points>
    </group>
  );
}
