'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryParams } from '@/lib/openrouter';
import StarField from '@/components/ui/StarField';
import ApiKeyModal from '@/components/ui/ApiKeyModal';

interface StoryFormProps {
  onSubmit: (params: StoryParams) => void;
  initialError?: string;
}

const THEMES = [
  { id: 'Magical Forest', emoji: '🌲', label: 'Magical Forest' },
  { id: 'Space Adventure', emoji: '🚀', label: 'Space Adventure' },
  { id: 'Friendly Dragon', emoji: '🐉', label: 'Friendly Dragon' },
  { id: 'Princess Kingdom', emoji: '👑', label: 'Princess Kingdom' },
  { id: 'Pirate Adventure', emoji: '🏴‍☠️', label: 'Pirate Adventure' },
  { id: 'Talking Animals', emoji: '🐾', label: 'Talking Animals' },
  { id: 'Ocean Kingdom', emoji: '🌊', label: 'Ocean Kingdom' },
  { id: 'Unicorn Valley', emoji: '🦄', label: 'Unicorn Valley' },
  { id: 'Dinosaur Adventure', emoji: '🦕', label: 'Dinosaur Adventure' },
  { id: 'Superhero Journey', emoji: '⚡', label: 'Superhero Journey' },
  { id: 'Dreamland', emoji: '💭', label: 'Dreamland' },
  { id: 'Custom Theme', emoji: '✨', label: 'Custom Theme' },
];

const ELEMENTS = [
  'Fairies', 'Pixies', 'Dragons', 'Unicorns', 'Talking Animals',
  'Moon Magic', 'Stars', 'Castles', 'Magic Schools', 'Forest Spirits',
  'Friendly Giants', 'Mermaids', 'Treasure Hunts', 'Flying Ships',
];

const LENGTHS: { id: 'short' | 'medium' | 'long'; label: string; desc: string; emoji: string }[] = [
  { id: 'short', label: 'Short Bedtime Story', desc: '~300 words', emoji: '🌙' },
  { id: 'medium', label: 'Medium Adventure', desc: '~600 words', emoji: '⭐' },
  { id: 'long', label: 'Long Magical Journey', desc: '~1000 words', emoji: '🌟' },
];

