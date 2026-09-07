'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import * as THREE from 'three';

export function GoalsAndHitboxes() {
  const {
    ballPosition,
    triggerGoal,
    openProjectModal,
    selectedProject,
    shootAtTarget,
  } = usePortfolio();

  const hasTriggeredNorth = useRef(false);
  const hasTriggeredSouth = useRef(false);
  const keeperRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  const goalWidth = 10;
  const goalHeight = 4.4;
  const goalDepth = 3.6;

  const projects = VIVIAN_DATA.projects;

  // Animate goalkeeper barrier and target rings
  useFrame((_, delta) => {
    const time = Date.now() * 0.002;
    if (keeperRef.current) {
      keeperRef.current.position.x = Math.sin(time) * 3.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 1.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 1.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 1.8;
    }

    // Goal collision detection
    const [bx, by, bz] = ballPosition;
    if (bz < -35 && bz > -39 && Math.abs(bx) < 4.8 && by < 4.2) {
      if (!hasTriggeredNorth.current) {
        hasTriggeredNorth.current = true;
        triggerGoal(500);
        if (selectedProject) {
          setTimeout(() => {
            openProjectModal(selectedProject);
          }, 450);
        }
        setTimeout(() => {
          hasTriggeredNorth.current = false;
        }, 2500);
      }
    }

    if (bz > 35 && bz < 39 && Math.abs(bx) < 4.8 && by < 4.2) {
      if (!hasTriggeredSouth.current) {
        hasTriggeredSouth.current = true;
        triggerGoal(250);
        setTimeout(() => {
          hasTriggeredSouth.current = false;
        }, 2500);
      }
    }
  });

  return (
    <group>
      {/* North Goal (Project Training Station & Shootout Ground) */}
      <group position={[0, 0, -36]}>
        {/* Bright White Training Floodlights */}
        <spotLight
          position={[0, 14, 8]}
          target-position={[0, 2, 0]}
          intensity={1000}
          distance={35}
          angle={Math.PI / 3}
          penumbra={0.4}
          color="#FFFFFF"
          castShadow
        />
        <pointLight position={[0, 5, 2]} intensity={250} color="#D4AF37" distance={16} />

        {/* Goal Posts & Frame in Pure White */}
        {/* Left Post */}
        <mesh position={[-goalWidth / 2, goalHeight / 2, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, goalHeight, 16]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Right Post */}
        <mesh position={[goalWidth / 2, goalHeight / 2, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, goalHeight, 16]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Crossbar */}
        <mesh position={[0, goalHeight, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, goalWidth, 16]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Rear Net Supports */}
        <mesh position={[-goalWidth / 2, goalHeight / 2, -goalDepth / 2]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, goalHeight * 1.2, 8]} />
          <meshStandardMaterial color="#171717" metalness={0.8} />
        </mesh>
        <mesh position={[goalWidth / 2, goalHeight / 2, -goalDepth / 2]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, goalHeight * 1.2, 8]} />
          <meshStandardMaterial color="#171717" metalness={0.8} />
        </mesh>

        {/* Goal Net (Translucent White Mesh) */}
        <mesh position={[0, goalHeight / 2, -goalDepth / 2]} rotation={[-0.3, 0, 0]}>
          <planeGeometry args={[goalWidth, goalHeight * 1.3]} />
          <meshStandardMaterial color="#FFFFFF" wireframe transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-goalWidth / 2, goalHeight / 2, -goalDepth / 2]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[goalDepth, goalHeight]} />
          <meshStandardMaterial color="#FFFFFF" wireframe transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[goalWidth / 2, goalHeight / 2, -goalDepth / 2]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[goalDepth, goalHeight]} />
          <meshStandardMaterial color="#FFFFFF" wireframe transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* 3 Interactive Project Shootout Targets inside Goal */}
        {/* TARGET 1: Top-Left (AI Lead Gen - +500 PTS) */}
        <group
          position={[-goalWidth / 2 + 1.6, goalHeight - 1.2, -0.3]}
          onClick={() =>
            shootAtTarget({
              id: 'target-1',
              x: -goalWidth / 2 + 1.6,
              y: goalHeight - 1.2,
              z: -36.3,
              points: 500,
              project: projects[0],
            })
          }
        >
          <group ref={ring1Ref}>
            <mesh>
              <ringGeometry args={[0.8, 0.95, 24]} />
              <meshBasicMaterial color="#D4AF37" side={THREE.DoubleSide} />
            </mesh>
            <mesh>
              <circleGeometry args={[0.78, 24]} />
              <meshBasicMaterial color="#D4AF37" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
          </group>
          {/* Target Score Badge */}
          <mesh position={[0, 1.2, 0]}>
            <planeGeometry args={[2.2, 0.5]} />
            <meshBasicMaterial color="#050505" />
          </mesh>
          <mesh position={[0, 1.2, 0.01]}>
            <planeGeometry args={[2.0, 0.4]} />
            <meshBasicMaterial color="#D4AF37" />
          </mesh>
        </group>

        {/* TARGET 2: Top-Right (Daylink Hive - +350 PTS) */}
        <group
          position={[goalWidth / 2 - 1.6, goalHeight - 1.2, -0.3]}
          onClick={() =>
            shootAtTarget({
              id: 'target-2',
              x: goalWidth / 2 - 1.6,
              y: goalHeight - 1.2,
              z: -36.3,
              points: 350,
              project: projects[1],
            })
          }
        >
          <group ref={ring2Ref}>
            <mesh>
              <ringGeometry args={[0.8, 0.95, 24]} />
              <meshBasicMaterial color="#FFFFFF" side={THREE.DoubleSide} />
            </mesh>
            <mesh>
              <circleGeometry args={[0.78, 24]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
          </group>
          {/* Target Score Badge */}
          <mesh position={[0, 1.2, 0]}>
            <planeGeometry args={[2.2, 0.5]} />
            <meshBasicMaterial color="#050505" />
          </mesh>
          <mesh position={[0, 1.2, 0.01]}>
            <planeGeometry args={[2.0, 0.4]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* TARGET 3: Center Bottom (PFWCI Portal - +300 PTS) */}
        <group
          position={[0, 1.2, -0.3]}
          onClick={() =>
            shootAtTarget({
              id: 'target-3',
              x: 0,
              y: 1.2,
              z: -36.3,
              points: 300,
              project: projects[2],
            })
          }
        >
          <group ref={ring3Ref}>
            <mesh>
              <ringGeometry args={[0.75, 0.9, 24]} />
              <meshBasicMaterial color="#F5C542" side={THREE.DoubleSide} />
            </mesh>
            <mesh>
              <circleGeometry args={[0.73, 24]} />
              <meshBasicMaterial color="#F5C542" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
          </group>
          {/* Target Score Badge */}
          <mesh position={[0, 1.1, 0]}>
            <planeGeometry args={[2.2, 0.5]} />
            <meshBasicMaterial color="#050505" />
          </mesh>
          <mesh position={[0, 1.1, 0.01]}>
            <planeGeometry args={[2.0, 0.4]} />
            <meshBasicMaterial color="#F5C542" />
          </mesh>
        </group>

        {/* Dynamic Holographic Goalkeeper Barrier */}
        <group ref={keeperRef} position={[0, 1.8, -1.2]}>
          <mesh>
            <boxGeometry args={[1.6, 2.6, 0.2]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, 1.6, 0]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.5} />
          </mesh>
        </group>

        {/* Grand Header Signboard */}
        <group position={[0, goalHeight + 1.4, 0]}>
          <mesh>
            <boxGeometry args={[11, 1.2, 0.3]} />
            <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.18]}>
            <planeGeometry args={[10.6, 0.9]} />
            <meshBasicMaterial color="#D4AF37" />
          </mesh>
        </group>
      </group>

      {/* South Goal (Match Finish / Tunnel) */}
      <group position={[0, 0, 36]} rotation={[0, Math.PI, 0]}>
        <mesh position={[-goalWidth / 2, goalHeight / 2, 0]}>
          <cylinderGeometry args={[0.12, 0.12, goalHeight, 16]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.9} />
        </mesh>
        <mesh position={[goalWidth / 2, goalHeight / 2, 0]}>
          <cylinderGeometry args={[0.12, 0.12, goalHeight, 16]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.9} />
        </mesh>
        <mesh position={[0, goalHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, goalWidth, 16]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.9} />
        </mesh>
        <mesh position={[0, goalHeight / 2, -goalDepth / 2]} rotation={[-0.3, 0, 0]}>
          <planeGeometry args={[goalWidth, goalHeight * 1.3]} />
          <meshStandardMaterial color="#FFFFFF" wireframe transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
