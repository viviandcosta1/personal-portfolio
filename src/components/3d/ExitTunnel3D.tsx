'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function ExitTunnel3D() {
  const { openModal, ballPosition } = usePortfolio();

  // Proximity check
  const tunnelZ = 42;
  const dist = Math.sqrt(
    Math.pow(ballPosition[0] - 0, 2) + Math.pow(ballPosition[2] - tunnelZ, 2)
  );
  const isNear = dist < 6.0;

  return (
    <group position={[0, 0, 42]} onClick={() => openModal('contact')}>
      {/* Tunnel Floor Runway */}
      <mesh position={[0, 0.1, 4]} receiveShadow>
        <boxGeometry args={[10, 0.2, 12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Runway Floor Lighting Strips */}
      {[-4.2, 4.2].map((x, i) => (
        <mesh key={`runway-strip-${i}`} position={[x, 0.22, 4]}>
          <boxGeometry args={[0.2, 0.05, 11]} />
          <meshBasicMaterial color="#00ff87" />
        </mesh>
      ))}

      {/* 5 Illuminated Tunnel Arches */}
      {[0, 2.5, 5, 7.5, 10].map((z, idx) => (
        <group key={`arch-${idx}`} position={[0, 0, z]}>
          {/* Left Column */}
          <mesh position={[-4.5, 3, 0]}>
            <boxGeometry args={[0.6, 6, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Right Column */}
          <mesh position={[4.5, 3, 0]}>
            <boxGeometry args={[0.6, 6, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Top Beam */}
          <mesh position={[0, 6, 0]}>
            <boxGeometry args={[9.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Arch Neon Inlay */}
          <mesh position={[0, 5.8, 0.32]}>
            <boxGeometry args={[8.8, 0.1, 0.05]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      ))}

      {/* Portal Signboard */}
      <group position={[0, 7.2, 0]}>
        <mesh>
          <boxGeometry args={[12, 1.4, 0.3]} />
          <meshStandardMaterial color="#05070a" />
        </mesh>
        <mesh position={[0, 0, 0.18]}>
          <planeGeometry args={[11.6, 1.1]} />
          <meshBasicMaterial color="#00ff87" />
        </mesh>
      </group>

      {/* Interactive Portal Beacon */}
      <pointLight color="#00ff87" intensity={isNear ? 200 : 80} distance={15} position={[0, 3, 4]} />
    </group>
  );
}

export function SecretTunnel3D() {
  const { toggleTerminal, ballPosition } = usePortfolio();

  // Hidden in the South-West corner
  const secretX = -26;
  const secretZ = -34;
  const dist = Math.sqrt(
    Math.pow(ballPosition[0] - secretX, 2) + Math.pow(ballPosition[2] - secretZ, 2)
  );
  const isNear = dist < 4.5;

  return (
    <group
      position={[secretX, 0, secretZ]}
      rotation={[0, Math.PI / 4, 0]}
      onClick={toggleTerminal}
    >
      {/* Secret Hatch / Terminal Console Base */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[2.4, 1.6, 1.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Slanted Terminal Screen */}
      <mesh position={[0, 1.7, 0]} rotation={[-0.5, 0, 0]}>
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshBasicMaterial color="#00ff87" />
      </mesh>

      {/* Floating Hologram Indicator */}
      <mesh position={[0, 2.8, 0]}>
        <tetrahedronGeometry args={[0.3]} />
        <meshBasicMaterial color={isNear ? '#00f0ff' : '#a855f7'} />
      </mesh>
    </group>
  );
}
