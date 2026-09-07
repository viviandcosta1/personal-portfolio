'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function InteractiveGlobe3D() {
  const globeRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const { openModal, ballPosition } = usePortfolio();

  const globeX = -18;
  const globeZ = -28;
  const dist = Math.sqrt(
    Math.pow(ballPosition[0] - globeX, 2) + Math.pow(ballPosition[2] - globeZ, 2)
  );
  const isNear = dist < 4.5;

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.4;
      globeRef.current.position.y = 3.6 + Math.sin(Date.now() * 0.002) * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.8;
    }
  });

  return (
    <group
      position={[globeX, 0, globeZ]}
      rotation={[0, Math.PI / 4, 0]}
      onClick={() => openModal('resume')}
    >
      {/* Platform Pedestal */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 3.0, 0.4, 24]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Neon Platform Border */}
      <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.4, 24]} />
        <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} />
      </mesh>

      {/* Point Light Glow */}
      <pointLight color="#D4AF37" intensity={200} distance={12} position={[0, 3.6, 0]} />

      {/* Floating Holographic Globe */}
      <group ref={globeRef} position={[0, 3.6, 0]}>
        {/* Wireframe Globe Sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 24, 24]} />
          <meshStandardMaterial
            color="#FFFFFF"
            wireframe
            transparent
            opacity={0.35}
            roughness={0.1}
          />
        </mesh>

        {/* Inner Core */}
        <mesh>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
        </mesh>

        {/* Orbit Ring 1 */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.1, 0.03, 16, 48]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Orbit Ring 2 */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.3, 0.03, 16, 48]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>

        {/* Satellite Node Blips */}
        {[0, 1.2, 2.4, 3.6, 4.8].map((angle, idx) => (
          <mesh
            key={`node-${idx}`}
            position={[Math.cos(angle) * 1.5, Math.sin(angle * 2) * 0.8, Math.sin(angle) * 1.5]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#D4AF37" />
          </mesh>
        ))}
      </group>

      {/* Holographic Header Banner */}
      <group position={[0, 5.8, 0]}>
        <mesh>
          <planeGeometry args={[3.6, 0.6]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.4, 0.5]} />
          <meshBasicMaterial color={isNear ? '#FFFFFF' : '#D4AF37'} />
        </mesh>
      </group>
    </group>
  );
}
