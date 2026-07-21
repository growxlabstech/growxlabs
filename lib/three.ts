import * as THREE from 'three';

/**
 * Official NASA Earth Palette Constants
 */
export const EARTH_COLORS = {
  background: '#000000',
  atmosphere: '#40A0FF', // Soft Blue Fresnel Rim
  orbitRing: 'rgba(83, 217, 255, 0.08)',
  stars: '#FFFFFF',
};

/**
 * Soft Blue Atmospheric Fresnel Scattering Shader (Sphere 2, Scale 1.02x)
 */
export const AtmosphereShader = {
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform vec3 color;
    uniform float coefficient;
    uniform float power;

    void main() {
      vec3 viewDirection = normalize(-vPosition);
      float intensity = pow(coefficient - dot(vNormal, viewDirection), power);
      intensity = clamp(intensity, 0.0, 1.0);
      gl_FragColor = vec4(color, intensity * 0.35); // Subtle soft blue atmosphere
    }
  `,
};

/**
 * WebGL Memory Disposal Utility
 */
export function disposeObject(object: THREE.Object3D): void {
  if (!object) return;
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
  });
}
