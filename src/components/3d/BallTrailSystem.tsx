'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

export function BallTrailSystem() {
  const { ballPosition, goalsScored, isMentalityModeActive } = usePortfolio();
  const trailLength = 12;
  const history = useRef<THREE.Vector3[]>(
    Array.from({ length: trailLength }, () => new THREE.Vector3(0, 0.45, 0))
  );

  const particlesRef = useRef<THREE.Points>(null);

  const isGold = isMentalityModeActive || goalsScored > 0;

  // Particle positions along the trail
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(trailLength * 3);
    const col = new Float32Array(trailLength * 3);
    const goldColor = new THREE.Color('#D4AF37');
    const whiteColor = new THREE.Color('#FFFFFF');

    for (let i = 0; i < trailLength; i++) {
      const alpha = 1 - i / trailLength;
      const c = isGold ? goldColor : (i % 2 === 0 ? whiteColor : goldColor);
      col[i * 3] = c.r * alpha;
      col[i * 3 + 1] = c.g * alpha;
      col[i * 3 + 2] = c.b * alpha;
    }

    return { positions: pos, colors: col };
  }, [isGold, trailLength]);

  useFrame(() => {
    const current = new THREE.Vector3(...ballPosition);
    // Shift history
    history.current.unshift(current.clone());
    history.current.pop();

    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      if (posAttr) {
        for (let i = 0; i < trailLength; i++) {
          const p = history.current[i];
          posAttr.setXYZ(i, p.x, p.y * 0.9, p.z);
        }
        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.55}
        vertexColors
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}
