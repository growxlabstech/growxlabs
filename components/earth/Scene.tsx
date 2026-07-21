'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Earth } from './Earth';
import { Atmosphere } from './Atmosphere';
import { Clouds } from './Clouds';
import { Stars } from './Stars';
import { OrbitRings } from './OrbitRings';
import { Particles } from './Particles';
import { useEarthRotation } from '@/hooks/useEarthRotation';
import { EARTH_COLORS } from '@/lib/three';

function CameraRig() {
  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime();
    // Subtle camera floating movement
    camera.position.x = Math.sin(time * 0.12) * 0.12;
    camera.position.y = 1.05 + Math.cos(time * 0.18) * 0.06;
    camera.lookAt(0, -0.15, 0);
  });
  return null;
}

function GlobeContent() {
  const { earthGroupRef, cloudsRef, ringsRef, bindInteractions } = useEarthRotation();

  return (
    <group ref={earthGroupRef} {...bindInteractions}>
      <Earth radius={2} />
      <Clouds radius={2.022} cloudsRef={cloudsRef} />
      <Atmosphere radius={2.055} />
      <OrbitRings ringsRef={ringsRef} />
    </group>
  );
}

export function EarthScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[480px] md:min-h-[620px] select-none"
    >
      <Canvas
        camera={{ position: [0, 1.05, 5.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full bg-[#050505]"
      >
        <color attach="background" args={[EARTH_COLORS.background]} />

        {/* Photorealistic Sun & Ambient Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[6, 3, 5]}
          intensity={3.0}
          color="#ffffff"
        />

        <CameraRig />

        <Suspense fallback={null}>
          <GlobeContent />
          <Stars count={2200} />
          <Particles count={200} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
      </Canvas>
    </div>
  );
}

export default EarthScene;
