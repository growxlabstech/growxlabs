'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

interface CloudsProps {
  radius?: number;
  cloudsRef?: React.RefObject<THREE.Mesh | null>;
}

export const Clouds: React.FC<CloudsProps> = ({
  radius = 2.02, // Scale 1.01x (Earth radius = 2.0)
  cloudsRef,
}) => {
  // Load transparent PNG cloud texture via TextureLoader
  const cloudsMap = useLoader(THREE.TextureLoader, '/textures/earth_clouds.png');

  useMemo(() => {
    if (cloudsMap) {
      cloudsMap.wrapS = THREE.RepeatWrapping;
      cloudsMap.wrapT = THREE.ClampToEdgeWrapping;
      cloudsMap.repeat.set(1, 1);
      cloudsMap.colorSpace = THREE.SRGBColorSpace;
      cloudsMap.anisotropy = 16;
      cloudsMap.needsUpdate = true;
    }
  }, [cloudsMap]);

  return (
    <mesh ref={cloudsRef}>
      {/* 128x128 segments */}
      <sphereGeometry args={[radius, 128, 128]} />
      <meshStandardMaterial
        map={cloudsMap}
        transparent
        opacity={0.35} // Opacity around 35%
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        roughness={1}
      />
    </mesh>
  );
};
