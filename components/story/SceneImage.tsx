'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SceneImageProps {
  prompt: string;
  theme: string;
  index: number;
}

const FALLBACK_EMOJIS = ['🌙', '✨', '🌟', '🦋', '🌸', '🌈', '🔮', '🌺'];

export default function SceneImage({ prompt, theme, index }: SceneImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);

  const styleWords = 'soft watercolor children picture book illustration, warm cozy colors, gentle, whimsical, magical, dreamy, high quality';
  const fullPrompt = encodeURIComponent(`${prompt}, ${theme}, ${styleWords}`);
  const src = `https://image.pollinations.ai/prompt/${fullPrompt}?width=640&height=480&nologo=true&seed=${index * 37 + 11}`;

  if (error) {
    return (
      <div
        className="w-full rounded-2xl flex items-center justify-center"
        style={{
          aspectRatio: '4/3',
          background: 'linear-gradient(135deg, rgba(15,10,46,0.8), rgba(26,10,62,0.8))',
          border: '1px solid rgba(245,200,66,0.15)',
        }}
      >
        <span style={{ fontSize: 56 }}>{FALLBACK_EMOJIS[index % FALLBACK_EMOJIS.length]}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden"
      style={{
        aspectRatio: '4/3',
        boxShadow: '0 0 30px rgba(245,200,66,0.15), 0 8px 32px rgba(0,0,0,0.4)',
        border: '2px solid rgba(245,200,66,0.25)',
      }}
    >
      {/* Shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: 'linear-gradient(135deg, #0d0a2e, #1a0a3e)' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: 32 }}
          >
            ✨
          </motion.div>
          <motion.div
            className="text-xs font-lato text-center px-4"
            style={{ color: 'rgba(245,200,66,0.5)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Painting scene {index + 1}...
          </motion.div>
          {/* Shimmer bars */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(245,200,66,0.06) 50%, transparent 60%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      )}

      {/* Illustration */}
      <Image
        src={src}
        alt={`Scene ${index + 1}: ${prompt}`}
        fill
        className="object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease' }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
      />

      {/* Storybook page-edge overlay */}
      {loaded && (
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.2) 100%)',
          }}
        />
      )}

      {/* Scene number badge */}
      {loaded && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-cinzel"
          style={{
            background: 'rgba(5,7,20,0.75)',
            border: '1px solid rgba(245,200,66,0.4)',
            color: '#f5c842',
            backdropFilter: 'blur(4px)',
          }}
        >
          Scene {index + 1}
        </div>
      )}
    </div>
  );
}
