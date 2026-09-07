'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import { StadiumPitch } from './StadiumPitch';
import { Floodlights } from './Floodlights';
import { StadiumStands } from './StadiumStands';
import { GoalsAndHitboxes } from './GoalsAndHitboxes';
import { InteractiveBall } from './InteractiveBall';
import { TrophyRoom3D } from './TrophyRoom3D';
import { LockerRoom3D } from './LockerRoom3D';
import { TacticalBoard3D } from './TacticalBoard3D';
import { Jumbotron3D } from './Jumbotron3D';
import { ExitTunnel3D, SecretTunnel3D } from './ExitTunnel3D';
import { StadiumRoofAndSky } from './StadiumRoofAndSky';
import { InteractiveTechOrbs } from './InteractiveTechOrbs';
import { ControlRoom3D } from './ControlRoom3D';
import { InteractiveGlobe3D } from './InteractiveGlobe3D';
import { PitchInteractiveZones } from './PitchInteractiveZones';
import { FloatingCodeRain } from './FloatingCodeRain';
import { BallTrailSystem } from './BallTrailSystem';
import * as THREE from 'three';

interface StadiumCanvasProps {
  controlsRef: React.MutableRefObject<{
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    sprint: boolean;
    kick: boolean;
    interact: boolean;
    resetBall: boolean;
    joystickVector: { x: number; y: number };
  }>;
}

export function StadiumCanvas({ controlsRef }: StadiumCanvasProps) {
  const { timeOfDay, weather, isMatchDay } = usePortfolio();

  const isNight = timeOfDay === 'night';
  const bgColor = isNight ? '#050505' : '#87CEEB';
  const fogColor = isNight ? (weather === 'mist' ? '#111827' : '#050505') : '#BAE6FD';
  const fogNear = weather === 'mist' ? 30 : 70;
  const fogFar = weather === 'mist' ? 180 : 320;

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505] select-none">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 22, 38], fov: 48, near: 0.1, far: 450 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, fogNear, fogFar]} />

        {/* Global Stadium Lighting */}
        <ambientLight intensity={isNight ? (isMatchDay ? 0.9 : 0.6) : 1.3} color={isNight ? '#FFFFFF' : '#FFFBEB'} />
        <hemisphereLight
          args={[
            isNight ? '#FFFFFF' : '#E0F2FE',
            isNight ? '#050505' : '#166534',
            isNight ? 0.6 : 0.9
          ]}
        />
        <directionalLight
          position={isNight ? [0, 45, 0] : [30, 60, 20]}
          intensity={isNight ? (isMatchDay ? 1.6 : 1.1) : 2.2}
          color={isNight ? '#FFFFFF' : '#FEF3C7'}
          castShadow
          shadow-bias={-0.0005}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          <CameraController />
          <StadiumRoofAndSky />
          <StadiumPitch />
          <Floodlights />
          <StadiumStands />
          <PitchInteractiveZones />
          <InteractiveTechOrbs />
          <ControlRoom3D />
          <InteractiveGlobe3D />
          <FloatingCodeRain />
          <GoalsAndHitboxes />
          <TrophyRoom3D />
          <LockerRoom3D />
          <TacticalBoard3D />
          <Jumbotron3D />
          <ExitTunnel3D />
          <SecretTunnel3D />
          <BallTrailSystem />
          <InteractiveBall controlsRef={controlsRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function CameraController() {
  const { camera } = useThree();
  const { cameraZone, ballPosition, hasEnteredStadium, cameraShake } = usePortfolio();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    if (!hasEnteredStadium || cameraZone === 'entrance') {
      // Cinematic Entrance Hero Cam
      const time = Date.now() * 0.0004;
      targetPos.set(Math.sin(time) * 12, 14, 28 + Math.cos(time) * 4);
      targetLookAt.set(0, 1.5, 0);
    } else {
      switch (cameraZone) {
        case 'pitch': {
          // Dynamic Follow Camera behind the football
          const [bx, by, bz] = ballPosition;
          targetPos.set(bx * 0.7, Math.max(10, by + 12), bz + 18);
          targetLookAt.set(bx, by + 0.5, bz);
          break;
        }
        case 'goals': {
          // Training Ground Penalty Shootout view
          targetPos.set(0, 4.5, -16);
          targetLookAt.set(0, 2.4, -36);
          break;
        }
        case 'trophies': {
          // Trophy Room Close-up
          targetPos.set(16, 5.5, 0);
          targetLookAt.set(28, 2.5, 0);
          break;
        }
        case 'lockers': {
          // Tech Stack Lockers view
          targetPos.set(-16, 5.5, 0);
          targetLookAt.set(-28, 2.5, 0);
          break;
        }
        case 'tactical': {
          // Tactical Formation view
          targetPos.set(14, 7.5, -18);
          targetLookAt.set(22, 3.2, -28);
          break;
        }
        case 'controlroom': {
          // Developer Control Room view
          targetPos.set(-14, 6.0, 20);
          targetLookAt.set(-22, 3.2, 28);
          break;
        }
        case 'roof': {
          // Look up at Stadium Roof and Night Sky
          targetPos.set(0, 4, 10);
          targetLookAt.set(0, 32, 0);
          break;
        }
        case 'techOrbs': {
          // 3D Technology Orbs view
          targetPos.set(0, 7.0, -8);
          targetLookAt.set(0, 2.5, -16);
          break;
        }
        case 'scoreboard': {
          // Look up at Jumbotron
          targetPos.set(0, 6, 12);
          targetLookAt.set(0, 18, 0);
          break;
        }
        case 'tunnel': {
          // Exit Tunnel view
          targetPos.set(0, 4, 28);
          targetLookAt.set(0, 2, 44);
          break;
        }
      }
    }

    // Apply camera shake if triggered
    if (cameraShake > 0) {
      targetPos.x += (Math.random() - 0.5) * cameraShake * 0.8;
      targetPos.y += (Math.random() - 0.5) * cameraShake * 0.8;
      targetPos.z += (Math.random() - 0.5) * cameraShake * 0.8;
    }

    // Smooth camera lerp
    camera.position.lerp(targetPos, Math.min(delta * 4, 0.15));
    currentLookAt.current.lerp(targetLookAt, Math.min(delta * 4, 0.15));
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
