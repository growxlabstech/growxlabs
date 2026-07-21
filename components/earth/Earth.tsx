'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

interface EarthProps {
  radius?: number;
}

export const Earth: React.FC<EarthProps> = ({ radius = 2 }) => {
  // Load official NASA Earth textures via THREE.TextureLoader
  const [dayTexture, normalTexture, specularTexture, nightTexture] = useLoader(
    THREE.TextureLoader,
    [
      '/textures/earth_daymap.jpg',
      '/textures/earth_normal.jpg',
      '/textures/earth_specular.jpg',
      '/textures/earth_night.jpg',
    ]
  );

  // Configure Texture Wrap, sRGB ColorSpace, and 1x1 UV Repeat
  useMemo(() => {
    [dayTexture, normalTexture, specularTexture, nightTexture].forEach((tex) => {
      if (tex) {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.repeat.set(1, 1);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 16;
        tex.needsUpdate = true;
      }
    });
  }, [dayTexture, normalTexture, specularTexture, nightTexture]);

  // MeshStandardMaterial with Night Lights injected on unlit side
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      roughnessMap: specularTexture,
      metalness: 0,
      roughness: 1,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.nightTexture = { value: nightTexture };
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        #include <map_fragment>
        vec3 nightColor = texture2D(nightTexture, vUv).rgb * vec3(1.5, 1.25, 0.85);
        vec3 sunDirection = normalize(vec3(5.0, 3.0, 5.0));
        float sunDot = dot(vNormal, sunDirection);
        float dayFactor = smoothstep(-0.15, 0.25, sunDot);
        diffuseColor.rgb = mix(nightColor * (1.0 - dayFactor), diffuseColor.rgb, dayFactor);
        `
      );
    };

    return mat;
  }, [dayTexture, normalTexture, specularTexture, nightTexture]);

  return (
    <mesh castShadow receiveShadow>
      {/* At least 128x128 segments */}
      <sphereGeometry args={[radius, 128, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};
