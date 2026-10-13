/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spark: {
          navy: '#0B192C',
          'navy-dark': '#06101E',
          'navy-light': '#1E293B',
          teal: '#0D9488',
          'teal-dark': '#0F766E',
          'teal-light': '#14B8A6',
          cyan: '#06B6D4',
          'cyan-electric': '#22D3EE',
          'cyan-bright': '#67E8F9',
          ice: '#F0F9FF',
          'ice-light': '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          'border-subtle': '#EEF2F6',
          slate: '#64748B',
        },
        health: {
          navy: '#0B192C',
          slate: '#1E293B',
          teal: '#0D9488',
          'teal-light': '#F0FDFA',
          'teal-dark': '#0F766E',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        status: {
          normal: {
            text: '#047857',
            bg: '#ECFDF5',
            border: '#A7F3D0',
            badge: '#10B981'
          },
          above: {
            text: '#B45309',
            bg: '#FFFBEB',
            border: '#FDE68A',
            badge: '#F59E0B'
          },
          below: {
            text: '#1D4ED8',
            bg: '#EFF6FF',
            border: '#BFDBFE',
            badge: '#3B82F6'
          },
          verify: {
            text: '#6D28D9',
            bg: '#F5F3FF',
            border: '#DDD6FE',
            badge: '#8B5CF6'
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(11, 25, 44, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 16px 48px -8px rgba(11, 25, 44, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        'spark-glow': '0 0 24px -2px rgba(6, 182, 212, 0.35)',
        'teal-glow': '0 0 24px -2px rgba(13, 148, 136, 0.35)',
        '3d-card': '0 20px 40px -15px rgba(15, 23, 42, 0.12), 0 0 1px 1px rgba(255, 255, 255, 0.8) inset',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
