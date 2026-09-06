'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';

export function StadiumStands() {
  const pitchWidth = 52;
  const pitchLength = 76;

  // East & West Main Stands (Length: 76)
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
        title="SOUTH STAND • CAMP NOU DEVOPS"
      />

      {/* Glowing Neon Stadium Roof Trusses */}
      <RoofTrusses />
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
  // Generate spectator silhouettes on the tiers
  const crowdDots = useMemo(() => {
    const dots: { x: number; y: number; z: number; color: string }[] = [];
    const colors = ['#00ff87', '#00f0ff', '#ffffff', '#38bdf8', '#a855f7'];

    for (let t = 1; t <= tiers; t++) {
      const numPeople = Math.floor(length * 1.5);
      for (let p = 0; p < numPeople; p++) {
        if (Math.random() > 0.4) {
          const x = (p / numPeople) * length - length / 2 + (Math.random() - 0.5) * 0.4;
          const y = t * 1.1 + 0.35;
          const z = t * 1.5;
          const color = colors[Math.floor(Math.random() * colors.length)];
          dots.push({ x, y, z, color });
        }
      }
    }
    return dots;
  }, [length, tiers]);

  return (
    <group position={position} rotation={rotation}>
      {/* Tiered Concrete Steps */}
      {Array.from({ length: tiers }).map((_, i) => (
        <mesh key={`tier-step-${i}`} position={[0, (i + 1) * 0.55, (i + 1) * 1.5]} receiveShadow>
          <boxGeometry args={[length, 1.1, 1.5]} />
          <meshStandardMaterial color="#111827" roughness={0.8} metalness={0.2} />
        </mesh>
      ))}

      {/* Stand Structural Back Wall */}
      <mesh position={[0, (tiers * 1.1) / 2 + 2, tiers * 1.5 + 0.8]}>
        <boxGeometry args={[length, tiers * 1.1 + 4, 1.2]} />
        <meshStandardMaterial color="#0b0f17" roughness={0.9} />
      </mesh>

      {/* Stand Banner */}
      <mesh position={[0, tiers * 1.1 + 3.5, tiers * 1.5 + 0.1]}>
        <boxGeometry args={[length * 0.7, 1.2, 0.2]} />
        <meshBasicMaterial color="#00ff87" />
      </mesh>

      {/* Crowd Silhouettes */}
      {crowdDots.slice(0, 120).map((dot, idx) => (
        <mesh key={`crowd-${idx}`} position={[dot.x, dot.y, dot.z]}>
          <boxGeometry args={[0.3, 0.45, 0.2]} />
          <meshBasicMaterial color={dot.color} />
        </mesh>
      ))}
    </group>
  );
}

function RoofTrusses() {
  return (
    <group position={[0, 24, 0]}>
      {/* Outer Stadium Glow Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[44, 46, 32]} />
        <meshBasicMaterial color="#00ff87" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[47, 48, 32]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
