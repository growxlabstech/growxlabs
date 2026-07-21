'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AtmosphereShader, EARTH_COLORS } from '@/lib/three';

interface AtmosphereProps {
  radius?: number;
  color?: string;
}

export const Atmosphere: React.FC<AtmosphereProps> = ({
  radius = 2.03, // Scale 1.015x (Earth radius = 2.0)
  color = EARTH_COLORS.atmosphere,
}) => {
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: AtmosphereShader.vertexShader,
      fragmentShader: AtmosphereShader.fragmentShader,
      uniforms: {
        color: { value: new THREE.Color(color) },
        coefficient: { value: 0.65 },
        power: { value: 5.5 }, // Sharp, ultra-thin atmosphere rim with 70% reduced intensity
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, [color]);

  return (
    <mesh>
      <sphereGeometry args={[radius, 128, 128]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
};
