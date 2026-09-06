'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA, SkillCategory } from '@/data/portfolioData';
import * as THREE from 'three';

export function LockerRoom3D() {
  const { openLockerModal, ballPosition } = usePortfolio();
  const lockers = VIVIAN_DATA.lockers;

  return (
    <group position={[-28, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Dedicated High-Intensity Locker Room Spotlights */}
      <spotLight
        position={[0, 14, 4]}
        target-position={[0, 2.5, 0]}
        intensity={1000}
        distance={30}
        angle={Math.PI / 2.5}
        penumbra={0.3}
        color="#e0f2fe"
        castShadow
      />
      <pointLight position={[0, 6, 2]} intensity={350} color="#00ff87" distance={20} />

      {/* Locker Bay Floor Platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[20, 0.4, 6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Locker Bay Back Wall */}
      <mesh position={[0, 3.2, -2.5]}>
        <boxGeometry args={[20, 6, 0.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>

      {/* Header Neon Sign */}
      <mesh position={[0, 6.4, -2.2]}>
        <boxGeometry args={[16, 1.0, 0.2]} />
        <meshBasicMaterial color="#00ff87" />
      </mesh>

      {/* 5 Lockers */}
      {lockers.map((locker, idx) => {
        const xPos = (idx - 2) * 3.6;
        return (
          <LockerUnit
            key={locker.id}
            locker={locker}
            position={[xPos, 0.4, 0]}
            onSelect={() => openLockerModal(locker)}
            ballPosition={ballPosition}
          />
        );
      })}
    </group>
  );
}

function LockerUnit({
  locker,
  position,
  onSelect,
  ballPosition,
}: {
  locker: SkillCategory;
  position: [number, number, number];
  onSelect: () => void;
  ballPosition: [number, number, number];
}) {
  const doorRef = useRef<THREE.Group>(null);
  const jerseyRef = useRef<THREE.Group>(null);

  const worldX = -28 + position[2];
  const worldZ = position[0];
  const distToBall = Math.sqrt(
    Math.pow(ballPosition[0] - worldX, 2) + Math.pow(ballPosition[2] - worldZ, 2)
  );
  const isOpen = distToBall < 4.0;

  useFrame((_, delta) => {
    if (doorRef.current) {
      const targetRotation = isOpen ? -Math.PI * 0.55 : 0;
      doorRef.current.rotation.y = THREE.MathUtils.damp(
        doorRef.current.rotation.y,
        targetRotation,
        6,
        delta
      );
    }
    if (jerseyRef.current) {
      jerseyRef.current.position.y = 2.8 + Math.sin(Date.now() * 0.003) * 0.08;
      jerseyRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group position={position} onClick={onSelect}>
      {/* Individual Locker Light */}
      <pointLight color="#00f0ff" intensity={60} distance={6} position={[0, 3, 1]} />

      {/* Locker Frame Outer Box */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 5, 2.2]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Locker Interior Cavity */}
      <mesh position={[0, 2.5, 0.1]}>
        <boxGeometry args={[2.7, 4.7, 2]} />
        <meshStandardMaterial color="#0b1329" roughness={0.8} />
      </mesh>

      {/* Futuristic Floating Jersey inside Locker */}
      <group ref={jerseyRef} position={[0, 2.8, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 1.8, 0.2]} />
          <meshStandardMaterial color="#00ff87" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[-0.85, 0.4, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.5, 0.6, 0.18]} />
          <meshStandardMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0.85, 0.4, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.5, 0.6, 0.18]} />
          <meshStandardMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.1, 0.11]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Hinged Locker Door */}
      <group ref={doorRef} position={[-1.4, 2.5, 1.1]}>
        <mesh position={[1.4, 0, 0]} castShadow>
          <boxGeometry args={[2.8, 4.8, 0.1]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>
        {[1.2, 0.8, 0.4].map((vy, vi) => (
          <mesh key={`vent-${vi}`} position={[1.4, vy, 0.06]}>
            <boxGeometry args={[1.8, 0.08, 0.04]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
        ))}
        <mesh position={[1.4, 1.8, 0.08]}>
          <planeGeometry args={[1, 0.6]} />
          <meshBasicMaterial color="#00ff87" />
        </mesh>
        <mesh position={[2.4, 0, 0.12]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} />
        </mesh>
      </group>

      {/* Floor Neon Marker */}
      <mesh position={[0, 0.02, 1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.25, 16]} />
        <meshBasicMaterial color={isOpen ? '#00ff87' : '#38bdf8'} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
