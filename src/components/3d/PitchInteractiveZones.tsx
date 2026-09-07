'use client';

import React from 'react';
import { usePortfolio, CameraZone } from '@/context/PortfolioContext';
import { VIVIAN_DATA } from '@/data/portfolioData';
import * as THREE from 'three';

interface ZoneMarker {
  id: CameraZone;
  name: string;
  position: [number, number, number];
  radius: number;
  color: string;
}

const ZONE_MARKERS: ZoneMarker[] = [
  { id: 'pitch', name: 'PLAYER PROFILE (#07)', position: [0, 0.03, 0], radius: 4.8, color: '#D4AF37' },
  { id: 'goals', name: 'PROJECTS & SHOOTOUT', position: [0, 0.03, -24], radius: 4.5, color: '#FFFFFF' },
  { id: 'trophies', name: 'TROPHY ROOM (EXPERIENCE)', position: [20, 0.03, 0], radius: 4.2, color: '#D4AF37' },
  { id: 'lockers', name: 'TECH STACK LOCKERS (SKILLS)', position: [-20, 0.03, 0], radius: 4.2, color: '#FFFFFF' },
  { id: 'tactical', name: 'TACTICAL FORMATION (ARCH)', position: [16, 0.03, -20], radius: 3.8, color: '#D4AF37' },
  { id: 'controlroom', name: 'CONTROL ROOM (DEVOPS)', position: [-16, 0.03, 20], radius: 3.8, color: '#38BDF8' },
  { id: 'tunnel', name: 'CONTACT & RESUME TUNNEL', position: [0, 0.03, 26], radius: 4.0, color: '#FFFFFF' },
];

export function PitchInteractiveZones() {
  const { focusZone, ballPosition, openModal, selectedExperience, openExperienceModal } = usePortfolio();

  const handleZoneClick = (zone: CameraZone) => {
    focusZone(zone);
    if (zone === 'pitch') openModal('profile');
    else if (zone === 'goals') openModal('project');
    else if (zone === 'trophies') openExperienceModal(selectedExperience || VIVIAN_DATA.experiences[0]);
    else if (zone === 'lockers') openModal('skills');
    else if (zone === 'tactical') openModal('tactical');
    else if (zone === 'controlroom') openModal('tactical');
    else if (zone === 'tunnel') openModal('contact');
  };

  return (
    <group>
      {/* Glowing Zone Rings on Turf */}
      {ZONE_MARKERS.map(zone => {
        const dist = Math.sqrt(
          Math.pow(ballPosition[0] - zone.position[0], 2) + Math.pow(ballPosition[2] - zone.position[2], 2)
        );
        const isNear = dist < zone.radius + 1.5;

        return (
          <group
            key={zone.id}
            position={zone.position}
            onClick={() => handleZoneClick(zone.id)}
          >
            {/* Outer Glowing Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[zone.radius - 0.25, zone.radius, 32]} />
              <meshBasicMaterial
                color={isNear ? '#FFFFFF' : zone.color}
                transparent
                opacity={isNear ? 0.9 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Subtle Inner Fill */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <circleGeometry args={[zone.radius - 0.3, 32]} />
              <meshBasicMaterial
                color={zone.color}
                transparent
                opacity={isNear ? 0.15 : 0.04}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Center Blip */}
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color={isNear ? '#FFFFFF' : zone.color} />
            </mesh>
          </group>
        );
      })}

      {/* Connecting Laser Guide Lines across pitch */}
      {[
        [[0, 0.02, 0], [0, 0.02, -24]],
        [[0, 0.02, 0], [20, 0.02, 0]],
        [[0, 0.02, 0], [-20, 0.02, 0]],
        [[0, 0.02, 0], [0, 0.02, 26]],
        [[0, 0.02, 0], [16, 0.02, -20]],
        [[0, 0.02, 0], [-16, 0.02, 20]],
      ].map(([start, end], idx) => {
        const sx = start[0];
        const sz = start[2];
        const ex = end[0];
        const ez = end[2];
        const mx = (sx + ex) / 2;
        const mz = (sz + ez) / 2;
        const length = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ez - sz, 2));
        const angle = Math.atan2(ez - sz, ex - sx);

        return (
          <mesh
            key={`guide-line-${idx}`}
            position={[mx, 0.02, mz]}
            rotation={[-Math.PI / 2, 0, -angle]}
          >
            <planeGeometry args={[length, 0.06]} />
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}
