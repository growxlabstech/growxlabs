'use client';

import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface CloudsProps {
  radius?: number;
  cloudsRef?: React.RefObject<THREE.Mesh | null>;
}

export const Clouds: React.FC<CloudsProps> = ({
  radius = 2.02, // Scale 1.01x (Earth radius = 2.0)
  cloudsRef,
}) => {
  // Load transparent PNG cloud texture via useTexture
  const cloudsTexture = useTexture('/textures/earth_clouds.png');

  useLayoutEffect(() => {
    if (cloudsTexture) {
      cloudsTexture.colorSpace = THREE.SRGBColorSpace;
      cloudsTexture.wrapS = THREE.RepeatWrapping;
      cloudsTexture.wrapT = THREE.ClampToEdgeWrapping;
      cloudsTexture.repeat.set(1, 1);
      cloudsTexture.needsUpdate = true;
      console.log('cloudsTexture loaded:', cloudsTexture);
    }
  }, [cloudsTexture]);

  return (
    <mesh ref={cloudsRef}>
      {/* 128x128 segments */}
      <sphereGeometry args={[radius, 128, 128]} />
      <meshStandardMaterial
        map={cloudsTexture}
        transparent
        opacity={0.35} // Opacity around 35%
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        roughness={1}
      />
    </mesh>
  );
};
