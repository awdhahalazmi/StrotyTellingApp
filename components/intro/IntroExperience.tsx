'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import NightSky from './NightSky';
import PixieDust from './PixieDust';
import StarPortal from './StarPortal';
import DreamWorld from './DreamWorld';
import StorybookReveal from './StorybookReveal';

interface IntroExperienceProps {
  onBegin: () => void;
}

type SceneId = 1 | 2 | 3 | 4 | 5;

const SCENE_DURATIONS: Record<SceneId, number> = {
  1: 3000,
  2: 4000,
  3: 3000,
  4: 4000,
  5: 0, // stays until user clicks
};

export default function IntroExperience({ onBegin }: IntroExperienceProps) {
  const [scene, setScene] = useState<SceneId>(1);

  useEffect(() => {
    const duration = SCENE_DURATIONS[scene];
    if (duration === 0) return; // Scene 5 — wait for user

    const timer = setTimeout(() => {
      setScene((prev) => Math.min(prev + 1, 5) as SceneId);
    }, duration);

    return () => clearTimeout(timer);
  }, [scene]);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#050714' }}>
      <AnimatePresence mode="wait">
        {scene === 1 && <NightSky key="scene-1" />}
        {scene === 2 && (
          <div key="scene-2" className="absolute inset-0">
            <NightSky />
            <PixieDust />
          </div>
        )}
        {scene === 3 && <StarPortal key="scene-3" />}
        {scene === 4 && <DreamWorld key="scene-4" />}
        {scene === 5 && <StorybookReveal key="scene-5" onBegin={onBegin} />}
      </AnimatePresence>

      {/* Scene progress dots */}
      {scene < 5 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {([1, 2, 3, 4] as SceneId[]).map((s) => (
            <div
              key={s}
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                background: s <= scene ? 'rgba(245,200,66,0.9)' : 'rgba(255,255,255,0.2)',
                transform: s === scene ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Skip button for all scenes except 5 */}
      {scene < 5 && (
        <button
          onClick={() => setScene(5)}
          className="absolute top-4 right-4 z-50 text-white/40 hover:text-white/70 text-xs font-lato tracking-widest uppercase transition-colors"
        >
          Skip intro →
        </button>
      )}
    </div>
  );
}
