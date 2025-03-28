/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure all relevant files are included
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0f0f0f',
        'bg-darker': '#0a0a0a',
        'bg-light': '#141414',
        'bg-lighter': '#1c1c1c',
        'accent': '#3a45e8', // Standardized primary accent color (blue)
        'accent-light': '#646cff', // Lighter variation
        'accent-dark': '#1a237e', // Darker variation
        'accent-deep': '#0d1b5e', // Very deep blue
        'text-primary': '#f2f2f2',
        'text-secondary': '#a0a0a0',
        'text-tertiary': '#666666',
        'border': '#2a2a2a',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'glitch': 'glitch 3s infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'glitch': {
          '0%, 5%': { transform: 'none' },
          '1%': { transform: 'skew(30deg)' },
          '2%': { transform: 'skew(-30deg)' },
          '3%': { transform: 'skew(15deg)' },
          '4%': { transform: 'skew(-5deg)' },
        },
      },
      fontFamily: {
        'sans': ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      transitionProperty: {
        'border': 'border-color, border-width',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
