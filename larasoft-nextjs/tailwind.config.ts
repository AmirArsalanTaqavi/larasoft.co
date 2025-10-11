import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- LaraSoft Custom Palette ---
        'text': '#e3f5f2',     // Primary Text Color
        'background': '#002924', // Main Dark Background
        'primary': '#00665e',  // Primary Accent Color
        'secondary': '#7b2a41', // Secondary Accent Color
        'accent': '#cedc00',   // Highlight Color
        // --- End Palette ---
      },
    },
  },
  // Ensure the typography plugin is installed and added here if you use 'prose'
  plugins: [
    // Ensure this plugin is installed: npm install @tailwindcss/typography
    require('@tailwindcss/typography'), 
  ],
}
export default config