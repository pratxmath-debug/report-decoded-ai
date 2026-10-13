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
          navy: '#124E4A', // Upgraded to Deep Forest Teal
          'navy-dark': '#0B3330',
          'navy-light': '#1E3A37',
          forest: '#124E4A',
          teal: '#287F78',
          'teal-dark': '#1B5B56',
          'teal-light': '#3D9B93',
          sage: '#A8C8BA',
          'sage-light': '#D4E5DE',
          mint: '#E5F3ED',
          ivory: '#FAF9F5',
          graphite: '#253532',
          slate: '#667773',
          ice: '#F4FAF7',
          'ice-light': '#FAF9F5',
          surface: '#FFFFFF',
          border: '#DCE7E3',
          'border-subtle': '#EAF2EE',
        },
        clinical: {
          forest: '#124E4A',
          teal: '#287F78',
          'teal-dark': '#1B5B56',
          'teal-light': '#3D9B93',
          sage: '#A8C8BA',
          'sage-light': '#D4E5DE',
          mint: '#E5F3ED',
          ivory: '#FAF9F5',
          white: '#FFFFFF',
          graphite: '#253532',
          slate: '#667773',
          border: '#DCE7E3',
        },
        health: {
          navy: '#124E4A',
          slate: '#253532',
          teal: '#287F78',
          'teal-light': '#E5F3ED',
          'teal-dark': '#124E4A',
          surface: '#FAF9F5',
          card: '#FFFFFF',
          border: '#DCE7E3',
        },
        status: {
          normal: {
            text: '#124E4A',
            bg: '#E5F3ED',
            border: '#A8C8BA',
            badge: '#287F78'
          },
          above: {
            text: '#B45309',
            bg: '#FEF3C7',
            border: '#FCD34D',
            badge: '#D97706'
          },
          below: {
            text: '#1E40AF',
            bg: '#EFF6FF',
            border: '#BFDBFE',
            badge: '#2563EB'
          },
          verify: {
            text: '#92400E',
            bg: '#FEF3C7',
            border: '#FDE68A',
            badge: '#D97706'
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(18, 78, 74, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'glass-hover': '0 16px 48px -8px rgba(18, 78, 74, 0.10), 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        'spark-glow': '0 0 24px -2px rgba(40, 127, 120, 0.30)',
        'teal-glow': '0 0 24px -2px rgba(18, 78, 74, 0.30)',
        'sage-glow': '0 0 20px -2px rgba(168, 200, 186, 0.40)',
        '3d-card': '0 20px 40px -15px rgba(18, 78, 74, 0.08), 0 0 1px 1px rgba(255, 255, 255, 0.9) inset',
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
