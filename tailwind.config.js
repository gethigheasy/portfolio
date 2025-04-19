/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: 'rgba(0, 0, 0, 0.7)',
        accent: '#e53e3e',
        japanese: {
          red: '#e53e3e',
          black: '#1a1a1a',
          gold: '#d4af37',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'typewriter': 'typing 3.5s steps(40, end)',
        'blink': 'blink-caret .75s step-end infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#e53e3e' },
        },
      },
    },
  },
  plugins: [],
} 