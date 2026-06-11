'use client';

import { motion } from 'framer-motion';

export default function StarPortal() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Base night sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 20%, #1a0a5e 0%, #0d0a2e 40%, #050714 100%)',
        }}
      />

      {/* Star that grows into portal - top center */}
      <motion.div
        className="absolute"
        style={{ top: '15%', left: '65%', transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0.2 }}
        animate={{ scale: [0.2, 0.8, 1] }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        {/* Glowing star */}
        <motion.div
          className="w-6 h-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, #fffde7, #f5c842)',
            boxShadow: '0 0 20px rgba(245,200,66,1), 0 0 40px rgba(245,200,66,0.7)',
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(245,200,66,1), 0 0 40px rgba(245,200,66,0.7)',
              '0 0 60px rgba(245,200,66,1), 0 0 120px rgba(245,200,66,0.5)',
            ],
          }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>

      {/* Portal expanding from star position */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{
          top: '15%',
          left: '65%',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ width: 0, height: 0 }}
        animate={{ width: '250vmax', height: '250vmax' }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
      >
        {/* Swirling portal interior */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, #0d0a2e, #1a0a5e, #2d1b69, #3d1a8e, #1a0a5e, #0d0a2e)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        {/* Second swirl layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 180deg, transparent 0%, rgba(92,107,192,0.3) 30%, transparent 60%, rgba(179,157,219,0.2) 80%, transparent 100%)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center radial */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(13,10,46,0.0) 0%, rgba(5,7,20,0.8) 70%, rgba(5,7,20,1) 100%)',
          }}
        />
      </motion.div>

      {/* Camera zoom overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      >
        {/* Portal ring sparkles */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-moon-gold"
            style={{
              top: '15%',
              left: '65%',
              transformOrigin: '0 0',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.1, repeat: Infinity, repeatDelay: 1.5 }}
          />
        ))}
      </motion.div>

      {/* Text */}
      <motion.div
        className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="font-cinzel text-xl text-soft-lavender text-glow-gold italic tracking-wide">
          A world of magic awaits...
        </p>
      </motion.div>
    </motion.div>
  );
}
