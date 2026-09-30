import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rs-black': '#0a0a0a',
        'rs-charcoal': '#111111',
        'rs-surface': '#1a1a1a',
        'rs-border': '#2a2a2a',
        'rs-muted': '#888888',
        'rs-dim': '#555555',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
