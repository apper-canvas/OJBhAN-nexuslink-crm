/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // More vibrant indigo
          light: '#818cf8',
          dark: '#4338ca'
        },
        secondary: {
          DEFAULT: '#9333ea', // Rich purple
          light: '#c084fc',
          dark: '#7e22ce'
        },
        accent: '#f97316',
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0', 
          300: '#cbd5e1',
          400: '#94a3b8',  
          500: '#64748b',  
          600: '#475569',  
          700: '#334155',  
          800: '#1e293b',  
          900: '#0f172a'   // Darkest
        }      
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'modern': '0 10px 30px -15px rgba(0, 0, 0, 0.1)',
        'modern-dark': '0 10px 30px -15px rgba(0, 0, 0, 0.7)',
        'elegant': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
        'float': '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 15px 1px rgba(80, 70, 229, 0.4)',
        'glow-dark': '0 0 15px 1px rgba(129, 140, 248, 0.4)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      backdropBlur: {
        'xs': '2px',
        'md': '6px',
        'xl': '12px'
      }
    }  
  },
  plugins: [],
  darkMode: 'class',
}