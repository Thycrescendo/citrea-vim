import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'gray-900': '#1a202c', // Dark background
        'teal-500': '#2dd4bf', // Primary action color
        'teal-300': '#5eead4', // Lighter teal for text
        'green-900': '#1a2a2a', // Dark green for collections
        'green-300': '#6ee7b7', // Light green for collections text
        'purple-900': '#2d1b4e', // Dark purple for top sellers
        'purple-300': '#a78bfa', // Light purple for top sellers text
        'gray-800': '#2d3748', // Sidebar and card background
        'gray-700': '#4a5568', // Hover and border shade
        'gray-600': '#718096', // Lighter hover shade
      },
      textColor: {
        'teal-300': '#5eead4', // Portfolio text
        'green-300': '#6ee7b7', // Collections text
        'purple-300': '#a78bfa', // Top sellers text
        'gray-300': '#a0aec0', // General light text
      },
      borderColor: {
        'teal-700': '#0f766e', // Teal border
        'green-700': '#047857', // Green border
        'purple-700': '#6b21a8', // Purple border
        'gray-700': '#4a5568', // General border
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slide-right': {
          'from': { transform: 'translateX(-10px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'bounce': {
          'from, 20%, 53%, 80%, to': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-10px)' },
          '70%': { transform: 'translateY(-5px)' },
          '90%': { transform: 'translateY(-2px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'slide-right': 'slide-right 0.5s ease-out forwards',
        'bounce': 'bounce 1.5s infinite',
      },
    },
  },
  plugins: [],
};

export default config;