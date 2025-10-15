// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Tailwind safelist: ensure common layout & typography utilities are generated
  // @ts-ignore - runtime supports safelist though TS types may be strict in this project
  safelist: [
    // keep previous named semantic classes
    'bg-background', 'bg-background/80', 'bg-background/90', 'bg-surface', 'bg-primary', 'bg-accent',
    'text-text', 'text-text/80', 'text-primary', 'text-accent',
    'border-primary', 'border-text', 'border-accent', 'border-background',
    'hover:bg-primary', 'hover:bg-accent', 'hover:border-accent',
    // broad patterns to cover responsive/layout utilities used across the app
    { pattern: /^text-/, variants: ['sm', 'md', 'lg', 'xl', 'hover'] },
    { pattern: /^h-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^w-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^max-w-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^(p|px|py|pt|pr|pb|pl)-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^(m|mx|my|mt|mr|mb|ml)-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^grid/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^gap-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^rounded-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^shadow-/, variants: ['sm', 'md', 'lg', 'hover'] },
    { pattern: /^flex|justify-|items-/, variants: ['sm', 'md', 'lg'] },
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
      },
      fontFamily: {
        // Tell Tailwind's default 'sans' font to use our Vazirmatn variable
        sans: ['var(--font-vazirmatn)', 'sans-serif'],
      },
    },
  },
  plugins: [],
  
};
export default config;