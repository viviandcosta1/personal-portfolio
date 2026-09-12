'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function StadiumRoofAndSky() {
  const { timeOfDay, isMatchDay } = usePortfolio();
  const skyGroupRef = useRef<THREE.Group>(null);
  const searchlight1Ref = useRef<THREE.SpotLight>(null);
  const searchlight2Ref = useRef<THREE.SpotLight>(null);
  const roofLedRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const isNight = timeOfDay === 'night';

  // Animated LED ceiling pattern canvas
  const roofLedTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, 2048, 256);

    // Dynamic geometric football abstract pattern
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    for (let x = 0; x < 2048; x += 128) {
      ctx.strokeRect(x + 10, 20, 108, 216);
      ctx.beginPath();
      ctx.moveTo(x + 10, 20);
      ctx.lineTo(x + 118, 236);
      ctx.stroke();
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px monospace';
    ctx.fillText('⚽ VIVIAN DCOSTA ARENA ⚽ FULL STACK & AI/ML ⚽ EUROPEAN CHAMPIONSHIP ATMOSPHERE ⚽', 40, 145);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 1);
    return texture;
  }, []);

  // Atmospheric particle starfield
  const { starPositions, starColors } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color('#D4AF37');
    const white = new THREE.Color('#FFFFFF');
    const blue = new THREE.Color('#93C5FD');

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.8 + 0.2);
      const r = 120 + Math.random() * 40;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) + 10;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const chosenColor = Math.random() > 0.4 ? white : Math.random() > 0.5 ? gold : blue;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    return { starPositions: positions, starColors: colors };
  }, []);

  useFrame((_, delta) => {
    const time = Date.now() * 0.0006;
    if (skyGroupRef.current) {
      skyGroupRef.current.rotation.y = time * 0.05;
    }
    if (roofLedTexture) {
      roofLedTexture.offset.x += delta * 0.05;
    }
    if (searchlight1Ref.current) {
      searchlight1Ref.current.target.position.x = Math.sin(time * 2) * 30;
      searchlight1Ref.current.target.position.z = Math.cos(time * 2) * 30;
      searchlight1Ref.current.target.updateMatrixWorld();
    }
    if (searchlight2Ref.current) {
      searchlight2Ref.current.target.position.x = Math.cos(time * 1.5) * -30;
      searchlight2Ref.current.target.position.z = Math.sin(time * 1.5) * -30;
      searchlight2Ref.current.target.updateMatrixWorld();
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Dynamic Sky Sphere Dome */}
      <group ref={skyGroupRef}>
        {/* Starfield Particles (Night Sky) */}
        {isNight && (
          <points ref={particlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[starPositions, 3]}
              />
              <bufferAttribute
                attach="attributes-color"
                args={[starColors, 3]}
              />
            </bufferGeometry>
            <pointsMaterial size={1.2} vertexColors transparent opacity={0.8} />
          </points>
        )}
      </group>

      {/* Massive Suspended Stadium Roof Arch Ring */}
      <group position={[0, 26, 0]}>
        {/* Structural Steel Ring Truss */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[46, 1.2, 16, 48]} />
          <meshStandardMaterial
            color={isNight ? '#0D0D0D' : '#262626'}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Inner Gold Truss Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
          <torusGeometry args={[43, 0.4, 16, 48]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.95}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={isMatchDay ? 0.6 : 0.2}
          />
        </mesh>

        {/* Circular LED Screen Canopy Band */}
        <mesh ref={roofLedRef} position={[0, -1.2, 0]}>
          <cylinderGeometry args={[44, 44, 2.4, 64, 1, true]} />
          <meshBasicMaterial
            map={roofLedTexture || undefined}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* 8 Radial Roof Beams stretching from stadium corners */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8;
          return (
            <group key={`roof-beam-${i}`} rotation={[0, angle, 0]}>
              <mesh position={[24, 2, 0]} rotation={[0, 0, 0.1]}>
                <boxGeometry args={[42, 0.8, 0.8]} />
                <meshStandardMaterial color="#171717" metalness={0.8} />
              </mesh>
            </group>
          );
        })}

        {/* Sky Moving Volumetric Spotlights */}
        {isNight && (
          <>
            <spotLight
              ref={searchlight1Ref}
              position={[-30, 0, -30]}
              intensity={isMatchDay ? 800 : 400}
              distance={120}
              angle={Math.PI / 6}
              penumbra={0.6}
              color="#FFFFFF"
            />
            <spotLight
              ref={searchlight2Ref}
              position={[30, 0, 30]}
              intensity={isMatchDay ? 800 : 400}
              distance={120}
              angle={Math.PI / 6}
              penumbra={0.6}
              color="#D4AF37"
            />
          </>
        )}
      </group>
    </group>
  );
}
