'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomePage from '@/components/WelcomePage';
import StoryForm from '@/components/form/StoryForm';
import LoadingScreen from '@/components/loading/LoadingScreen';
import StoryReader from '@/components/story/StoryReader';
import { generateStory, StoryParams } from '@/lib/openrouter';

type AppState = 'welcome' | 'form' | 'loading' | 'story';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3 } },
};

export default function Home() {
  const [appState, setAppState]       = useState<AppState>('welcome');
  const [story, setStory]             = useState('');
  const [imagePrompts, setImagePrompts] = useState<string[]>([]);
  const [params, setParams]           = useState<StoryParams | null>(null);
  const [genError, setGenError]       = useState('');

  const handleGenerate = async (p: StoryParams) => {
    setParams(p);
    setAppState('loading');
    setGenError('');
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
        || localStorage.getItem('dreamtales_api_key')
        || '';
      const result = await generateStory(p, apiKey);
      setStory(result.story);
      setImagePrompts(result.imagePrompts);
      setAppState('story');
    } catch (e) {
      console.error(e);
      setGenError('Something went wrong. Please check your API key and try again.');
      setAppState('form');
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {appState === 'welcome' && (
        <motion.div key="welcome" {...pageVariants}>
          <WelcomePage onStart={() => setAppState('form')} />
        </motion.div>
      )}

      {appState === 'form' && (
        <motion.div key="form" {...pageVariants}>
          <StoryForm onSubmit={handleGenerate} initialError={genError} />
        </motion.div>
      )}

      {appState === 'loading' && (
        <motion.div key="loading" {...pageVariants}>
          <LoadingScreen childName={params?.childName} theme={params?.theme} />
        </motion.div>
      )}

      {appState === 'story' && params && (
        <motion.div key="story" {...pageVariants}>
          <StoryReader
            story={story}
            imagePrompts={imagePrompts}
            params={params}
            onNewStory={() => setAppState('form')}
            onRegenerate={() => handleGenerate(params)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
