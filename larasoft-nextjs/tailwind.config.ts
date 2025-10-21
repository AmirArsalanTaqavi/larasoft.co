// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // This maps your CSS variables from layout.tsx to Tailwind v4 classes
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          '500': 'var(--color-primary)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          '500': 'var(--color-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          '500': 'var(--color-accent)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          '500': 'var(--color-text)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          '500': 'var(--color-background)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          '500': 'var(--color-surface)',
        },
      },
      fontFamily: {
        'vazirmatn': ['Vazirmatn', 'sans-serif'],
        'larasoft': ['LaraSoft', 'sans-serif'], // Your custom Delnia font
      }
    },
  },
  plugins: [],
};
export default config;