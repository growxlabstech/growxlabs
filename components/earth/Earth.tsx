'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { PhotorealisticEarthShader, EARTH_COLORS } from '@/lib/three';

interface EarthProps {
  radius?: number;
}

export const Earth: React.FC<EarthProps> = ({ radius = 2 }) => {
  // Load photorealistic NASA Blue Marble 8K texture maps
  const [dayMap, nightMap, normalMap, specularMap] = useTexture([
    '/textures/earth_day_8k.jpg',
    '/textures/earth_night_8k.jpg',
    '/textures/earth_normal_8k.jpg',
    '/textures/earth_specular_8k.jpg',
  ]);

  // Configure texture filtering for high-DPI GPU rendering
  [dayMap, nightMap, normalMap, specularMap].forEach((tex) => {
    if (tex) {
      tex.anisotropy = 16;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
    }
  });

  // Photorealistic Earth Shader Material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: PhotorealisticEarthShader.vertexShader,
      fragmentShader: PhotorealisticEarthShader.fragmentShader,
      uniforms: {
        dayMap: { value: dayMap },
        nightMap: { value: nightMap },
        normalMap: { value: normalMap },
        specularMap: { value: specularMap },
        sunPosition: { value: new THREE.Vector3(6, 3, 5) },
      },
      blending: THREE.NormalBlending,
    });
  }, [dayMap, nightMap, normalMap, specularMap]);

  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[radius, 64, 64]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};
