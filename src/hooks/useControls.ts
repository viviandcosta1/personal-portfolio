'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface ControlsState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  kick: boolean;
  interact: boolean;
  resetBall: boolean;
  joystickVector: { x: number; y: number };
}

export function useControls() {
  const [controls, setControls] = useState<ControlsState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    kick: false,
    interact: false,
    resetBall: false,
    joystickVector: { x: 0, y: 0 }
  });

  const controlsRef = useRef(controls);
  controlsRef.current = controls;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Avoid triggering when user is typing in form/terminal
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
      return;
    }

    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        setControls(c => ({ ...c, forward: true }));
        break;
      case 'KeyS':
      case 'ArrowDown':
        setControls(c => ({ ...c, backward: true }));
        break;
      case 'KeyA':
      case 'ArrowLeft':
        setControls(c => ({ ...c, left: true }));
        break;
      case 'KeyD':
      case 'ArrowRight':
        setControls(c => ({ ...c, right: true }));
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        setControls(c => ({ ...c, sprint: true }));
        break;
      case 'Space':
        e.preventDefault();
        setControls(c => ({ ...c, kick: true }));
        break;
      case 'KeyE':
        setControls(c => ({ ...c, interact: true }));
        break;
      case 'KeyR':
        setControls(c => ({ ...c, resetBall: true }));
        break;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
      return;
    }

    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        setControls(c => ({ ...c, forward: false }));
        break;
      case 'KeyS':
      case 'ArrowDown':
        setControls(c => ({ ...c, backward: false }));
        break;
      case 'KeyA':
      case 'ArrowLeft':
        setControls(c => ({ ...c, left: false }));
        break;
      case 'KeyD':
      case 'ArrowRight':
        setControls(c => ({ ...c, right: false }));
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        setControls(c => ({ ...c, sprint: false }));
        break;
      case 'Space':
        setControls(c => ({ ...c, kick: false }));
        break;
      case 'KeyE':
        setControls(c => ({ ...c, interact: false }));
        break;
      case 'KeyR':
        setControls(c => ({ ...c, resetBall: false }));
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const setJoystick = useCallback((x: number, y: number) => {
    setControls(c => ({
      ...c,
      joystickVector: { x, y },
      forward: y < -0.2,
      backward: y > 0.2,
      left: x < -0.2,
      right: x > 0.2
    }));
  }, []);

  const triggerMobileKick = useCallback(() => {
    setControls(c => ({ ...c, kick: true }));
    setTimeout(() => {
      setControls(c => ({ ...c, kick: false }));
    }, 200);
  }, []);

  const triggerMobileSprint = useCallback((active: boolean) => {
    setControls(c => ({ ...c, sprint: active }));
  }, []);

  const triggerMobileInteract = useCallback(() => {
    setControls(c => ({ ...c, interact: true }));
    setTimeout(() => {
      setControls(c => ({ ...c, interact: false }));
    }, 200);
  }, []);

  const triggerMobileReset = useCallback(() => {
    setControls(c => ({ ...c, resetBall: true }));
    setTimeout(() => {
      setControls(c => ({ ...c, resetBall: false }));
    }, 200);
  }, []);

  return {
    controls,
    controlsRef,
    setJoystick,
    triggerMobileKick,
    triggerMobileSprint,
    triggerMobileInteract,
    triggerMobileReset
  };
}
