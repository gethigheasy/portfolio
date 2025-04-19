/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: 'rgba(45, 45, 45, 0.8)',
        accent: '#ff6b6b',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 