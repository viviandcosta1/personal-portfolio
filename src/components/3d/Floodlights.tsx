'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function Floodlights() {
  const { floodlightsActive, timeOfDay, isMatchDay } = usePortfolio();

  const isNight = timeOfDay === 'night';

  // Positions for the 4 corner towers
  const towerPositions: [number, number, number][] = [
    [-34, 0, -46], // NW
    [34, 0, -46],  // NE
    [-34, 0, 46],  // SW
    [34, 0, 46],   // SE
  ];

  return (
    <group>
      {towerPositions.map((pos, idx) => {
        const isActive = isNight ? floodlightsActive[idx] : true;
        return (
          <FloodlightTower
            key={`tower-${idx}`}
            position={pos}
            index={idx}
            isActive={isActive}
            isNight={isNight}
            isMatchDay={isMatchDay}
          />
        );
      })}
    </group>
  );
}

function FloodlightTower({
  position,
  index,
  isActive,
  isNight,
  isMatchDay,
}: {
  position: [number, number, number];
  index: number;
  isActive: boolean;
  isNight: boolean;
  isMatchDay: boolean;
}) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  // Target coordinates pointing toward the pitch center
  const targetX = position[0] * 0.2;
  const targetZ = position[2] * 0.2;

  useFrame((_, delta) => {
    if (lightRef.current) {
      const targetIntensity = isActive ? (isMatchDay ? 1600 : isNight ? 1000 : 400) : 0;
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        targetIntensity,
        4,
        delta
      );
    }
  });

  return (
    <group position={position}>
      {/* Tower Base Concrete Plinth */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#0D0D0D" roughness={0.9} />
      </mesh>

      {/* Main Steel Truss Columns */}
      <mesh position={[0, 12, 0]}>
        <cylinderGeometry args={[0.5, 1.2, 22, 6]} />
        <meshStandardMaterial color="#171717" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Cross Lattice Bracing */}
      {[5, 10, 15, 20].map((h, i) => (
        <mesh key={`brace-${i}`} position={[0, h, 0]}>
          <boxGeometry args={[1.8, 0.2, 1.8]} />
          <meshStandardMaterial color="#262626" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}

      {/* Floodlight Head Mount Platform */}
      <group position={[0, 23, 0]}>
        <mesh rotation={[0.4 * (position[2] > 0 ? -1 : 1), 0, 0]}>
          <boxGeometry args={[6, 3, 0.8]} />
          <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 3x2 Matrix of High-Intensity Pure White LED Bulbs */}
        {[-2, 0, 2].map((bx, bi) =>
          [-0.8, 0.8].map((by, bj) => (
            <mesh
              key={`bulb-${bi}-${bj}`}
              position={[bx, by, 0.45]}
              rotation={[0.4 * (position[2] > 0 ? -1 : 1), 0, 0]}
            >
              <circleGeometry args={[0.6, 16]} />
              <meshBasicMaterial
                color={isActive ? (isMatchDay ? '#F5C542' : '#FFFFFF') : '#171717'}
              />
            </mesh>
          ))
        )}

        {/* Active Volumetric Glow Beam */}
        {isActive && isNight && (
          <mesh
            ref={glowMeshRef}
            position={[0, -6, (position[2] > 0 ? -8 : 8)]}
            rotation={[position[2] > 0 ? -0.5 : 0.5, 0, 0]}
          >
            <coneGeometry args={[6, 16, 16, 1, true]} />
            <meshBasicMaterial
              color={isMatchDay ? '#F5C542' : '#FFFFFF'}
              transparent
              opacity={isMatchDay ? 0.12 : 0.07}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Spot Light source */}
        <spotLight
          ref={lightRef}
          color={isMatchDay ? '#FEF08A' : '#FFFFFF'}
          intensity={0}
          distance={130}
          angle={Math.PI / 4}
          penumbra={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          position={[0, 0, 0]}
          target-position={[targetX - position[0], -23, targetZ - position[2]]}
        />
      </group>
    </group>
  );
}
