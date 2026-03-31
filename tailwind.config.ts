import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        sand: {
          50: '#fdf8f0',
          100: '#f9ecd8',
          200: '#f2d5a8',
          300: '#e8b96e',
          400: '#dc9a3d',
          500: '#c97d1e',
          600: '#a86118',
          700: '#864918',
          800: '#6e3c1a',
          900: '#5c3319',
        },
        aral: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe0fc',
          300: '#93ccfb',
          400: '#60aef6',
          500: '#3b8ef1',
          600: '#2570e5',
          700: '#1d5ad2',
          800: '#1e49aa',
          900: '#1e4086',
        },
        steppe: {
          50: '#f7f8f0',
          100: '#edefd9',
          200: '#d8dcb0',
          300: '#bec47f',
          400: '#a5ae55',
          500: '#889439',
          600: '#6a742c',
          700: '#525a25',
          800: '#434923',
          900: '#393e21',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'sand-drift': 'sandDrift 20s linear infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        sandDrift: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleX(1) scaleY(1)' },
          '50%': { transform: 'scaleX(1.05) scaleY(0.95)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
