'use client';

import { useMemo } from 'react';
import { seeded, r } from '@/lib/seeded';

interface StarData  { x: number; y: number; size: number; opacity: number; duration: number; delay: number; }
interface CloudData { x: number; y: number; width: number; height: number; duration: number; delay: number; }

export default function NightSky() {
  const stars = useMemo<StarData[]>(() =>
    Array.from({ length: 80 }, (_, i) => ({
      x:        r(seeded(i * 7 + 1) * 100),
      y:        r(seeded(i * 7 + 2) * 100),
      size:     r(seeded(i * 7 + 3) * 2 + 1),
      opacity:  r(seeded(i * 7 + 4) * 0.7 + 0.3),
      duration: r(seeded(i * 7 + 5) * 2.5 + 1.5),
      delay:    r(seeded(i * 7 + 6) * 4),
    })), []);

  const clouds = useMemo<CloudData[]>(() =>
    Array.from({ length: 4 }, (_, i) => ({
      x:        r(seeded(i * 11 + 100) * 70),
      y:        r(seeded(i * 11 + 101) * 30 + 5),
      width:    r(seeded(i * 11 + 102) * 200 + 150),
      height:   r(seeded(i * 11 + 103) * 30 + 20),
      duration: r(seeded(i * 11 + 104) * 10 + 12),
      delay:    r(seeded(i * 11 + 105) * 5),
    })), []);

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 0, background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2e 40%, #1a0a2e 100%)' }}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className="star absolute rounded-full bg-white"
          style={{
            left:     `${star.x}%`,
            top:      `${star.y}%`,
            width:    `${star.size}px`,
            height:   `${star.size}px`,
            opacity:  star.opacity,
            '--duration': `${star.duration}s`,
            '--delay':    `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Moon */}
      <div
        className="absolute"
        style={{
          right: '8%', top: '6%', width: '100px', height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #fffde7, #fff9c4, #f5e6a3)',
          boxShadow: '0 0 40px rgba(255,253,200,0.6), 0 0 80px rgba(255,253,200,0.3), 0 0 120px rgba(255,253,200,0.15)',
        }}
      />

      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left:   `${cloud.x}%`,
            top:    `${cloud.y}%`,
            width:  `${cloud.width}px`,
            height: `${cloud.height}px`,
            background: 'rgba(200, 210, 255, 0.08)',
            filter: 'blur(24px)',
            animation: `cloudDrift ${cloud.duration}s ease-in-out ${cloud.delay}s infinite`,
          }}
        />
      ))}

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to top, rgba(10,10,26,0.9) 0%, rgba(15,15,46,0.4) 50%, transparent 100%)',
        }}
      />

      <style>{`
        @keyframes cloudDrift {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(25px); }
        }
      `}</style>
    </div>
  );
}
