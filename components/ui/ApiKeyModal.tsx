'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: (key: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [key, setKey] = useState('');

  const handleSave = () => {
    if (key.trim()) {
      localStorage.setItem('dreamtales_api_key', key.trim());
      onClose(key.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md glass-dark rounded-2xl p-8"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl" style={{
              background: 'radial-gradient(ellipse at top, rgba(245,200,66,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔑</div>
              <h2 className="font-cinzel text-2xl text-moon-gold mb-2">OpenRouter API Key</h2>
              <p className="text-soft-lavender text-sm">
                To generate magical stories, you need a free OpenRouter API key.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-soft-lavender text-sm mb-2">
                  Your API Key
                </label>
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder="sk-or-..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-soft-lavender/30 text-white placeholder-white/30 focus:outline-none focus:border-moon-gold/60 focus:ring-1 focus:ring-moon-gold/40 transition-all"
                />
              </div>

              <div className="text-center">
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dreamy-blue hover:text-soft-lavender text-sm underline transition-colors"
                >
                  Get a free API key at openrouter.ai →
                </a>
              </div>

              <motion.button
                onClick={handleSave}
                disabled={!key.trim()}
                className="w-full py-3 px-6 rounded-xl font-cinzel font-semibold text-midnight disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{
                  background: 'linear-gradient(135deg, #f5c842, #f48fb1)',
                  boxShadow: key.trim() ? '0 0 20px rgba(245,200,66,0.4)' : 'none',
                }}
                whileHover={key.trim() ? { scale: 1.03, boxShadow: '0 0 30px rgba(245,200,66,0.6)' } : {}}
                whileTap={key.trim() ? { scale: 0.97 } : {}}
              >
                ✨ Save & Continue ✨
              </motion.button>
            </div>

            <p className="text-white/30 text-xs text-center mt-4">
              Your key is stored locally in your browser and never sent to our servers.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
