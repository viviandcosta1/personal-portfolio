'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function TacticalBoard3D() {
  const { openModal, ballPosition } = usePortfolio();
  const hologramRef = useRef<THREE.Group>(null);

  const boardX = 22;
  const boardZ = -28;
  const dist = Math.sqrt(
    Math.pow(ballPosition[0] - boardX, 2) + Math.pow(ballPosition[2] - boardZ, 2)
  );
  const isNear = dist < 5.0;

  useFrame((_, delta) => {
    if (hologramRef.current) {
      hologramRef.current.position.y = 4.2 + Math.sin(Date.now() * 0.002) * 0.15;
    }
  });

  return (
    <group
      position={[boardX, 0, boardZ]}
      rotation={[0, -Math.PI / 4, 0]}
      onClick={() => openModal('tactical')}
    >
      {/* High-Intensity White Spotlight */}
      <spotLight
        position={[0, 14, 4]}
        target-position={[0, 4, 0]}
        intensity={1000}
        distance={30}
        angle={Math.PI / 2.5}
        penumbra={0.3}
        color="#FFFFFF"
        castShadow
      />
      <pointLight position={[0, 4, 2]} intensity={350} color="#D4AF37" distance={16} />

      {/* Base Platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[5, 5.4, 0.4, 24]} />
        <meshStandardMaterial color="#0D0D0D" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Hologram Emitter Projector Ring */}
      <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.6, 24]} />
        <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} />
      </mesh>

      {/* Holographic Tactical Screen Group */}
      <group ref={hologramRef} position={[0, 4.2, 0]}>
        {/* Holographic Screen Frame */}
        <mesh>
          <boxGeometry args={[9, 5.2, 0.15]} />
          <meshStandardMaterial
            color="#171717"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Tactical Pitch Lines on Hologram */}
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[8.4, 4.6]} />
          <meshBasicMaterial color="#262626" transparent opacity={0.6} />
        </mesh>

        {/* 5 Tactical AI Nodes: Formation Nodes */}
        {[
          { x: 0, y: 1.4, label: 'AI/ML' },
          { x: -2.4, y: 0.4, label: 'REACT' },
          { x: 2.4, y: 0.4, label: 'NODE' },
          { x: -1.2, y: -0.8, label: 'FASTAPI' },
          { x: 1.2, y: -0.8, label: 'PYTHON' },
          { x: 0, y: -1.8, label: 'AWS' },
        ].map((node, i) => (
          <group key={`tactical-node-${i}`} position={[node.x, node.y, 0.15]}>
            <mesh>
              <circleGeometry args={[0.34, 16]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, 0, -0.01]}>
              <ringGeometry args={[0.38, 0.52, 16]} />
              <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}

        {/* Tactical Connection Line */}
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[7.2, 0.04]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>

        {/* Title Header */}
        <mesh position={[0, 2.2, 0.1]}>
          <planeGeometry args={[7.0, 0.45]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Floating Indicator */}
      <mesh position={[0, 7.4, 0]}>
        <octahedronGeometry args={[0.45]} />
        <meshBasicMaterial color={isNear ? '#FFFFFF' : '#D4AF37'} />
      </mesh>
    </group>
  );
}
