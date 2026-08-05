import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#1a1a1a'
        },
        paper: {
          DEFAULT: '#ffffff',
          off: '#f7f6f3'
        },
        gold: {
          DEFAULT: '#c9a24b',
          light: '#e2c689',
          dark: '#9c7c33'
        }
      },
      fontFamily: {
        display: ['var(--font-display-en, var(--font-display-bn, serif))', 'serif'],
        body: ['var(--font-body-en, var(--font-body-bn, sans-serif))', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.28em'
      }
    }
  },
  plugins: []
};

export default config;
