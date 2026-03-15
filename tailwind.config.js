/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '380px',   // small phones (iPhone SE etc.)
      'sm': '640px',   // large phones / small tablets
      'md': '768px',   // tablets
      'lg': '1024px',  // small laptops
      'xl': '1280px',  // desktops
      '2xl': '1536px', // large desktops
    },
    extend: {
      colors: {
        cream: {
          50:  '#FDFBF7',
          100: '#FAF7F0',
          200: '#F5F0E4',
          300: '#EDE5D0',
        },
        bark: {
          200: '#D9CEBC',
          300: '#C8B99A',
          400: '#B5A48A',
          500: '#9A8B6F',
          600: '#7D7057',
          700: '#5C5240',
          800: '#3D3628',
          900: '#1E1B13',
        },
        sage: {
          300: '#B8C9B0',
          400: '#9BB590',
          500: '#7D9E72',
          600: '#618059',
        },
        obsidian: '#0F0E0B',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-dm-mono)', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra-wide': '0.35em',
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease forwards',
        'fade-in':  'fadeIn 0.5s ease forwards',
        'marquee':  'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      // Utility to hide scrollbar (for horizontal scroll strips)
      scrollbarWidth: {
        none: 'none',
      },
    },
  },
  plugins: [
    // Adds no-scrollbar utility class
    function({ addUtilities }: any) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      })
    },
  ],
}
