'use client';

import React, { useEffect, useRef } from 'react';

// Exact pre-rendered ASCII visual elements extracted from OpenAI's GPT-5.6 Sol page source
const LEFT_WAVE = [
  "                   655655555555",
  "                55555666655555.665",
  "             555556565.55555655555665",
  "           566656655555.565665556565.65",
  "         555.55555655556565.56656.5555556",
  "        5555.555555.55565655555.5665555655",
  "       56.6.565.5.66..55655665.55555555.556",
  "     56.566555.556556556.665556556565665.5.55",
  "     55555.55555655555.55565.565.66555555.5.5",
  "    65.555566555...565555..5.555.565555.56.655",
  "   556.5555656556.56555.55556556555555565665565",
  "  5556.55555555555566555.5566.5555.556656.655556",
  "  6.555555655556565565.55.5555655555555555.66555",
  " .66555.5.65555555655566555555.665556.5555.565566",
  " 5555.655555655.65.5.5565.55.655..55656.555555555",
  " 5665.55555565656.55556.5..6656565555656555.65555",
  "56.55655566555566656...5.5556.56.5655.555555655555",
  "6555555555556555555555555.555565565556.55.55565556",
  "5555.65555556565555556555.56665556566556.5556.5655",
  ".5665.5.55555555565556566556565655.6655556.5555555",
  "56656.565565555.5556.555555655555.5.55655.65.66.56",
  "56.55.655555555555555555.565..55666555555555.55555",
  "5555.556555665.5555555.555655555.5556565.555566555",
  ".665565656566.5566655556565655656.5..55.6.65556655",
  " 55.565.55666555555566.5555555555566..55555556..6",
  " 55.555556655.56566.6565655.555.555655.5655555555",
  " 665555555.555556665.6566555565565.55565565565556",
  "  655.55555555555.5.55.65655566.5566565.55555.55",
  "  56555565.556.5666666555.65665555565556655.5565",
  "   5.555656555555555555655..5.5.655555655565555",
  "    56655665556565655555.665555556555565566655",
  "     .6655665.665555.55655655565665565555.555",
  "     5555555655555565565555555.5.55.66656555.",
  "       5565555556665.5.6555665556.665565555",
  "        6.66566555555..5555555555555655555",
  "         556656555555.55555555555555.5556",
  "           56..5556665655.5565555555556",
  "             .55555655655..6665555655",
  "                6565656.5555555555",
  "                   565555555665"
];

const GLOBE = [
  "          565...65",
  "       6555.5..6..565",
  "     .5....566.5.555655",
  "    56.55.6555.5566656.5",
  "   5565.5556.5...6..656.6",
  "  .65.56.566555555.5656..5",
  " 656555565.65.6.5555566.556",
  " 66.565.55566565555.5.555..",
  "5555556555.6565.6555556.6565",
  "5...56.55555...5..655.55..56",
  "5655.666665.5566.5655..56665",
  "55655566665.65555555655555..",
  "5.66556.5...55.56.6.5.5.55.6",
  ".6.5.65555..565.5555.55666..",
  "565.5565..66556..56.555.655.",
  " 5.55556....5.6555.65..5..6",
  " 56566556.5665556556555.6.6",
  "  55.5555555..6..565655.65",
  "   665.56565556555565.555",
  "    .555566.66..566..655",
  "     56.65655566.655...",
  "       .65665556.6656",
  "          56.55555"
];

const MOON = [
  "    556565",
  "  56.5666.66",
  " 5555.6.6....",
  ".5.5...56.556.",
  "55656.55..655.",
  "5....555555.55",
  ".6.5.5566565.5",
  "6.65.566.5..6.",
  " 556.555.5.6.",
  "  66.55.6555",
  "    6.5.55"
];

