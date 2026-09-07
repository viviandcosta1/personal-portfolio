'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function ControlRoom3D() {
  const { openModal, ballPosition } = usePortfolio();
  const screenRef = useRef<THREE.Mesh>(null);

  // Proximity to ball
  const roomX = -22;
  const roomZ = 28;
  const dist = Math.sqrt(
    Math.pow(ballPosition[0] - roomX, 2) + Math.pow(ballPosition[2] - roomZ, 2)
  );
  const isNear = dist < 5.0;

  // Animated telemetry monitor canvas
  const monitorTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, 1024, 512);

    // Header
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('⚽ TACTICAL CONTROL ROOM • DEVOPS & ANALYTICS ⚽', 180, 45);

    // Left Screen: Architecture & Throughput
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 70, 460, 400);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('API GATEWAY / MICROSERVICES', 50, 105);

    ctx.fillStyle = '#4ADE80';
    ctx.font = '14px monospace';
    ctx.fillText('STATUS: ONLINE • 99.98% UPTIME', 50, 135);
    ctx.fillText('LATENCY: 12ms (FASTAPI ENGINE)', 50, 160);
    ctx.fillText('CRAWLER WORKERS: 4 ACTIVE', 50, 185);
    ctx.fillText('ML INFERENCE: READY', 50, 210);

    // Mock Graph Bars
    const barHeights = [40, 75, 120, 95, 160, 140, 180, 130, 200, 175];
    barHeights.forEach((h, i) => {
      ctx.fillStyle = i % 2 === 0 ? '#D4AF37' : '#FFFFFF';
      ctx.fillRect(60 + i * 40, 440 - h, 24, h);
    });

    // Right Screen: Production Pipelines & Telemetry
    ctx.strokeRect(520, 70, 470, 400);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('DEPLOYMENT PIPELINE • CI/CD', 540, 105);

    ctx.fillStyle = '#38BDF8';
    ctx.font = '14px monospace';
    ctx.fillText('• DOCKER BUILD: SUCCESS (v2.4)', 540, 140);
    ctx.fillText('• AWS ECS CLUSTER: HEALTHY', 540, 170);
    ctx.fillText('• MONGODB REPLICA: SYNCED', 540, 200);
    ctx.fillText('• REDIS CACHE HIT: 94.2%', 540, 230);
    ctx.fillText('• MATCH ENGINE: INITIALIZED', 540, 260);

    // Circular Radar Scanner
    ctx.strokeStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(750, 370, 60, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(750, 370, 35, 0, Math.PI * 2);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (monitorTexture) {
      // Subtle pulse
    }
  });

  return (
    <group
      position={[roomX, 0, roomZ]}
      rotation={[0, Math.PI / 4, 0]}
      onClick={() => openModal('tactical')}
    >
      {/* Control Room Spot Light */}
      <spotLight
        position={[0, 12, 0]}
        target-position={[0, 2, 0]}
        intensity={800}
        distance={25}
        angle={Math.PI / 3}
        penumbra={0.4}
        color="#38BDF8"
      />
      <pointLight position={[0, 4, 0]} intensity={250} color="#D4AF37" distance={15} />

      {/* Raised Tech Platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[5.5, 6, 0.4, 24]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Platform Neon Ring */}
      <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5.2, 24]} />
        <meshBasicMaterial color={isNear ? '#FFFFFF' : '#D4AF37'} side={THREE.DoubleSide} />
      </mesh>

      {/* Curved Multi-Monitor Wall Frame */}
      <group position={[0, 3.2, -1.8]}>
        {/* Curved Back Casing */}
        <mesh>
          <boxGeometry args={[10, 5.2, 0.4]} />
          <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Central Display Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.22]}>
          <planeGeometry args={[9.5, 4.7]} />
          <meshBasicMaterial map={monitorTexture || undefined} />
        </mesh>
      </group>

      {/* Holographic Hologram Projector Console */}
      <mesh position={[0, 1.2, 1.2]}>
        <cylinderGeometry args={[1.2, 1.5, 1.6, 16]} />
        <meshStandardMaterial color="#171717" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Projector Emitter Ring */}
      <mesh position={[0, 2.02, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.1, 16]} />
        <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} />
      </mesh>

      {/* Holographic Floating Data Node Indicator */}
      <mesh position={[0, 3.2, 1.2]}>
        <octahedronGeometry args={[0.4]} />
        <meshBasicMaterial color={isNear ? '#FFFFFF' : '#D4AF37'} wireframe />
      </mesh>
    </group>
  );
}
