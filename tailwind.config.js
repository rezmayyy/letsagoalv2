/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your custom brand colors
        brand: {
          50: '#eef2ff',    // Very light indigo
          100: '#e0e7ff',   // Light indigo
          200: '#c7d2fe',   // Lighter indigo
          300: '#a5b4fc',   // Light indigo
          400: '#818cf8',   // Medium indigo
          500: '#6366f1',   // Indigo
          600: '#4f46e5',   // Your current primary
          700: '#4338ca',   // Dark indigo
          800: '#3730a3',   // Darker indigo
          900: '#312e81',   // Very dark indigo
        },
        // Alternative color schemes you might want to try:
        // Green theme
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
        },
        // Blue theme
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        // Purple theme
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
        },
      },
    },
  },
  plugins: [],
} 