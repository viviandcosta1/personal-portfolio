'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function StadiumPitch() {
  const tickerOffset = useRef(0);

  // Pitch dimensions (scale: 1 unit ~ 2 meters)
  const pitchWidth = 52;
  const pitchLength = 76;

  // Create canvas texture for pitch stripes and line markings
  const pitchTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 3072;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Grass alternating stripes - Madrid night contrast
    const numStripes = 18;
    const stripeHeight = canvas.height / numStripes;
    for (let i = 0; i < numStripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#0B2917' : '#081F12';
      ctx.fillRect(0, i * stripeHeight, canvas.width, stripeHeight);
    }

    // Subtle turf noise
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, 3, 3);
    }

    // Line markings - Crisp Pure White
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 14;

    const marginX = 140;
    const marginY = 140;
    const pW = canvas.width - marginX * 2;
    const pL = canvas.height - marginY * 2;

    // Outer boundary
    ctx.strokeRect(marginX, marginY, pW, pL);

    // Halfway line
    const midY = canvas.height / 2;
    ctx.beginPath();
    ctx.moveTo(marginX, midY);
    ctx.lineTo(canvas.width - marginX, midY);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, midY, 260, 0, Math.PI * 2);
    ctx.stroke();

    // Center spot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, midY, 18, 0, Math.PI * 2);
    ctx.fill();

    // Penalty Areas (North & South)
    const penWidth = 880;
    const penDepth = 420;
    const goalAreaWidth = 420;
    const goalAreaDepth = 160;

    // South Penalty Area (Bottom)
    ctx.strokeRect(canvas.width / 2 - penWidth / 2, canvas.height - marginY - penDepth, penWidth, penDepth);
    ctx.strokeRect(canvas.width / 2 - goalAreaWidth / 2, canvas.height - marginY - goalAreaDepth, goalAreaWidth, goalAreaDepth);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height - marginY - 280, 16, 0, Math.PI * 2);
    ctx.fill();

    // North Penalty Area (Top)
    ctx.strokeRect(canvas.width / 2 - penWidth / 2, marginY, penWidth, penDepth);
    ctx.strokeRect(canvas.width / 2 - goalAreaWidth / 2, marginY, goalAreaWidth, goalAreaDepth);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, marginY + 280, 16, 0, Math.PI * 2);
    ctx.fill();

    // Corner arcs
    const arcR = 50;
    ctx.beginPath();
    ctx.arc(marginX, marginY, arcR, 0, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width - marginX, marginY, arcR, Math.PI / 2, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(marginX, canvas.height - marginY, arcR, -Math.PI / 2, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width - marginX, canvas.height - marginY, arcR, Math.PI, Math.PI * 1.5);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  // LED Advertising Boards Canvas Texture with Mentality Quotes
  const ledTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px monospace';
    const text = '👑 VIVIAN D\'COSTA 👑 DISCIPLINE BUILDS CONSISTENCY 👑 WORK. IMPROVE. REPEAT 👑 THE NEXT LEVEL IS BUILT 👑 STAY HUNGRY 👑 PRECISION OVER EXCUSES 👑 PLAY TO WIN 👑 KEEP MOVING FORWARD 👑';
    ctx.fillText(text, 20, 75);

    // Gold borders on LED
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1);
    return texture;
  }, []);

  // Animate LED ticker
  useFrame((_, delta) => {
    if (ledTexture) {
      tickerOffset.current += delta * 0.12;
      ledTexture.offset.x = tickerOffset.current;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* The Grass Pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[pitchWidth, pitchLength]} />
        <meshStandardMaterial
          map={pitchTexture || undefined}
          color={pitchTexture ? '#FFFFFF' : '#0B2917'}
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* Surrounding Track / Deep Charcoal border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[pitchWidth + 16, pitchLength + 16]} />
        <meshStandardMaterial color="#0D0D0D" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Perimeter LED Advertising Boards */}
      {/* East Board */}
      <mesh position={[pitchWidth / 2 + 0.5, 0.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[pitchLength, 1.2, 0.2]} />
        <meshBasicMaterial map={ledTexture || undefined} color="#FFFFFF" />
      </mesh>
      {/* West Board */}
      <mesh position={[-pitchWidth / 2 - 0.5, 0.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[pitchLength, 1.2, 0.2]} />
        <meshBasicMaterial map={ledTexture || undefined} color="#FFFFFF" />
      </mesh>
      {/* North Board (Left segment) */}
      <mesh position={[-pitchWidth / 4 - 3, 0.6, -pitchLength / 2 - 0.5]}>
        <boxGeometry args={[pitchWidth / 2 - 6, 1.2, 0.2]} />
        <meshBasicMaterial map={ledTexture || undefined} color="#FFFFFF" />
      </mesh>
      {/* North Board (Right segment) */}
      <mesh position={[pitchWidth / 4 + 3, 0.6, -pitchLength / 2 - 0.5]}>
        <boxGeometry args={[pitchWidth / 2 - 6, 1.2, 0.2]} />
        <meshBasicMaterial map={ledTexture || undefined} color="#FFFFFF" />
      </mesh>
      {/* South Board (Left segment) */}
      <mesh position={[-pitchWidth / 4 - 3, 0.6, pitchLength / 2 + 0.5]}>
        <boxGeometry args={[pitchWidth / 2 - 6, 1.2, 0.2]} />
        <meshBasicMaterial map={ledTexture || undefined} color="#FFFFFF" />
      </mesh>
      {/* South Board (Right segment) */}
      <mesh position={[pitchWidth / 4 + 3, 0.6, pitchLength / 2 + 0.5]}>
        <boxGeometry args={[pitchWidth / 2 - 6, 1.2, 0.2]} />
        <meshBasicMaterial map={ledTexture || undefined} color="#FFFFFF" />
      </mesh>

      {/* Corner Flags with Gold Poles & White Flags */}
      {[
        [-pitchWidth / 2 + 1, -pitchLength / 2 + 1],
        [pitchWidth / 2 - 1, -pitchLength / 2 + 1],
        [-pitchWidth / 2 + 1, pitchLength / 2 - 1],
        [pitchWidth / 2 - 1, pitchLength / 2 - 1],
      ].map(([fx, fz], idx) => (
        <group key={`corner-flag-${idx}`} position={[fx, 0, fz]}>
          {/* Gold Flagpole */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 2.4]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* White Flag Cloth */}
          <mesh position={[0.3, 2.1, 0]}>
            <boxGeometry args={[0.6, 0.4, 0.02]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
