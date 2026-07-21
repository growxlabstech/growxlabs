'use client';

import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface NightLightsProps {
  radius?: number;
}

export const NightLights: React.FC<NightLightsProps> = ({ radius = 2.002 }) => {
  // Load official NASA Night Lights map
  const nightTexture = useTexture('/textures/earth_night.jpg');

  useLayoutEffect(() => {
    if (nightTexture) {
      nightTexture.colorSpace = THREE.SRGBColorSpace;
      nightTexture.wrapS = THREE.RepeatWrapping;
      nightTexture.wrapT = THREE.ClampToEdgeWrapping;
      nightTexture.repeat.set(1, 1);
      nightTexture.needsUpdate = true;
      console.log('nightTexture loaded:', nightTexture);
    }
  }, [nightTexture]);

  return (
    <mesh>
      {/* 128x128 segments */}
      <sphereGeometry args={[radius, 128, 128]} />
      <meshBasicMaterial
        map={nightTexture}
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </mesh>
  );
};