export function GPT56MatrixBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      // Clear canvas with full pitch black
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, width, height);

      // Compact grid spaces matching OpenAI's letter spacing
      const gridSpacingX = 11;
      const gridSpacingY = 13;

      ctx.font = '900 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const time = Date.now();

      // Calculate responsive offsets for components
      const leftWaveX = Math.max(10, width * 0.05);
      const leftWaveY = height * 0.15;

      const globeX = Math.min(width - 340, width * 0.72);
      const globeY = height * 0.28;

      const moonX = Math.min(width - 130, width * 0.9);
      const moonY = height * 0.48;

      // Draw character helper
      const drawChar = (
        char: string, 
        x: number, 
        y: number, 
        type: 'wave' | 'globe' | 'moon',
        colRatio: number
      ) => {
        const flickerVal = Math.sin(x * 17 + y * 23 + time / 190);
        let baseOpacity = 0.55;

        // Introduce organic density wave variations
        const densityFactor = Math.sin(x * 0.15 + y * 0.2) * 0.5 + 0.5;
        baseOpacity *= (0.35 + densityFactor * 0.65);

        let colorStr = '';
        if (type === 'wave') {
          // Warm gold/orange gradient for solar wave
          if (flickerVal > 0.4) {
            colorStr = '249, 115, 22, '; // Orange
          } else if (flickerVal > 0.0) {
            colorStr = '234, 179, 8, ';  // Gold/Yellow
          } else {
            colorStr = '156, 163, 175, '; // Grey
          }
        } else if (type === 'globe') {
          // Subtle yellow/grey tones for earth globe
          if (flickerVal > 0.3) {
            colorStr = '234, 179, 8, ';  // Yellow
          } else if (flickerVal > -0.3) {
            colorStr = '107, 114, 128, '; // Dark Grey
          } else {
            colorStr = '75, 85, 99, ';    // Medium Grey
          }
        } else {
          // Soft grey/whites for moon
          if (flickerVal > 0.35) {
            colorStr = '243, 244, 246, '; // Light Grey
          } else {
            colorStr = '107, 114, 128, '; // Dark Grey
          }
        }

        // Proximity hover highlight effects
        const mdx = x - mouseX;
        const mdy = y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        let mouseBonus = 0;
        let scale = 1.0;

        if (mdist < 100) {
          const factor = 1 - mdist / 100;
          mouseBonus = factor * 0.45;
          scale = 1.0 + factor * 0.35;
          colorStr = '245, 158, 11, '; // Amber highlight on hover
        }

        const finalOpacity = Math.max(0.05, Math.min(1.0, baseOpacity + mouseBonus));
        
        // Soft shimmers
        const currentChar = (Math.random() < 0.005) 
          ? (Math.random() < 0.5 ? '5' : '6') 
          : char;

        ctx.save();
        ctx.fillStyle = `rgba(${colorStr}${finalOpacity})`;
        ctx.font = `${type === 'wave' && colRatio > 0.4 ? 'bold' : 'normal'} ${Math.floor(11 * scale)}px monospace`;
        ctx.fillText(currentChar, x, y);
        ctx.restore();
      };

      // 1. Draw Left Wave
      LEFT_WAVE.forEach((rowStr, r) => {
        const y = leftWaveY + r * gridSpacingY;
        for (let c = 0; c < rowStr.length; c++) {
          const char = rowStr[c];
          if (char === ' ') continue;
          const x = leftWaveX + c * gridSpacingX;
          drawChar(char, x, y, 'wave', c / rowStr.length);
        }
      });

      // 2. Draw Globe
      GLOBE.forEach((rowStr, r) => {
        const y = globeY + r * gridSpacingY;
        for (let c = 0; c < rowStr.length; c++) {
          const char = rowStr[c];
          if (char === ' ') continue;
          const x = globeX + c * gridSpacingX;
          drawChar(char, x, y, 'globe', c / rowStr.length);
        }
      });

      // 3. Draw Moon
      MOON.forEach((rowStr, r) => {
        const y = moonY + r * gridSpacingY;
        for (let c = 0; c < rowStr.length; c++) {
          const char = rowStr[c];
          if (char === ' ') continue;
          const x = moonX + c * gridSpacingX;
          drawChar(char, x, y, 'moon', c / rowStr.length);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#030303] select-none pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
