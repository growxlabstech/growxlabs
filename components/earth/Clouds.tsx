'use client';

import React from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface CloudsProps {
  radius?: number;
  cloudsRef?: React.RefObject<THREE.Mesh | null>;
}

export const Clouds: React.FC<CloudsProps> = ({
  radius = 2.022,
  cloudsRef,
}) => {
  // Load real atmospheric cloud texture
  const cloudsMap = useTexture('/textures/earth_clouds_8k.png');

  if (cloudsMap) {
    cloudsMap.anisotropy = 16;
  }

  return (
    <mesh ref={cloudsRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={cloudsMap}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        roughness={1}
      />
    </mesh>
  );
};
