'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StarData {
  x: number; y: number; size: number; delay: number; duration: number;
}
interface CloudData {
  x: number; y: number; width: number; height: number; delay: number; duration: number; opacity: number;
}

export default function NightSky() {
  const [stars, setStars] = useState<StarData[]>([]);
  const [clouds, setClouds] = useState<CloudData[]>([]);

  useEffect(() => {
    const s: StarData[] = Array.from({ length: 160 }, (_, i) => {
      const r = (n: number) => ((i * 9301 + n * 49297) % 233280) / 233280;
      return {
        x: r(1) * 100,
        y: r(2) * 85,
        size: r(3) * 2.5 + 0.5,
        delay: r(4) * 5,
        duration: r(5) * 3 + 1.5,
      };
    });
    setStars(s);

    const c: CloudData[] = Array.from({ length: 6 }, (_, i) => {
      const r = (n: number) => ((i * 7919 + n * 6271) % 233280) / 233280;
      return {
        x: r(1) * 80,
        y: r(2) * 40 + 5,
        width: r(3) * 200 + 150,
        height: r(4) * 40 + 20,
        delay: r(5) * 3,
        duration: r(6) * 6 + 6,
        opacity: r(7) * 0.15 + 0.05,
      };
    });
    setClouds(c);
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      style={{
        background: 'radial-gradient(ellipse at 70% 20%, #1a0a5e 0%, #0d0a2e 40%, #050714 100%)',
      }}
    >
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute"
        style={{ right: '10%', top: '8%' }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
      >
        <div
          className="w-28 h-28 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #fffde7, #fff9c4, #f5e6a3)',
            boxShadow: '0 0 40px rgba(255,253,200,0.6), 0 0 80px rgba(255,253,200,0.3), 0 0 120px rgba(255,253,200,0.15)',
          }}
        />
        {/* Moon craters */}
        <div className="absolute w-4 h-4 rounded-full bg-yellow-200/30" style={{ top: '20%', left: '55%' }} />
        <div className="absolute w-3 h-3 rounded-full bg-yellow-200/20" style={{ top: '55%', left: '25%' }} />
      </motion.div>

      {/* Clouds */}
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            background: `rgba(200, 210, 255, ${cloud.opacity})`,
            filter: 'blur(20px)',
            '--duration': `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          } as React.CSSProperties}
          animate={{
            x: [0, 20, -10, 20, 0],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Fog at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(13,10,46,0.8) 0%, rgba(92,107,192,0.05) 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(20, 15, 60, 0.6) 0%, transparent 100%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Scene label */}
      <motion.p
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-soft-lavender/60 text-sm font-lato tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        A magical night begins…
      </motion.p>
    </motion.div>
  );
}
