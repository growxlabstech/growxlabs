'use client';

import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface EarthProps {
  radius?: number;
}

export const Earth: React.FC<EarthProps> = ({ radius = 2 }) => {
  // Load official NASA Earth textures via useTexture hook
  const dayTexture = useTexture('/textures/earth_daymap.jpg');
  const normalTexture = useTexture('/textures/earth_normal.jpg');
  const specularTexture = useTexture('/textures/earth_specular.jpg');

  // Configure Texture Wrap, sRGB ColorSpace, and 1x1 UV Repeat
  useLayoutEffect(() => {
    if (dayTexture) {
      dayTexture.colorSpace = THREE.SRGBColorSpace;
      dayTexture.wrapS = THREE.RepeatWrapping;
      dayTexture.wrapT = THREE.ClampToEdgeWrapping;
      dayTexture.repeat.set(1, 1);
      dayTexture.needsUpdate = true;
      console.log('dayTexture loaded:', dayTexture);
    }
    if (normalTexture) {
      normalTexture.wrapS = THREE.RepeatWrapping;
      normalTexture.wrapT = THREE.ClampToEdgeWrapping;
      normalTexture.repeat.set(1, 1);
      normalTexture.needsUpdate = true;
      console.log('normalTexture loaded:', normalTexture);
    }
    if (specularTexture) {
      specularTexture.wrapS = THREE.RepeatWrapping;
      specularTexture.wrapT = THREE.ClampToEdgeWrapping;
      specularTexture.repeat.set(1, 1);
      specularTexture.needsUpdate = true;
      console.log('specularTexture loaded:', specularTexture);
    }
  }, [dayTexture, normalTexture, specularTexture]);

  return (
    <mesh castShadow receiveShadow>
      {/* 128x128 segments */}
      <sphereGeometry args={[radius, 128, 128]} />
      <meshStandardMaterial
        map={dayTexture}
        normalMap={normalTexture}
        roughnessMap={specularTexture}
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
};
