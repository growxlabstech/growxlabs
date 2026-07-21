'use client';

import React from 'react';
import * as THREE from 'three';
import { EARTH_COLORS } from '@/lib/three';

interface OrbitRingsProps {
  ringsRef?: React.RefObject<THREE.Group | null>;
}

export const OrbitRings: React.FC<OrbitRingsProps> = ({ ringsRef }) => {
  return (
    <group ref={ringsRef}>
      {/* Primary Equatorial Orbit Ring - Barely visible (< 3% opacity) */}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <ringGeometry args={[2.7, 2.71, 128]} />
        <meshBasicMaterial
          color={EARTH_COLORS.atmosphere}
          transparent
          opacity={0.025}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Secondary Tilted Polar Orbit Ring */}
      <mesh rotation={[Math.PI / 6, Math.PI / 4, 0.4]}>
        <ringGeometry args={[3.1, 3.108, 128]} />
        <meshBasicMaterial
          color={EARTH_COLORS.atmosphere}
          transparent
          opacity={0.018}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
