'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StoryParams } from '@/lib/openrouter';
import { seeded, r } from '@/lib/seeded';
import SceneImage from './SceneImage';
import StoryPlayer from './StoryPlayer';

interface StoryReaderProps {
  story: string;
  imagePrompts: string[];
  params: StoryParams;
  onNewStory: () => void;
  onRegenerate: () => void;
}

export default function StoryReader({ story, imagePrompts, params, onNewStory, onRegenerate }: StoryReaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* fallback */ }
  };

  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id:       i,
      x:        r(seeded(i * 7 + 3) * 100),
      y:        r(seeded(i * 7 + 4) * 100),
      size:     r(seeded(i * 7 + 5) * 4 + 2),
      delay:    r(seeded(i * 7 + 6) * 5),
      duration: r(seeded(i * 7 + 7) * 3 + 2),
      color:    ['#FFD700', '#b8a9e0', '#7ecfff', '#FFF8DC'][Math.floor(seeded(i * 7 + 8) * 4)],
    })), []);

  const paragraphs = story.split('\n').map(p => p.trim()).filter(Boolean);
  const hasImages  = imagePrompts.length > 0;

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, #050714 0%, #0d0a2e 50%, #1a0a3e 100%)' }}
    >
      {/* Ambient particles */}
      {particles.map(p => (
        <motion.div key={p.id} className="fixed rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: p.color, boxShadow: `0 0 ${p.size * 2}px ${p.color}`, zIndex: 0 }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i} className="absolute rounded-full bg-white star"
            style={{
              left: `${r(seeded(i * 3 + 1) * 100)}%`, top: `${r(seeded(i * 3 + 2) * 100)}%`,
              width: `${r(seeded(i * 3 + 3) * 2 + 1)}px`, height: `${r(seeded(i * 3 + 3) * 2 + 1)}px`,
              opacity: r(seeded(i * 3 + 4) * 0.6 + 0.2),
              '--duration': `${r(seeded(i * 3 + 5) * 2.5 + 1.5)}s`,
              '--delay': `${r(seeded(i * 3 + 6) * 4)}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 pb-24">

        {/* Header */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <div className="text-4xl mb-3">📖</div>
          <h1 className="font-cinzel text-2xl md:text-3xl text-moon-gold text-glow-gold mb-1">
            {params.childName}&apos;s Magical Adventure
          </h1>
          <p className="text-soft-lavender/60 font-lato text-xs">
            {params.theme} · {{ short: 'Short Bedtime Story', medium: 'Medium Adventure', long: 'Long Magical Journey' }[params.length]}
          </p>
        </motion.div>

        {/* Storybook outer frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
          className="rounded-3xl p-[1px]"
          style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.5) 0%, rgba(179,157,219,0.3) 50%, rgba(245,200,66,0.5) 100%)' }}
        >
          <div className="rounded-3xl overflow-hidden p-6 md:p-8 space-y-10"
            style={{ background: 'rgba(5,7,20,0.94)', backdropFilter: 'blur(20px)' }}
          >

            {/* Top ornament */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(245,200,66,0.4))' }} />
              <span className="text-moon-gold text-xs tracking-widest font-cinzel uppercase">A Bedtime Tale</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(245,200,66,0.4))' }} />
            </div>

            {/* Scenes */}
            {paragraphs.map((para, i) => {
              const imgPrompt  = imagePrompts[i];
              const flipLayout = i % 2 !== 0; // alternate image side on desktop

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                >
                  {hasImages && imgPrompt ? (
                    /* Picture-book layout: image + text side-by-side on desktop */
                    <div className={`flex flex-col ${flipLayout ? 'md:flex-row-reverse' : 'md:flex-row'} gap-5 items-center`}>
                      {/* Illustration */}
                      <div className="w-full md:w-1/2 shrink-0">
                        <SceneImage prompt={imgPrompt} theme={params.theme} index={i} />
                      </div>

                      {/* Text */}
                      <div className="w-full md:w-1/2">
                        {/* Scene divider */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-cinzel text-xs text-moon-gold/60 uppercase tracking-widest">Scene {i + 1}</span>
                          <div className="flex-1 h-px" style={{ background: 'rgba(245,200,66,0.15)' }} />
                        </div>
                        <p className="font-lato leading-8 text-base" style={{ color: '#e8e4d8' }}>
                          {i === 0 && (
                            <span className="font-cinzel float-left mr-2 leading-none"
                              style={{ fontSize: '3rem', color: '#f5c842', lineHeight: '0.85' }}>
                              {para[0]}
                            </span>
                          )}
                          {i === 0 ? para.slice(1) : para}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Text-only fallback */
                    <p className="font-lato leading-8 text-base" style={{ color: '#e8e4d8' }}>
                      {i === 0 && (
                        <span className="font-cinzel float-left mr-2 leading-none"
                          style={{ fontSize: '3rem', color: '#f5c842', lineHeight: '0.85' }}>
                          {para[0]}
                        </span>
                      )}
                      {i === 0 ? para.slice(1) : para}
                    </p>
                  )}

                  {/* Inter-scene divider (not after last) */}
                  {i < paragraphs.length - 1 && (
                    <div className="flex items-center gap-3 mt-8">
                      <div className="flex-1 h-px" style={{ background: 'rgba(245,200,66,0.1)' }} />
                      <span style={{ color: 'rgba(245,200,66,0.3)', fontSize: 10 }}>✦</span>
                      <div className="flex-1 h-px" style={{ background: 'rgba(245,200,66,0.1)' }} />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Bottom ornament */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(245,200,66,0.4))' }} />
              <span className="text-moon-gold text-lg">✦</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(245,200,66,0.4))' }} />
            </div>

            {/* Read aloud player */}
            <StoryPlayer text={story} />

          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mt-6 justify-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.button onClick={onNewStory}
            className="flex-1 sm:flex-none px-6 py-3 rounded-2xl font-cinzel font-semibold text-sm text-midnight"
            style={{ background: 'linear-gradient(135deg, #f5c842, #f48fb1)', boxShadow: '0 0 20px rgba(245,200,66,0.4)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(245,200,66,0.65)' }} whileTap={{ scale: 0.97 }}>
            ✨ New Story
          </motion.button>

          <motion.button onClick={onRegenerate}
            className="flex-1 sm:flex-none px-6 py-3 rounded-2xl font-cinzel font-semibold text-sm border"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(179,157,219,0.4)', color: '#b39ddb' }}
            whileHover={{ scale: 1.04, background: 'rgba(179,157,219,0.12)', borderColor: 'rgba(179,157,219,0.7)' }}
            whileTap={{ scale: 0.97 }}>
            🔄 Regenerate
          </motion.button>

          <motion.button onClick={handleCopy}
            className="flex-1 sm:flex-none px-6 py-3 rounded-2xl font-cinzel font-semibold text-sm border"
            style={{
              background:   copied ? 'rgba(100,200,100,0.12)' : 'rgba(255,255,255,0.05)',
              borderColor:  copied ? 'rgba(100,200,100,0.5)'  : 'rgba(255,255,255,0.15)',
              color:        copied ? '#88e88a' : 'rgba(255,255,255,0.6)',
            }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </motion.button>
        </motion.div>

        <motion.p className="text-center text-white/20 text-xs font-lato mt-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          Sweet dreams ✨ · Powered by DreamTales AI
        </motion.p>
      </div>
    </div>
  );
}
