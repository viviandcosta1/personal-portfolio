'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import * as THREE from 'three';

interface TechEntity {
  id: string;
  name: string;
  category: string;
  color: string;
  position: [number, number, number];
  type: 'python' | 'react' | 'node' | 'mongodb' | 'aws' | 'docker';
}

const TECH_ENTITIES: TechEntity[] = [
  { id: 'tech-py', name: 'PYTHON', category: 'AI & BACKEND', color: '#38BDF8', position: [-14, 2.5, -12], type: 'python' },
  { id: 'tech-react', name: 'REACT / NEXT.JS', category: 'FRONTEND ARCHITECTURE', color: '#61DAFB', position: [-8, 3.2, -18], type: 'react' },
  { id: 'tech-node', name: 'NODE.JS', category: 'MICROSERVICES', color: '#4ADE80', position: [8, 3.2, -18], type: 'node' },
  { id: 'tech-fastapi', name: 'FASTAPI', category: 'HIGH-PERF REST', color: '#009688', position: [14, 2.5, -12], type: 'mongodb' },
  { id: 'tech-aws', name: 'AWS CLOUD', category: 'CLOUD INFRASTRUCTURE', color: '#F59E0B', position: [-18, 2.8, -4], type: 'aws' },
  { id: 'tech-docker', name: 'DOCKER', category: 'CONTAINERIZATION', color: '#0284C7', position: [18, 2.8, -4], type: 'docker' },
];

export function InteractiveTechOrbs() {
  const { openModal, focusZone, ballPosition } = usePortfolio();

  return (
    <group>
      {TECH_ENTITIES.map((tech, idx) => (
        <TechOrbInstance
          key={tech.id}
          tech={tech}
          index={idx}
          ballPosition={ballPosition}
          onClick={() => {
            focusZone('lockers');
            openModal('skills');
          }}
        />
      ))}
    </group>
  );
}

function TechOrbInstance({
  tech,
  index,
  ballPosition,
  onClick,
}: {
  tech: TechEntity;
  index: number;
  ballPosition: [number, number, number];
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Proximity to ball
  const dist = Math.sqrt(
    Math.pow(ballPosition[0] - tech.position[0], 2) + Math.pow(ballPosition[2] - tech.position[2], 2)
  );
  const isNear = dist < 4.0;

  useFrame((_, delta) => {
    const time = Date.now() * 0.002 + index * 1.2;
    if (meshRef.current) {
      meshRef.current.position.y = tech.position[1] + Math.sin(time) * 0.25;
      meshRef.current.rotation.y += delta * (isNear ? 1.8 : 0.6);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 1.2;
      ring1Ref.current.rotation.y += delta * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 1.4;
      ring2Ref.current.rotation.z += delta * 0.6;
    }
  });

  return (
    <group position={[tech.position[0], 0, tech.position[2]]} onClick={onClick}>
      {/* Ground Projection Circle */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.2, 24]} />
        <meshBasicMaterial
          color={isNear ? '#FFFFFF' : '#D4AF37'}
          transparent
          opacity={isNear ? 0.8 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point Light Glow */}
      <pointLight
        color={tech.color}
        intensity={isNear ? 300 : 120}
        distance={10}
        position={[0, tech.position[1], 0]}
      />

      {/* Floating 3D Geometric Body */}
      <group ref={meshRef} position={[0, tech.position[1], 0]}>
        {tech.type === 'python' && (
          <group>
            {/* Glowing Dual Sphere */}
            <mesh>
              <sphereGeometry args={[0.55, 24, 24]} />
              <meshStandardMaterial
                color="#FFFFFF"
                metalness={0.9}
                roughness={0.1}
                emissive="#38BDF8"
                emissiveIntensity={0.6}
              />
            </mesh>
            <mesh ref={ring1Ref}>
              <torusGeometry args={[0.85, 0.04, 16, 32]} />
              <meshBasicMaterial color="#D4AF37" />
            </mesh>
          </group>
        )}

        {tech.type === 'react' && (
          <group>
            {/* Atom Nucleus */}
            <mesh>
              <sphereGeometry args={[0.4, 24, 24]} />
              <meshBasicMaterial color="#61DAFB" />
            </mesh>
            {/* 3 Orbital Rings */}
            <mesh ref={ring1Ref}>
              <torusGeometry args={[0.85, 0.03, 16, 32]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
              <torusGeometry args={[0.85, 0.03, 16, 32]} />
              <meshBasicMaterial color="#D4AF37" />
            </mesh>
          </group>
        )}

        {tech.type === 'node' && (
          <group>
            {/* Hexagonal Green Energy Core */}
            <mesh>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 6]} />
              <meshStandardMaterial
                color="#4ADE80"
                metalness={0.8}
                roughness={0.2}
                emissive="#22C55E"
                emissiveIntensity={0.5}
              />
            </mesh>
            <mesh ref={ring1Ref}>
              <ringGeometry args={[0.7, 0.85, 6]} />
              <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}

        {tech.type === 'mongodb' && (
          <group>
            {/* Multi-tier Database Cylinder Stack */}
            <mesh position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.55, 0.55, 0.22, 24]} />
              <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.55, 0.55, 0.22, 24]} />
              <meshStandardMaterial color="#0D0D0D" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.55, 0.55, 0.22, 24]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        )}

        {tech.type === 'aws' && (
          <group>
            {/* Cloud-like Geometric Cluster */}
            <mesh position={[0, 0, 0]}>
              <dodecahedronGeometry args={[0.55, 0]} />
              <meshStandardMaterial
                color="#F59E0B"
                metalness={0.9}
                roughness={0.2}
                emissive="#F59E0B"
                emissiveIntensity={0.4}
              />
            </mesh>
            <mesh ref={ring1Ref}>
              <octahedronGeometry args={[0.85, 0]} />
              <meshBasicMaterial color="#FFFFFF" wireframe />
            </mesh>
          </group>
        )}

        {tech.type === 'docker' && (
          <group>
            {/* Container Stack Cluster */}
            <mesh position={[-0.2, -0.2, 0]}>
              <boxGeometry args={[0.38, 0.35, 0.55]} />
              <meshStandardMaterial color="#0284C7" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.2, -0.2, 0]}>
              <boxGeometry args={[0.38, 0.35, 0.55]} />
              <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.42, 0.35, 0.55]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        )}

        {/* Floating Holographic Info Label */}
        <group position={[0, 1.2, 0]}>
          <mesh>
            <planeGeometry args={[2.4, 0.5]} />
            <meshBasicMaterial color="#050505" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.3, 0.42]} />
            <meshBasicMaterial color={isNear ? '#FFFFFF' : '#D4AF37'} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