export default function StoryForm({ onSubmit, initialError = '' }: StoryFormProps) {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState(5);
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [elements, setElements] = useState<string[]>([]);
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(initialError);

  // Sparkle positions on button hover
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const toggleElement = (el: string) => {
    setElements(prev =>
      prev.includes(el) ? prev.filter(e => e !== el) : [...prev, el]
    );
  };

  const handleSubmit = () => {
    if (!childName.trim()) { setError('Please enter your child\'s name.'); return; }
    if (!theme) { setError('Please select a story theme.'); return; }

    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || localStorage.getItem('dreamtales_api_key') || '';
    if (!apiKey) {
      setShowModal(true);
      return;
    }

    const finalTheme = theme === 'Custom Theme' && customTheme.trim() ? customTheme.trim() : theme;

    setIsSubmitting(true);
    onSubmit({ childName: childName.trim(), childAge, theme: finalTheme, elements, length, description: description.trim() });
  };

  const handleModalClose = (key: string) => {
    setShowModal(false);
    if (key) {
      const finalTheme = theme === 'Custom Theme' && customTheme.trim() ? customTheme.trim() : theme;
      setIsSubmitting(true);
      onSubmit({ childName: childName.trim(), childAge, theme: finalTheme, elements, length, description: description.trim() });
    }
  };

  return (
    <div className="min-h-screen relative overflow-y-auto overflow-x-hidden" style={{ background: '#050714' }}>
      <StarField starCount={120} className="fixed" />

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 20% 20%, rgba(92,107,192,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(179,157,219,0.1) 0%, transparent 50%)',
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 pb-24">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-cinzel text-3xl md:text-5xl text-moon-gold text-glow-gold mb-3">
            DreamTales
          </h1>
          <p className="font-lato text-soft-lavender/80 text-base md:text-lg">
            Create a magical bedtime story, just for your little one ✨
          </p>
        </motion.div>

        {/* Error toast */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl glass-dark border border-magical-pink/40 text-magical-pink font-lato text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card */}
        <motion.div
          className="glass-dark rounded-3xl p-6 md:p-10 space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          {/* Child Info */}
          <section>
            <h2 className="font-cinzel text-moon-gold text-xl mb-5 flex items-center gap-2">
              <span>👶</span> Child Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-soft-lavender/80 text-sm mb-2 font-lato">Child&apos;s Name</label>
                <input
                  type="text"
                  value={childName}
                  onChange={e => setChildName(e.target.value)}
                  placeholder="Child's name..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-soft-lavender/20 text-white placeholder-white/25 focus:outline-none focus:border-moon-gold/60 focus:ring-1 focus:ring-moon-gold/30 transition-all font-lato"
                />
              </div>
              <div>
                <label className="block text-soft-lavender/80 text-sm mb-2 font-lato">Age</label>
                <div
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(179,157,219,0.25)', background: 'rgba(255,255,255,0.04)' }}
                >
                  {/* Decrement */}
                  <motion.button
                    type="button"
                    onClick={() => setChildAge(a => Math.max(1, a - 1))}
                    disabled={childAge <= 1}
                    className="flex items-center justify-center font-bold text-lg select-none"
                    style={{
                      width: 48, height: 52, flexShrink: 0,
                      color: childAge <= 1 ? 'rgba(255,255,255,0.2)' : '#f5c842',
                      background: 'rgba(255,255,255,0.04)',
                      borderRight: '1px solid rgba(179,157,219,0.15)',
                      cursor: childAge <= 1 ? 'not-allowed' : 'pointer',
                    }}
                    whileHover={childAge > 1 ? { background: 'rgba(245,200,66,0.1)' } : {}}
                    whileTap={childAge > 1 ? { scale: 0.9 } : {}}
                  >
                    −
                  </motion.button>

                  {/* Value */}
                  <div className="flex-1 flex flex-col items-center justify-center py-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={childAge}
                        className="font-cinzel font-bold text-2xl text-moon-gold leading-none"
                        style={{ textShadow: '0 0 12px rgba(245,200,66,0.5)' }}
                        initial={{ opacity: 0, y: childAge > 1 ? -10 : 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: childAge > 1 ? 10 : -10, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                      >
                        {childAge}
                      </motion.span>
                    </AnimatePresence>
                    <span className="font-lato text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      year{childAge !== 1 ? 's' : ''} old
                    </span>
                  </div>

                  {/* Increment */}
                  <motion.button
                    type="button"
                    onClick={() => setChildAge(a => Math.min(12, a + 1))}
                    disabled={childAge >= 12}
                    className="flex items-center justify-center font-bold text-lg select-none"
                    style={{
                      width: 48, height: 52, flexShrink: 0,
                      color: childAge >= 12 ? 'rgba(255,255,255,0.2)' : '#f5c842',
                      background: 'rgba(255,255,255,0.04)',
                      borderLeft: '1px solid rgba(179,157,219,0.15)',
                      cursor: childAge >= 12 ? 'not-allowed' : 'pointer',
                    }}
                    whileHover={childAge < 12 ? { background: 'rgba(245,200,66,0.1)' } : {}}
                    whileTap={childAge < 12 ? { scale: 0.9 } : {}}
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>
          </section>

          {/* Today's Inspiration */}
          <section>
            <h2 className="font-cinzel text-moon-gold text-xl mb-2 flex items-center gap-2">
              <span>💫</span> Today&apos;s Inspiration
              <span className="font-lato text-xs text-soft-lavender/50 font-normal ml-1">(optional)</span>
            </h2>
            <p className="text-soft-lavender/50 text-xs mb-4 font-lato">
              Describe something that happened to your child today — the AI will weave it into the story magically.
            </p>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 400))}
              placeholder="e.g. Today she helped a lost puppy find its way home, and she was so proud of herself..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-soft-lavender/20 text-white placeholder-white/25 focus:outline-none focus:border-moon-gold/60 focus:ring-1 focus:ring-moon-gold/30 transition-all font-lato resize-none leading-relaxed"
            />
            <p className="text-right text-soft-lavender/30 text-xs mt-1 font-lato">{description.length} / 400</p>
          </section>

          {/* Theme */}
          <section>
            <h2 className="font-cinzel text-moon-gold text-xl mb-5 flex items-center gap-2">
              <span>🎭</span> Story Theme
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {THEMES.map(t => (
                <motion.button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className="relative p-3 rounded-xl border text-center transition-all"
                  style={{
                    background: theme === t.id ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.04)',
                    borderColor: theme === t.id ? 'rgba(245,200,66,0.7)' : 'rgba(179,157,219,0.2)',
                    boxShadow: theme === t.id ? '0 0 16px rgba(245,200,66,0.3)' : 'none',
                  }}
                  whileHover={{ scale: 1.04, borderColor: 'rgba(245,200,66,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="text-2xl mb-1">{t.emoji}</div>
                  <div className="font-lato text-xs text-silver-white/80 leading-tight">{t.label}</div>
                  {theme === t.id && (
                    <motion.div
                      className="absolute top-1 right-1 w-2 h-2 rounded-full bg-moon-gold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            {theme === 'Custom Theme' && (
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                type="text"
                value={customTheme}
                onChange={e => setCustomTheme(e.target.value)}
                placeholder="Describe your custom theme..."
                className="w-full mt-3 px-4 py-3 rounded-xl bg-white/5 border border-moon-gold/40 text-white placeholder-white/25 focus:outline-none focus:border-moon-gold/70 transition-all font-lato"
              />
            )}
          </section>

          {/* Elements */}
          <section>
            <h2 className="font-cinzel text-moon-gold text-xl mb-2 flex items-center gap-2">
              <span>✨</span> Magical Elements
            </h2>
            <p className="text-soft-lavender/50 text-xs mb-4 font-lato">Select as many as you like</p>
            <div className="flex flex-wrap gap-2">
              {ELEMENTS.map(el => (
                <motion.button
                  key={el}
                  onClick={() => toggleElement(el)}
                  className="px-3 py-1.5 rounded-full text-sm font-lato border transition-all"
                  style={{
                    background: elements.includes(el) ? 'rgba(179,157,219,0.25)' : 'rgba(255,255,255,0.04)',
                    borderColor: elements.includes(el) ? 'rgba(179,157,219,0.8)' : 'rgba(179,157,219,0.2)',
                    color: elements.includes(el) ? '#e8eaf6' : 'rgba(232,234,246,0.5)',
                    boxShadow: elements.includes(el) ? '0 0 10px rgba(179,157,219,0.3)' : 'none',
                  }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {el}
                </motion.button>
              ))}
            </div>
          </section>

          {/* Length */}
          <section>
            <h2 className="font-cinzel text-moon-gold text-xl mb-5 flex items-center gap-2">
              <span>📖</span> Story Length
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {LENGTHS.map(l => (
                <motion.button
                  key={l.id}
                  onClick={() => setLength(l.id)}
                  className="p-4 rounded-xl border text-center transition-all"
                  style={{
                    background: length === l.id ? 'rgba(245,200,66,0.12)' : 'rgba(255,255,255,0.04)',
                    borderColor: length === l.id ? 'rgba(245,200,66,0.7)' : 'rgba(179,157,219,0.2)',
                    boxShadow: length === l.id ? '0 0 16px rgba(245,200,66,0.25)' : 'none',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="text-3xl mb-2">{l.emoji}</div>
                  <div className="font-cinzel text-sm text-silver-white mb-1">{l.label}</div>
                  <div className="font-lato text-xs text-soft-lavender/60">{l.desc}</div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="pt-4 flex flex-col items-center gap-4">
            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              onHoverStart={() => setHovering(true)}
              onHoverEnd={() => setHovering(false)}
              className="relative px-12 py-4 rounded-2xl font-cinzel font-semibold text-midnight text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #f5c842, #f48fb1)',
                boxShadow: '0 0 25px rgba(245,200,66,0.5), 0 0 50px rgba(245,200,66,0.25)',
              }}
              whileHover={!isSubmitting ? {
                scale: 1.05,
                boxShadow: '0 0 40px rgba(245,200,66,0.7), 0 0 80px rgba(245,200,66,0.35)',
              } : {}}
              whileTap={!isSubmitting ? { scale: 0.97 } : {}}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%', skewX: -20 }}
                animate={hovering ? { x: '200%' } : { x: '-100%' }}
                transition={{ duration: 0.6 }}
              />
              {/* Sparkle particles on hover */}
              <AnimatePresence>
                {hovering && Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-white"
                    style={{ left: `${15 + i * 13}%`, top: '50%' }}
                    initial={{ y: 0, opacity: 0, scale: 0 }}
                    animate={{ y: -30, opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                  />
                ))}
              </AnimatePresence>
              {isSubmitting ? '✨ Creating magic...' : '✨ Create My Magical Story ✨'}
            </motion.button>

            <p className="text-white/30 text-xs font-lato">
              Powered by AI • Stories generated with love ✨
            </p>
          </div>
        </motion.div>
      </div>

      <ApiKeyModal isOpen={showModal} onClose={handleModalClose} />
    </div>
  );
}
