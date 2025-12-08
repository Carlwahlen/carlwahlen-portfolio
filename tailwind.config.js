/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Open Sans', 'Arial', 'sans-serif'],
      },
      colors: {
        'lux-green': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
        },
        'dark-green': {
          DEFAULT: '#093D29',
          700: '#072820',
          600: '#093D29',
        },
        'icon-hover': {
          DEFAULT: '#037839',
        }
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['0.9375rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        'safe': 'env(safe-area-inset-bottom)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elevation': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
}
