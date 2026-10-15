/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Be Vietnam Pro"', 'sans-serif'],
      },
      colors: {
        crimson: {
          50: '#FDF2F2',
          100: '#FCE6E6',
          200: '#F8C8C8',
          300: '#F09999',
          400: '#DE5757',
          500: '#C92A2A',
          600: '#B21E1E',
          700: '#9E1B1B',
          800: '#8B0000',
          900: '#6E0808',
          deep: '#4E0505',
        },
        ussh: {
          crimson: '#8B0000',
          crimsonHover: '#740000',
          crimsonActive: '#5E0000',
          crimsonLight: '#FDF2F2',
          cream: '#F5F0E6',
          ivory: '#FDFBF7',
          sand: '#E2D9CC',
          sandLight: '#EDE6DC',
          charcoal: '#222222',
          muted: '#635E58',
        },
      },
      boxShadow: {
        'card': '0 2px 10px -1px rgba(0, 0, 0, 0.04), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 8px 24px -3px rgba(139, 0, 0, 0.08), 0 3px 8px -2px rgba(0, 0, 0, 0.04)',
        'crimson-glow': '0 4px 20px -2px rgba(139, 0, 0, 0.25)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};
