'use client';

import { motion } from 'framer-motion';
import NightSky from './NightSky';
import PixieDust from './PixieDust';

interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <NightSky />
      <PixieDust />

      {/* Forest silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 180"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '180px' }}
        >
          {/* Back layer trees - slightly lighter */}
          <g fill="#050510" opacity="0.7">
            <polygon points="60,180 80,100 100,180" />
            <polygon points="110,180 135,80 160,180" />
            <polygon points="150,180 175,105 200,180" />
            <polygon points="260,180 290,70 320,180" />
            <polygon points="350,180 375,90 400,180" />
            <polygon points="450,180 475,85 500,180" />
            <polygon points="560,180 590,60 620,180" />
            <polygon points="660,180 690,95 720,180" />
            <polygon points="780,180 810,75 840,180" />
            <polygon points="880,180 910,88 940,180" />
            <polygon points="1000,180 1030,65 1060,180" />
            <polygon points="1100,180 1130,90 1160,180" />
            <polygon points="1220,180 1250,80 1280,180" />
            <polygon points="1340,180 1365,100 1390,180" />
          </g>
          {/* Front layer trees - dark */}
          <g fill="#0a0a1a">
            <polygon points="0,180 25,120 50,180" />
            <polygon points="40,180 70,85 100,180" />
            <polygon points="90,180 120,95 150,180" />
            <polygon points="140,180 170,110 200,180" />
            <polygon points="200,180 235,75 270,180" />
            <polygon points="270,180 300,90 330,180" />
            <polygon points="320,180 355,65 390,180" />
            <polygon points="390,180 420,85 450,180" />
            <polygon points="440,180 475,100 510,180" />
            <polygon points="510,180 545,70 580,180" />
            <polygon points="570,180 605,55 640,180" />
            <polygon points="640,180 675,80 710,180" />
            <polygon points="710,180 745,95 780,180" />
            <polygon points="780,180 815,60 850,180" />
            <polygon points="850,180 880,90 910,180" />
            <polygon points="910,180 945,75 980,180" />
            <polygon points="980,180 1015,55 1050,180" />
            <polygon points="1050,180 1080,85 1110,180" />
            <polygon points="1110,180 1145,70 1180,180" />
            <polygon points="1180,180 1215,95 1250,180" />
            <polygon points="1250,180 1280,65 1310,180" />
            <polygon points="1310,180 1345,85 1380,180" />
            <polygon points="1370,180 1400,100 1440,180" />
            <rect x="0" y="160" width="1440" height="20" />
          </g>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          className="text-sm tracking-widest mb-6 font-semibold"
          style={{ color: '#FFD700', fontVariant: 'small-caps' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ✨ A Magical Bedtime Experience ✨
        </motion.p>

        <motion.h1
          className="font-serif mb-6"
          style={{
            fontSize: 'clamp(64px, 12vw, 110px)',
            lineHeight: 1.0,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFF8DC 40%, #FFD700 70%, #FFF0A0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          DreamTales
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-4"
          style={{ color: '#b8a9e0' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Every child deserves a magical story.
        </motion.p>

        <motion.p
          className="text-base mb-10"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Personalized AI bedtime stories crafted just for your little one
        </motion.p>

        <motion.button
          onClick={onStart}
          className="glow-gold relative px-12 py-5 rounded-full font-bold text-xl cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#0a0a1a',
            border: 'none',
            fontSize: '1.2rem',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{
            scale: 1.08,
            boxShadow: '0 0 50px rgba(255, 215, 0, 0.9), 0 0 100px rgba(255, 215, 0, 0.5)',
          }}
          whileTap={{ scale: 0.96 }}
        >
          ✨ Start Story ✨
        </motion.button>

        <motion.p
          className="mt-6 text-sm"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Free · No signup required · Pure magic
        </motion.p>
      </div>
    </div>
  );
}
