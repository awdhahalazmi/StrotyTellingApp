'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryPlayerProps {
  text: string;
}

const PREFERRED_VOICES = [
  'Samantha', 'Karen', 'Moira', 'Allison', 'Ava', 'Susan',
  'Victoria', 'Fiona', 'Tessa', 'Veena', 'Google UK English Female',
  'Microsoft Aria', 'Microsoft Jenny',
];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const en = voices.filter(v => v.lang.startsWith('en'));
  for (const name of PREFERRED_VOICES) {
    const match = en.find(v => v.name.includes(name));
    if (match) return match;
  }
  return en[0] ?? voices[0] ?? null;
}

type PlayerState = 'idle' | 'playing' | 'paused';

export default function StoryPlayer({ text }: StoryPlayerProps) {
  const [state, setState]           = useState<PlayerState>('idle');
  const [voices, setVoices]         = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice]           = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate]             = useState(0.88);
  const [wordIndex, setWordIndex]   = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v.filter(x => x.lang.startsWith('en')));
        setVoice(prev => prev ?? pickBestVoice(v));
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState('idle');
    setWordIndex(0);
  }, []);

  const play = useCallback(() => {
    window.speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(text);
    utt.voice = voice;
    utt.rate  = rate;
    utt.pitch = 1.05;

    const words = text.trim().split(/\s+/);
    setTotalWords(words.length);
    setWordIndex(0);

    utt.onboundary = (e) => {
      if (e.name === 'word') {
        const spoken = text.slice(0, e.charIndex + e.charLength);
        const count  = spoken.trim().split(/\s+/).length;
        setWordIndex(count);
      }
    };
    utt.onend   = () => { setState('idle'); setWordIndex(0); };
    utt.onerror = () => { setState('idle'); setWordIndex(0); };

    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setState('playing');
  }, [text, voice, rate]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setState('paused');
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setState('playing');
  }, []);

  // Stop on unmount
  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  const progress = totalWords > 0 ? wordIndex / totalWords : 0;

  const barHeights = [4, 7, 10, 14, 10, 7, 4];

  return (
    <div
      className="rounded-2xl p-5 mt-2"
      style={{
        background:  'rgba(255,255,255,0.04)',
        border:      '1px solid rgba(245,200,66,0.2)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🔊</span>
        <span className="font-cinzel text-moon-gold text-sm tracking-wide">Read Aloud</span>
        <span className="text-soft-lavender/40 text-xs font-lato ml-1">AI narration</span>
      </div>

      {/* Waveform + controls row */}
      <div className="flex items-center gap-4">

        {/* Play / Pause / Stop */}
        <div className="flex items-center gap-2 shrink-0">
          {state === 'idle' && (
            <motion.button
              onClick={play}
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-midnight"
              style={{ background: 'linear-gradient(135deg, #f5c842, #f48fb1)', boxShadow: '0 0 18px rgba(245,200,66,0.5)' }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(245,200,66,0.8)' }}
              whileTap={{ scale: 0.95 }}
              title="Play"
            >
              ▶
            </motion.button>
          )}
          {state === 'playing' && (
            <>
              <motion.button
                onClick={pause}
                className="w-12 h-12 rounded-full flex items-center justify-center text-midnight font-bold"
                style={{ background: 'linear-gradient(135deg, #f5c842, #f48fb1)', boxShadow: '0 0 18px rgba(245,200,66,0.5)' }}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                title="Pause"
              >
                ⏸
              </motion.button>
              <motion.button
                onClick={stop}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                title="Stop"
              >
                ■
              </motion.button>
            </>
          )}
          {state === 'paused' && (
            <>
              <motion.button
                onClick={resume}
                className="w-12 h-12 rounded-full flex items-center justify-center text-midnight font-bold"
                style={{ background: 'linear-gradient(135deg, #f5c842, #f48fb1)', boxShadow: '0 0 18px rgba(245,200,66,0.5)' }}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                title="Resume"
              >
                ▶
              </motion.button>
              <motion.button
                onClick={stop}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                title="Stop"
              >
                ■
              </motion.button>
            </>
          )}
        </div>

        {/* Waveform bars */}
        <div className="flex items-end gap-[3px] h-8 flex-1">
          {barHeights.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full"
              style={{
                height: state === 'playing' ? undefined : `${h}px`,
                background: state === 'playing'
                  ? 'linear-gradient(to top, #f5c842, #f48fb1)'
                  : 'rgba(245,200,66,0.25)',
                minWidth: 3,
              }}
              animate={state === 'playing' ? {
                height: [`${h}px`, `${h * 2.2}px`, `${h}px`],
              } : { height: `${h}px` }}
              transition={state === 'playing' ? {
                duration: 0.5 + i * 0.07,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.06,
              } : { duration: 0.3 }}
            />
          ))}
        </div>

        {/* Status label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={state}
            className="font-lato text-xs shrink-0"
            style={{ color: 'rgba(255,255,255,0.4)', minWidth: 48, textAlign: 'right' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {state === 'playing' ? '🎙 Reading' : state === 'paused' ? '⏸ Paused' : ''}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      {state !== 'idle' && (
        <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, #f5c842, #f48fb1)' }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ ease: 'linear', duration: 0.2 }}
          />
        </div>
      )}

      {/* Voice + speed controls */}
      <div className="flex flex-wrap gap-3 mt-4 items-center">
        {voices.length > 1 && (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-soft-lavender/50 text-xs font-lato shrink-0">Voice</span>
            <select
              value={voice?.name ?? ''}
              onChange={e => setVoice(voices.find(v => v.name === e.target.value) ?? null)}
              className="flex-1 min-w-0 text-xs rounded-lg px-2 py-1.5 font-lato truncate"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8eaf6' }}
            >
              {voices.map(v => (
                <option key={v.name} value={v.name}>{v.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-soft-lavender/50 text-xs font-lato">Speed</span>
          <div className="flex gap-1">
            {[['🐢', 0.75], ['🚶', 0.88], ['🏃', 1.1]].map(([icon, val]) => (
              <motion.button
                key={String(val)}
                onClick={() => setRate(val as number)}
                className="w-7 h-7 rounded-lg text-sm flex items-center justify-center"
                style={{
                  background: rate === val ? 'rgba(245,200,66,0.25)' : 'rgba(255,255,255,0.05)',
                  border:     rate === val ? '1px solid rgba(245,200,66,0.6)' : '1px solid transparent',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
