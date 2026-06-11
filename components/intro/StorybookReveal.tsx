'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StorybookRevealProps {
  onBegin: () => void;
}

interface OrbitParticle {
  angle: number;
  radius: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function StorybookReveal({ onBegin }: StorybookRevealProps) {
  const [bookOpen, setBookOpen] = useState(false);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [burst, setBurst] = useState(false);
  const [orbitParticles, setOrbitParticles] = useState<OrbitParticle[]>([]);

  useEffect(() => {
    const particles: OrbitParticle[] = Array.from({ length: 12 }, (_, i) => {
      const r = (n: number) => ((i * 9301 + n * 49297) % 233280) / 233280;
      return {
        angle: i * 30,
        radius: 110 + r(1) * 30,
        size: r(2) * 5 + 3,
        duration: r(3) * 4 + 6,
        delay: r(4) * 2,
        color: i % 3 === 0 ? '#f5c842' : i % 3 === 1 ? '#f48fb1' : '#b39ddb',
      };
    });
    setOrbitParticles(particles);

    const t1 = setTimeout(() => setBookOpen(true), 600);
    const t2 = setTimeout(() => setBurst(true), 1200);
    const t3 = setTimeout(() => setShowText1(true), 1500);
    const t4 = setTimeout(() => setShowText2(true), 2200);
    const t5 = setTimeout(() => setShowButton(true), 3000);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Dream world background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #050714 0%, #0d0a2e 30%, #1a0a3e 55%, #2d1060 70%, #1a0a3e 85%, #0a1a0a 100%)',
        }}
      />

      {/* Background stars */}
      {Array.from({ length: 60 }, (_, i) => {
        const r = (n: number) => ((i * 3571 + n * 5347) % 233280) / 233280;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              left: `${r(1) * 100}%`,
              top: `${r(2) * 80}%`,
              width: `${r(3) * 2 + 0.5}px`,
              height: `${r(3) * 2 + 0.5}px`,
              '--duration': `${r(4) * 2 + 1.5}s`,
              animationDelay: `${r(5) * 4}s`,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Book + text container */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Book */}
        <div className="relative" style={{ perspective: '1200px' }}>
          {/* Orbit particles around book */}
          {orbitParticles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                top: '50%',
                left: '50%',
                marginTop: `-${p.size / 2}px`,
                marginLeft: `-${p.size / 2}px`,
              }}
              animate={{
                rotate: [p.angle, p.angle + 360],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              // We can't do the orbit trick purely with framer rotate around a fixed point
              // Instead, use x/y animation to simulate orbit
              // Override with a simpler approach: just offset and rotate
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  transform: `translateX(${p.radius}px)`,
                }}
              />
            </motion.div>
          ))}

          {/* Proper orbit using CSS transform trick */}
          <div className="absolute inset-0 pointer-events-none" style={{ top: '50%', left: '50%' }}>
            {orbitParticles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: `${p.radius * 2}px`,
                  height: `${p.radius * 2}px`,
                  marginTop: `-${p.radius}px`,
                  marginLeft: `-${p.radius}px`,
                  borderRadius: '50%',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    background: p.color,
                    boxShadow: `0 0 6px ${p.color}, 0 0 12px ${p.color}66`,
                    top: 0,
                    left: '50%',
                    marginLeft: `-${p.size / 2}px`,
                    marginTop: `-${p.size / 2}px`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Book cover glow */}
          <motion.div
            className="absolute -inset-8 rounded-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(245,200,66,0.3) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Book body */}
          <div className="relative flex" style={{ width: '320px', height: '240px' }}>
            {/* Left cover (animated open) */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full rounded-l-lg overflow-hidden"
              style={{
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(135deg, #7c3a00, #a05010, #7c3a00)',
                border: '2px solid #f5c842',
                boxShadow: bookOpen ? '-8px 0 20px rgba(0,0,0,0.5)' : '4px 0 10px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
              animate={{ rotateY: bookOpen ? -60 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              {/* Cover decoration */}
              <div className="absolute inset-2 border border-moon-gold/40 rounded" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="font-cinzel text-moon-gold text-xs tracking-wider">DreamTales</span>
              </div>
            </motion.div>

            {/* Spine */}
            <div
              className="absolute z-10"
              style={{
                left: 'calc(50% - 8px)',
                top: 0,
                width: '16px',
                height: '100%',
                background: 'linear-gradient(90deg, #5a2800, #8b4513, #5a2800)',
                border: '1px solid #f5c842',
              }}
            />

            {/* Right page (inside) */}
            <div
              className="absolute right-0 top-0 w-1/2 h-full rounded-r-lg overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fdf6e3, #f5e6c8)',
                border: '2px solid #c8a050',
              }}
            >
              <div className="absolute inset-4 flex flex-col justify-center items-center gap-3">
                <div className="w-full h-1.5 rounded bg-amber-200/60" />
                <div className="w-4/5 h-1.5 rounded bg-amber-200/60" />
                <div className="w-full h-1.5 rounded bg-amber-200/60" />
                <div className="w-3/5 h-1.5 rounded bg-amber-200/60" />
                <div className="text-amber-800/40 text-2xl mt-2">✦</div>
                <div className="w-full h-1.5 rounded bg-amber-200/60" />
                <div className="w-4/5 h-1.5 rounded bg-amber-200/60" />
              </div>
            </div>

            {/* Left page (inside, behind cover) */}
            <div
              className="absolute left-0 top-0 w-1/2 h-full rounded-l-lg overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f5e6c8, #fdf6e3)',
                border: '2px solid #c8a050',
                zIndex: 1,
              }}
            >
              <div className="absolute inset-4 flex flex-col justify-center items-center gap-3">
                <div className="w-4/5 h-1.5 rounded bg-amber-200/60" />
                <div className="w-full h-1.5 rounded bg-amber-200/60" />
                <div className="w-3/5 h-1.5 rounded bg-amber-200/60" />
                <div className="text-amber-800/40 text-2xl mt-2">✦</div>
                <div className="w-full h-1.5 rounded bg-amber-200/60" />
                <div className="w-4/5 h-1.5 rounded bg-amber-200/60" />
              </div>
            </div>
          </div>

          {/* Golden particle burst */}
          <AnimatePresence>
            {burst && Array.from({ length: 20 }, (_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-moon-gold"
                  style={{
                    top: '50%', left: '50%',
                    boxShadow: '0 0 6px rgba(245,200,66,0.8)',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * (80 + Math.random() * 60),
                    y: Math.sin(angle) * (60 + Math.random() * 40),
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Text content */}
        <div className="text-center space-y-4 max-w-lg px-4">
          <AnimatePresence>
            {showText1 && (
              <motion.p
                className="font-cinzel text-xl md:text-2xl italic text-moon-gold text-glow-gold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                &ldquo;Every child deserves a magical story.&rdquo;
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showText2 && (
              <motion.p
                className="font-lato text-soft-lavender/80 text-base md:text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Let&apos;s create tonight&apos;s adventure.
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                <motion.button
                  onClick={onBegin}
                  className="relative px-10 py-4 rounded-2xl font-cinzel font-semibold text-midnight text-lg overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #f5c842, #f48fb1)',
                    boxShadow: '0 0 25px rgba(245,200,66,0.6), 0 0 50px rgba(245,200,66,0.3)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(245,200,66,0.8), 0 0 80px rgba(245,200,66,0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%', skewX: -20 }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  ✨ Begin Your Story ✨
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
