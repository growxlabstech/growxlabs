"use client";

import React from "react";
import { usePathname } from "@/navigation";

/**
 * GlobalBackground Component
 * 
 * Style: Dark Intelligence Grid (Inspired by 21st.dev)
 * Performance: 100/100 (Pure CSS, 0ms TBT)
 * Aesthetic: Cinematic perspective grid with ambient brand-green blurs.
 */
export function GlobalBackground() {
  const pathname = usePathname();
  const isDashboard = pathname?.includes("/admin") || pathname?.includes("/client") || pathname?.includes("/demos");

  if (isDashboard) {
    return <div className="fixed inset-0 -z-50 bg-black pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-black overflow-hidden">
      {/* Cinematic Perspective Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 168, 107, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 168, 107, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 100%, black, transparent)',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'top center',
        }}
      />

      {/* Ambient Brand Blurs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: '#00A86B' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: '#00A86B' }}
        />
      </div>

      {/* Vignette Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
    </div>
  );
}
