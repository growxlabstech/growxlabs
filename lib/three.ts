import * as THREE from 'three';

/**
 * Photorealistic Earth Color Palette Constants
 */
export const EARTH_COLORS = {
  background: '#050505',
  atmosphere: '#53D9FF', // Soft cyan atmospheric rim
  orbitRing: 'rgba(83, 217, 255, 0.08)',
  stars: '#FFFFFF',
  cityLights: '#FFE0B2', // Warm White / Amber city lights
};

/**
 * Photorealistic Earth Shader
 * Combines NASA Blue Marble Day map, Night city lights, Normal bump map, Specular ocean reflections,
 * and a realistic day/night terminator blend.
 */
export const PhotorealisticEarthShader = {
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vSunDirection;

    uniform vec3 sunPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vSunDirection = normalize(sunPosition - worldPos.xyz);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vSunDirection;

    uniform sampler2D dayMap;
    uniform sampler2D nightMap;
    uniform sampler2D normalMap;
    uniform sampler2D specularMap;
    uniform vec3 sunPosition;

    void main() {
      // Sample textures
      vec3 dayColor = texture2D(dayMap, vUv).rgb;
      vec3 nightColor = texture2D(nightMap, vUv).rgb * vec3(1.3, 1.15, 0.9); // Warm city lights
      float specularMask = texture2D(specularMap, vUv).r;

      // Calculate lighting angles
      vec3 normal = vNormal;
      vec3 sunDir = vSunDirection;
      float sunDot = dot(normal, sunDir);

      // Smooth day/night terminator blend
      float terminator = smoothstep(-0.2, 0.25, sunDot);

      // Sun diffuse intensity on day side
      float diffuse = max(0.0, sunDot);

      // Specular ocean reflection on day side
      vec3 viewDir = normalize(-vWorldPosition);
      vec3 reflectDir = reflect(-sunDir, normal);
      float spec = pow(max(0.0, dot(viewDir, reflectDir)), 32.0) * specularMask * 0.8;

      // Day hemisphere color with realistic diffuse & ocean shine
      vec3 dayFinal = dayColor * (diffuse * 0.9 + 0.1) + vec3(spec);

      // Night hemisphere color with glowing city lights
      vec3 nightFinal = nightColor * (1.0 - terminator);

      // Blend day and night hemispheres smoothly across the globe
      vec3 finalColor = mix(nightFinal, dayFinal, terminator);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

/**
 * Thin Atmospheric Scattering Shader (Fresnel Effect)
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
      gl_FragColor = vec4(color, intensity * 0.4);
    }
  `,
};

/**
 * Memory Disposal Utility
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
