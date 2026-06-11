'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

export default function PixieDust() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pixie travels from bottom-left to top-right
  // We'll approximate the path with keyframes
  const pathX = ['-5%', '15%', '35%', '55%', '75%', '90%'];
  const pathY = ['95%', '75%', '55%', '35%', '20%', '5%'];

  useEffect(() => {
    let step = 0;
    const totalSteps = 30;
    const stepDuration = 120; // ms per step

    intervalRef.current = setInterval(() => {
      if (step >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }

      const progress = step / totalSteps;
      // Approximate position along path
      const px = progress * 95 + Math.sin(progress * Math.PI * 2) * 5;
      const py = 95 - progress * 92;

      const newParticles: Particle[] = Array.from({ length: 3 }, () => ({
        id: particleId.current++,
        x: px,
        y: py,
        offsetX: (Math.random() - 0.5) * 6,
        offsetY: (Math.random() - 0.5) * 6,
      }));

      setParticles(prev => [...prev.slice(-60), ...newParticles]);
      step++;
    }, stepDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x + p.offsetX}%`,
            top: `${p.y + p.offsetY}%`,
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #fff7a0, #f5c842)',
            boxShadow: '0 0 6px rgba(245,200,66,0.9)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0, y: -25 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
      ))}

      {/* Main pixie — moves along diagonal */}
      <motion.div
        className="absolute"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{
          left: pathX,
          top: pathY,
        }}
        transition={{
          duration: 3.5,
          ease: 'easeInOut',
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      >
        {/* Glow aura */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,180,0.6) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
        {/* Pixie body */}
        <motion.div
          className="w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #fffde7, #f5c842)',
            boxShadow: '0 0 12px rgba(245,200,66,1), 0 0 24px rgba(245,200,66,0.6)',
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Sparkle arms */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <motion.div
            key={angle}
            className="absolute w-1 rounded-full"
            style={{
              height: '8px',
              background: 'rgba(255,253,200,0.8)',
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
              transform: `rotate(${angle}deg) translateY(-8px)`,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: angle / 360 }}
          />
        ))}
      </motion.div>

      {/* Caption */}
      <motion.p
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-moon-gold/70 text-sm font-lato tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        A tiny pixie carries magic through the stars…
      </motion.p>
    </motion.div>
  );
}
