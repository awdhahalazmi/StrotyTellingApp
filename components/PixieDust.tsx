'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { seeded, r } from '@/lib/seeded';

interface Particle { id: number; x: number; y: number; size: number; delay: number; duration: number; color: string; }

const COLORS = ['#FFD700', '#FFF8DC', '#FFFACD', '#FFE066', '#FFF0A0'];

export default function PixieDust() {
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id:       i,
      x:        r(seeded(i * 6 + 1) * 100),
      y:        r(seeded(i * 6 + 2) * 100),
      size:     r(seeded(i * 6 + 3) * 5 + 3),
      delay:    r(seeded(i * 6 + 4) * 4),
      duration: r(seeded(i * 6 + 5) * 2 + 2),
      color:    COLORS[Math.floor(seeded(i * 6 + 6) * COLORS.length)],
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left:      `${p.x}%`,
            top:       `${p.y}%`,
            width:     `${p.size}px`,
            height:    `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${r(p.size * 2)}px ${p.color}`,
          }}
          animate={{ y: [0, -30, -60], opacity: [0, 1, 0], scale: [0.5, 1, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
