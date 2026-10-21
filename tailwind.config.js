/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080B11",
        surface: "#0E131F",
        surfaceLight: "#141B2D",
        surfaceBorder: "#1E273D",
        surfaceBorderHover: "#334155",
        fire: {
          DEFAULT: "#E6392F",
          50: "#FFF1F0",
          100: "#FFE1DF",
          500: "#E6392F",
          600: "#D32F2F",
          700: "#B71C1C",
          glow: "rgba(230, 57, 47, 0.4)",
        },
        safety: {
          green: "#10B981",
          amber: "#F59E0B",
          cyan: "#06B6D4"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(230, 57, 47, 0.15) 0%, transparent 70%)',
        'subtle-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
