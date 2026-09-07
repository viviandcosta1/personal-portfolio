'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolio } from '@/context/PortfolioContext';
import { soundEngine } from '@/components/audio/SoundEngine';
import * as THREE from 'three';

interface InteractiveBallProps {
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

export function InteractiveBall({ controlsRef }: InteractiveBallProps) {
  const ballMeshRef = useRef<THREE.Mesh>(null);
  const shadowMeshRef = useRef<THREE.Mesh>(null);
  const {
    setBallPosition,
    hasEnteredStadium,
    shootTargetPos,
    shootTimestamp,
    triggerCameraShake,
    isMentalityModeActive,
  } = usePortfolio();

  // Physics state
  const pos = useRef(new THREE.Vector3(0, 0.45, 0));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  const radius = 0.45;
  const kickCooldown = useRef(0);
  const lastShootTimestamp = useRef(0);
  const lastStateUpdateTime = useRef(0);

  // Ball surface canvas texture (White leather + Gold & Charcoal geometric panels)
  const ballTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#0D0D0D';
    const drawPentagon = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = x + r * Math.cos(a);
        const py = y + r * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    drawPentagon(128, 128, 48);
    drawPentagon(384, 128, 48);
    drawPentagon(256, 256, 56);
    drawPentagon(128, 384, 48);
    drawPentagon(384, 384, 48);

    // Subtle Gold Trim Rings
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(256, 256, 175, 0, Math.PI * 2);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Handle minigame shootout trigger
  useEffect(() => {
    if (shootTimestamp > 0 && shootTimestamp !== lastShootTimestamp.current && shootTargetPos) {
      lastShootTimestamp.current = shootTimestamp;

      // Position ball at penalty spot
      pos.current.set(0, 0.45, -20);

      // Compute velocity towards target
      const [tx, ty, tz] = shootTargetPos;
      const dx = tx - pos.current.x;
      const dy = ty - pos.current.y;
      const dz = tz - pos.current.z;

      const flightTime = 0.45; // seconds
      vel.current.set(
        dx / flightTime,
        (dy + 0.5 * 19.8 * flightTime * flightTime) / flightTime,
        dz / flightTime
      );
    }
  }, [shootTimestamp, shootTargetPos]);

  useFrame((_, delta) => {
    if (!ballMeshRef.current) return;
    if (!hasEnteredStadium) {
      pos.current.set(0, 0.45 + Math.sin(Date.now() * 0.003) * 0.05, 0);
      ballMeshRef.current.position.copy(pos.current);
      return;
    }

    const ctrl = controlsRef.current;
    const dt = Math.min(delta, 0.1);

    if (ctrl.resetBall) {
      pos.current.set(0, 0.45, 0);
      vel.current.set(0, 0, 0);
    }

    // Movement direction from keyboard and virtual joystick
    const moveDir = new THREE.Vector3(0, 0, 0);
    if (ctrl.forward) moveDir.z -= 1;
    if (ctrl.backward) moveDir.z += 1;
    if (ctrl.left) moveDir.x -= 1;
    if (ctrl.right) moveDir.x += 1;

    if (Math.abs(ctrl.joystickVector.x) > 0.1 || Math.abs(ctrl.joystickVector.y) > 0.1) {
      moveDir.x = ctrl.joystickVector.x;
      moveDir.z = ctrl.joystickVector.y;
    }

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize();
      const speed = ctrl.sprint ? 34 : 20;
      vel.current.x += moveDir.x * speed * dt;
      vel.current.z += moveDir.z * speed * dt;
    }

    // Kick mechanic (Space / Kick button)
    kickCooldown.current -= dt;
    if (ctrl.kick && kickCooldown.current <= 0) {
      kickCooldown.current = 0.4;
      const kickImpulse = ctrl.sprint ? 42 : 28;
      const kickDir = moveDir.lengthSq() > 0 ? moveDir.clone() : new THREE.Vector3(0, 0, -1);
      vel.current.x = kickDir.x * kickImpulse;
      vel.current.z = kickDir.z * kickImpulse;
      vel.current.y = 7.5;
      soundEngine.playKick(ctrl.sprint ? 1.4 : 1.0);
      triggerCameraShake(ctrl.sprint ? 0.8 : 0.4);
    }

    // Gravity & Friction Physics integration
    vel.current.y -= 19.8 * dt;

    const friction = 0.94;
    vel.current.x *= Math.pow(friction, dt * 60);
    vel.current.z *= Math.pow(friction, dt * 60);

    pos.current.addScaledVector(vel.current, dt);

    // Ground bounce
    if (pos.current.y < radius) {
      pos.current.y = radius;
      if (vel.current.y < -1) {
        vel.current.y = -vel.current.y * 0.55;
        soundEngine.playKick(0.35);
      } else {
        vel.current.y = 0;
      }
    }

    // Pitch Boundaries
    const maxX = 25;
    const maxZ = 37;
    if (Math.abs(pos.current.x) > maxX) {
      pos.current.x = Math.sign(pos.current.x) * maxX;
      vel.current.x = -vel.current.x * 0.6;
      soundEngine.playKick(0.5);
    }
    if (Math.abs(pos.current.z) > maxZ) {
      pos.current.z = Math.sign(pos.current.z) * maxZ;
      vel.current.z = -vel.current.z * 0.6;
      soundEngine.playKick(0.5);
    }

    ballMeshRef.current.position.copy(pos.current);

    // Realistic rolling spin
    const horizontalSpeed = Math.sqrt(vel.current.x * vel.current.x + vel.current.z * vel.current.z);
    if (horizontalSpeed > 0.05) {
      const rotAngle = (horizontalSpeed / radius) * dt;
      const rotAxis = new THREE.Vector3(-vel.current.z, 0, vel.current.x).normalize();
      ballMeshRef.current.rotateOnWorldAxis(rotAxis, rotAngle);
    }

    if (shadowMeshRef.current) {
      shadowMeshRef.current.position.set(pos.current.x, 0.02, pos.current.z);
      const heightFactor = Math.max(0.2, 1 - (pos.current.y - radius) / 4);
      shadowMeshRef.current.scale.set(heightFactor, heightFactor, 1);
    }

    // Throttle React state update to ~10Hz (every 100ms) to prevent 60Hz React tree re-renders!
    const now = performance.now();
    if (now - lastStateUpdateTime.current > 100) {
      lastStateUpdateTime.current = now;
      setBallPosition([pos.current.x, pos.current.y, pos.current.z]);
    }
  });

  return (
    <group>
      {/* Contact Shadow */}
      <mesh ref={shadowMeshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 1.15, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} depthWrite={false} />
      </mesh>

      {/* Football Sphere */}
      <mesh ref={ballMeshRef} castShadow position={[0, radius, 0]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          map={ballTexture || undefined}
          color="#FFFFFF"
          roughness={0.2}
          metalness={0.08}
          emissive={isMentalityModeActive ? '#D4AF37' : '#000000'}
          emissiveIntensity={isMentalityModeActive ? 0.6 : 0}
        />

        {/* Subtle Gold Outer Aura Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.02, radius * 1.06, 32]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </mesh>
    </group>
  );
}
