'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { seeded, r } from '@/lib/seeded';

interface LoadingScreenProps {
  childName?: string;
  theme?: string;
}

const MESSAGES = [
  '✨ Sprinkling stardust...',
  '🌙 Gathering dreams...',
  '🧚 Asking the forest fairies...',
  '⭐ Collecting stars...',
  '📖 Writing your magical adventure...',
  '🌟 Weaving moonlight into words...',
  '🦋 Calling the dream butterflies...',
];

export default function LoadingScreen({ childName, theme }: LoadingScreenProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id:       i,
      x:        r(seeded(i * 5 + 1) * 100),
      y:        r(seeded(i * 5 + 2) * 100),
      size:     r(seeded(i * 5 + 3) * 6 + 3),
      delay:    r(seeded(i * 5 + 4) * 4),
      duration: r(seeded(i * 5 + 5) * 2.5 + 2),
      color:    ['#FFD700', '#FFF8DC', '#b8a9e0', '#7ecfff', '#ffb3de'][Math.floor(seeded(i * 5 + 6) * 5)],
    })),
  []);

  const orbitDots = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: (360 / 6) * i,
      color: i % 2 === 0 ? '#FFD700' : '#b8a9e0',
    })),
  []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050714 0%, #0d0a2e 50%, #1a0a3e 100%)' }}
    >
      {/* Floating ambient particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0], scale: [0.4, 1, 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(179,157,219,0.12) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)',
          }}
          animate={{ scale: [1.2, 0.9, 1.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      {/* Central moon/star icon */}
      <div className="relative flex items-center justify-center mb-10">
        {/* Outer orbit ring */}
        <motion.div
          className="absolute rounded-full border border-dashed"
          style={{ width: 160, height: 160, borderColor: 'rgba(245,200,66,0.2)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {orbitDots.map(dot => (
            <div
              key={dot.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: dot.color,
                boxShadow: `0 0 6px ${dot.color}`,
                top: '50%',
                left: '50%',
                transform: `rotate(${dot.angle}deg) translateX(78px) translateY(-50%)`,
              }}
            />
          ))}
        </motion.div>

        {/* Inner glow ring */}
        <motion.div
          className="absolute rounded-full border"
          style={{ width: 110, height: 110, borderColor: 'rgba(179,157,219,0.25)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Moon */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #fffde7, #fff9c4, #f5e6a3)',
            boxShadow: '0 0 30px rgba(255,253,200,0.7), 0 0 60px rgba(255,253,200,0.35)',
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span style={{ fontSize: 36 }}>🌙</span>
        </motion.div>
      </div>

      {/* Title */}
      {childName && (
        <motion.p
          className="text-soft-lavender text-sm mb-3 font-lato"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
        >
          Creating a story for <span className="text-moon-gold font-semibold">{childName}</span>
          {theme && <> · <span className="italic">{theme}</span></>}
        </motion.p>
      )}

      {/* Rotating message */}
      <div className="h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            className="text-lg md:text-xl font-cinzel text-center px-6"
            style={{ color: '#e8eaf6' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: '#f5c842' }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.22,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
