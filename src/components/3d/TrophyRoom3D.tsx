'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA, Experience } from '@/data/portfolioData';
import * as THREE from 'three';

export function TrophyRoom3D() {
  const { openExperienceModal, ballPosition, isMatchDay } = usePortfolio();
  const experiences = VIVIAN_DATA.experiences;

  return (
    <group position={[28, 0, 0]}>
      {/* High-Intensity Pure White Spotlight */}
      <spotLight
        position={[0, 14, 0]}
        target-position={[0, 2, 0]}
        intensity={isMatchDay ? 1800 : 1200}
        distance={35}
        angle={Math.PI / 2.5}
        penumbra={0.3}
        color="#FFFFFF"
        castShadow
      />
      <pointLight position={[0, 6, 0]} intensity={isMatchDay ? 600 : 450} color="#D4AF37" distance={22} />

      {/* Black Marble Trophy Stage Floor */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[7.2, 7.6, 0.4, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.95} />
      </mesh>

      {/* Stage Metallic Gold Border */}
      <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.0, 7.4, 32]} />
        <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} />
      </mesh>

      {/* Trophy Stage Backdrop Screen */}
      <mesh position={[2.5, 3.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[14, 6.5, 0.2]} />
        <meshStandardMaterial color="#0D0D0D" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[2.38, 3.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[13.6, 6.1]} />
        <meshBasicMaterial color="#171717" />
      </mesh>

      {/* Header Trophy Banner */}
      <group position={[2.2, 6.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[12, 1, 0.2]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>

      {/* 3 Trophy Pedestals */}
      {experiences.map((exp, idx) => {
        const zPos = (idx - 1) * 3.8;
        return (
          <TrophyPlinth
            key={exp.id}
            experience={exp}
            position={[0, 0.4, zPos]}
            index={idx}
            onSelect={() => openExperienceModal(exp)}
            ballPosition={ballPosition}
          />
        );
      })}
    </group>
  );
}

function TrophyPlinth({
  experience,
  position,
  index,
  onSelect,
  ballPosition,
}: {
  experience: Experience;
  position: [number, number, number];
  index: number;
  onSelect: () => void;
  ballPosition: [number, number, number];
}) {
  const trophyRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Proximity check to ball
  const worldX = 28 + position[0];
  const worldZ = position[2];
  const distToBall = Math.sqrt(
    Math.pow(ballPosition[0] - worldX, 2) + Math.pow(ballPosition[2] - worldZ, 2)
  );
  const isNear = distToBall < 3.5;

  useFrame((_, delta) => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y += delta * (isNear ? 2.2 : 1.0);
      trophyRef.current.position.y = 2.4 + Math.sin(Date.now() * 0.002 + index) * 0.12;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z += delta * 0.6;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Illuminated Gold Light */}
      <pointLight color="#D4AF37" intensity={200} distance={9} position={[0, 3, 0]} />

      {/* Dark Marble Plinth */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow onClick={onSelect}>
        <cylinderGeometry args={[1.1, 1.3, 2, 16]} />
        <meshStandardMaterial
          color="#171717"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Plinth Gold Ring */}
      <mesh position={[0, 2.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.15, 24]} />
        <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating 3D Metallic Gold Trophy */}
      <group ref={trophyRef} position={[0, 2.4, 0]} onClick={onSelect}>
        {/* Base */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.5, 0.3, 16]} />
          <meshStandardMaterial color="#050505" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 0.6, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.98} roughness={0.06} />
        </mesh>
        {/* Cup Body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.55, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.98} roughness={0.05} side={THREE.DoubleSide} />
        </mesh>
        {/* Handles */}
        <mesh position={[0.55, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.28, 0.06, 8, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.98} roughness={0.06} />
        </mesh>
        <mesh position={[-0.55, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[0.28, 0.06, 8, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.98} roughness={0.06} />
        </mesh>

        {/* Aura Ring */}
        <mesh ref={glowRef} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.9, 16]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Floating Info Banner */}
      <group position={[0, 3.8, 0]}>
        <mesh>
          <planeGeometry args={[3.2, 0.8]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.1, 0.7]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
      </group>
    </group>
  );
}
