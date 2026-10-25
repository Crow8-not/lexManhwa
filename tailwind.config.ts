import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1120',
        canvas: '#111827',
        surface: '#172033',
        elevated: '#202c43',
        line: '#334155',
        primary: {
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        accent: {
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
        },
        success: '#4ade80',
        warning: '#fbbf24',
        danger: '#fb7185',
        info: '#67e8f9',
      },
      boxShadow: {
        card: '0 12px 30px rgba(2, 6, 23, 0.24)',
        glow: '0 0 0 1px rgba(129, 140, 248, 0.18), 0 12px 32px rgba(79, 70, 229, 0.16)',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
} satisfies Config
