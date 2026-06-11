'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FireflyData {
  x: number; y: number; delay: number; duration: number; size: number;
}
interface SparkleData {
  x: number; y: number; delay: number; duration: number;
}

export default function DreamWorld() {
  const [fireflies, setFireflies] = useState<FireflyData[]>([]);
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  useEffect(() => {
    const ff: FireflyData[] = Array.from({ length: 25 }, (_, i) => {
      const r = (n: number) => ((i * 9301 + n * 49297) % 233280) / 233280;
      return { x: r(1) * 100, y: r(2) * 70 + 10, delay: r(3) * 4, duration: r(4) * 4 + 4, size: r(5) * 4 + 2 };
    });
    setFireflies(ff);

    const sp: SparkleData[] = Array.from({ length: 30 }, (_, i) => {
      const r = (n: number) => ((i * 6271 + n * 7919) % 233280) / 233280;
      return { x: r(1) * 100, y: r(2) * 90, delay: r(3) * 5, duration: r(4) * 2 + 1.5 };
    });
    setSparkles(sp);
  }, []);

  const floatVariants = (duration: number, amplitude: number) => ({
    animate: {
      y: [0, -amplitude, 0],
      transition: { duration, repeat: Infinity, ease: 'easeInOut' as const },
    },
  });

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Sky background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #050714 0%, #0d0a2e 30%, #1a0a3e 55%, #2d1060 70%, #1a0a3e 85%, #0a1a0a 100%)',
        }}
      />

      {/* Moon */}
      <motion.div
        className="absolute w-20 h-20 rounded-full"
        style={{
          top: '8%', right: '12%',
          background: 'radial-gradient(circle at 35% 35%, #fffde7, #fff9c4)',
          boxShadow: '0 0 30px rgba(255,253,200,0.5), 0 0 60px rgba(255,253,200,0.2)',
        }}
        variants={floatVariants(8, 5)}
        animate="animate"
      />

      {/* Stars */}
      {Array.from({ length: 60 }, (_, i) => {
        const r = (n: number) => ((i * 3571 + n * 5347) % 233280) / 233280;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              left: `${r(1) * 100}%`,
              top: `${r(2) * 50}%`,
              width: `${r(3) * 2 + 0.5}px`,
              height: `${r(3) * 2 + 0.5}px`,
              '--duration': `${r(4) * 2 + 1.5}s`,
              animationDelay: `${r(5) * 4}s`,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Forest silhouette bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-52"
        style={{
          background: 'linear-gradient(to top, #050a08 0%, #0a1a0a 40%, transparent 100%)',
          clipPath: 'polygon(0 100%, 0 60%, 3% 45%, 5% 60%, 8% 30%, 11% 55%, 14% 20%, 17% 50%, 20% 35%, 23% 55%, 27% 15%, 30% 45%, 33% 25%, 36% 50%, 40% 30%, 43% 55%, 46% 20%, 50% 50%, 53% 30%, 56% 55%, 60% 15%, 63% 45%, 67% 25%, 70% 50%, 73% 35%, 76% 55%, 80% 20%, 83% 50%, 86% 30%, 89% 55%, 92% 25%, 95% 45%, 97% 55%, 100% 60%, 100% 100%)',
        }}
      />

      {/* Mushrooms */}
      {[
        { x: '8%', bottom: '12%', color: '#7c3aed', size: 60 },
        { x: '18%', bottom: '15%', color: '#9333ea', size: 45 },
        { x: '78%', bottom: '13%', color: '#a855f7', size: 55 },
        { x: '88%', bottom: '10%', color: '#7e22ce', size: 70 },
      ].map((m, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: m.x, bottom: m.bottom }}
          variants={floatVariants(3 + i, 8)}
          animate="animate"
        >
          {/* Cap */}
          <div
            style={{
              width: `${m.size}px`,
              height: `${m.size * 0.6}px`,
              background: `radial-gradient(ellipse at 40% 30%, ${m.color}dd, ${m.color}88)`,
              borderRadius: '50% 50% 0 0',
              boxShadow: `0 0 15px ${m.color}66`,
              position: 'relative',
            }}
          >
            {/* Spots */}
            <div className="absolute w-3 h-3 rounded-full bg-white/30" style={{ top: '25%', left: '30%' }} />
            <div className="absolute w-2 h-2 rounded-full bg-white/20" style={{ top: '40%', left: '60%' }} />
          </div>
          {/* Stem */}
          <div
            style={{
              width: `${m.size * 0.35}px`,
              height: `${m.size * 0.5}px`,
              background: 'rgba(240,220,255,0.7)',
              borderRadius: '4px',
              margin: '0 auto',
            }}
          />
        </motion.div>
      ))}

      {/* Floating lanterns */}
      {[
        { x: '25%', y: '30%', delay: 0 },
        { x: '45%', y: '20%', delay: 0.8 },
        { x: '65%', y: '35%', delay: 1.6 },
        { x: '15%', y: '45%', delay: 2.4 },
        { x: '82%', y: '28%', delay: 0.4 },
      ].map((l, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: l.x, top: l.y }}
          animate={{ y: [0, -15, 5, -10, 0], x: [0, 5, -5, 3, 0] }}
          transition={{ duration: 5 + i, delay: l.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            style={{
              width: '16px',
              height: '24px',
              background: 'radial-gradient(ellipse at 40% 30%, #ffd54f, #ff8f00)',
              borderRadius: '4px 4px 6px 6px',
              boxShadow: '0 0 12px rgba(255,160,0,0.8), 0 0 24px rgba(255,160,0,0.4)',
              border: '1px solid rgba(255,200,0,0.5)',
            }}
          />
          {/* Flame glow underneath */}
          <div
            style={{
              width: '8px',
              height: '8px',
              background: 'radial-gradient(circle, rgba(255,220,50,0.6), transparent)',
              borderRadius: '50%',
              margin: '0 auto',
            }}
          />
        </motion.div>
      ))}

      {/* Floating books */}
      {[
        { x: '30%', y: '55%', rotate: -15, delay: 0 },
        { x: '60%', y: '50%', rotate: 10, delay: 1 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: b.x, top: b.y, rotate: b.rotate }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4 + i, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            style={{
              width: '30px',
              height: '22px',
              background: 'linear-gradient(135deg, #f5c842, #e6a817)',
              borderRadius: '2px 4px 4px 2px',
              boxShadow: '0 0 10px rgba(245,200,66,0.5)',
              border: '1px solid rgba(245,200,66,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '2px', height: '18px', background: 'rgba(0,0,0,0.3)' }} />
          </div>
        </motion.div>
      ))}

      {/* Glowing flowers at bottom */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = 5 + i * 8;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${x}%`, bottom: '10%' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: i % 3 === 0 ? '#f48fb1' : i % 3 === 1 ? '#b39ddb' : '#80cbc4',
                boxShadow: `0 0 8px currentColor`,
                filter: 'blur(0.5px)',
              }}
            />
          </motion.div>
        );
      })}

      {/* Fireflies */}
      {fireflies.map((ff, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${ff.x}%`,
            top: `${ff.y}%`,
            width: `${ff.size}px`,
            height: `${ff.size}px`,
            background: 'radial-gradient(circle, #e8ff80, #c6ff00)',
            boxShadow: '0 0 8px rgba(180,255,0,0.8)',
          }}
          animate={{
            x: [0, 20, -15, 10, -20, 0],
            y: [0, -20, 10, -15, 5, 0],
            opacity: [0.4, 1, 0.6, 1, 0.3, 0.8],
          }}
          transition={{
            duration: ff.duration,
            delay: ff.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute text-moon-gold/60"
          style={{ left: `${sp.x}%`, top: `${sp.y}%`, fontSize: '10px' }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
          transition={{ duration: sp.duration, delay: sp.delay, repeat: Infinity, repeatDelay: 1 }}
        >
          ✦
        </motion.div>
      ))}

      {/* Title text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <p className="font-cinzel text-2xl md:text-3xl text-moon-gold text-glow-gold tracking-widest">
          Welcome to DreamTales
        </p>
        <p className="font-lato text-soft-lavender mt-2 text-sm tracking-wide">
          Where imagination comes alive…
        </p>
      </motion.div>
    </motion.div>
  );
}
