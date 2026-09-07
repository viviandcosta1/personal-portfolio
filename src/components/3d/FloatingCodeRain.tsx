'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CODE_FRAGMENTS = [
  'async function build()',
  'const pipeline = new MLFlow()',
  'await docker.deploy()',
  'fastapi.include_router()',
  'mongoose.connect()',
  'redis.cache(ttl=3600)',
  'const [state, setState] = useState()',
  'npm run build',
  'def forward(self, x):',
  'REST_API.get("/v1/projects")',
];

export function FloatingCodeRain() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 4 lightweight canvas textures
  const spriteTextures = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return CODE_FRAGMENTS.slice(0, 6).map(text => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 48;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = 'rgba(5, 5, 5, 0.7)';
      ctx.fillRect(0, 0, 256, 48);

      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(text, 8, 30);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    }).filter(Boolean) as THREE.CanvasTexture[];
  }, []);

  // Spatial positions around the technical sectors
  const items = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 36,
      y: 2 + Math.random() * 5,
      z: -24 + (Math.random() - 0.5) * 16,
      speed: 0.2 + Math.random() * 0.3,
      textureIndex: i % spriteTextures.length,
    }));
  }, [spriteTextures.length]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const item = items[i];
        if (item) {
          child.position.y += delta * item.speed;
          if (child.position.y > 7.5) {
            child.position.y = 1.8;
          }
        }
      });
    }
  });

  if (spriteTextures.length === 0) return null;

  return (
    <group ref={groupRef}>
      {items.map((item, idx) => {
        const tex = spriteTextures[item.textureIndex];
        if (!tex) return null;
        return (
          <mesh
            key={`code-sprite-${idx}`}
            position={[item.x, item.y, item.z]}
          >
            <planeGeometry args={[2.8, 0.45]} />
            <meshBasicMaterial
              map={tex}
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}
