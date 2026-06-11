import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#050714',
        'deep-indigo': '#0d0a2e',
        'cosmic-purple': '#1a0a3e',
        'moon-gold': '#f5c842',
        'silver-white': '#e8eaf6',
        'soft-lavender': '#b39ddb',
        'dreamy-blue': '#5c6bc0',
        'magical-pink': '#f48fb1',
        'parchment': '#f5e6c8',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
