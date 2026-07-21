'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Creates an offscreen CanvasTexture with a soft radial circular glow gradient.
 * Eliminates square point sprites completely.
 */
function createCircularStarTexture(): THREE.CanvasTexture | null {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 64, 64);
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface StarLayerProps {
  count: number;
  minSize: number;
  maxSize: number;
  speed: number;
  spreadX: number;
  spreadY: number;
  spreadZ: number;
  texture: THREE.CanvasTexture | null;
}

function StarLayer({
  count,
  minSize,
  maxSize,
  speed,
  spreadX,
  spreadY,
  spreadZ,
  texture,
}: StarLayerProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    // Color Palette: 95% White, 3% Soft Blue, 2% Warm Gold
    const colorWhite = new THREE.Color('#ffffff');
    const colorBlue = new THREE.Color('#a5f3fc');
    const colorGold = new THREE.Color('#fef08a');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = -Math.random() * spreadZ + 15;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color selection
      const randColor = Math.random();
      let selectedColor = colorWhite;
      if (randColor > 0.97) selectedColor = colorGold;
      else if (randColor > 0.94) selectedColor = colorBlue;

      col[i * 3] = selectedColor.r;
      col[i * 3 + 1] = selectedColor.g;
      col[i * 3 + 2] = selectedColor.b;

      sz[i] = Math.random() * (maxSize - minSize) + minSize;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count, minSize, maxSize, spreadX, spreadY, spreadZ]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    const deltaFactor = Math.min(delta, 0.1) * 60; // Standardized to 60 FPS

    for (let i = 0; i < count; i++) {
      let z = array[i * 3 + 2];
      z += speed * deltaFactor;

      // When star passes camera (+15), wrap seamlessly far behind (-spreadZ + 15)
      if (z > 15) {
        z = -spreadZ + 15;
        array[i * 3] = (Math.random() - 0.5) * spreadX;
        array[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      }

      array[i * 3 + 2] = z;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture || undefined}
        size={1.2}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function DeepSpaceStars() {
  const [starTexture, setStarTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const tex = createCircularStarTexture();
    setStarTexture(tex);
  }, []);

  return (
    <group>
      {/* Layer 1: Background — 20,000 tiny stars (0.5px–1.0px, slow speed) */}
      <StarLayer
        count={20000}
        minSize={0.4}
        maxSize={0.9}
        speed={0.04}
        spreadX={350}
        spreadY={350}
        spreadZ={350}
        texture={starTexture}
      />

      {/* Layer 2: Midground — 5,000 stars (1.0px–1.8px, medium speed) */}
      <StarLayer
        count={5000}
        minSize={0.9}
        maxSize={1.8}
        speed={0.10}
        spreadX={280}
        spreadY={280}
        spreadZ={300}
        texture={starTexture}
      />

      {/* Layer 3: Foreground — 300 larger glowing stars (1.8px–3.0px, faster parallax) */}
      <StarLayer
        count={300}
        minSize={1.8}
        maxSize={3.0}
        speed={0.22}
        spreadX={200}
        spreadY={200}
        spreadZ={240}
        texture={starTexture}
      />
    </group>
  );
}

export const Stars = DeepSpaceStars;
