/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Jenn Earthtones core palette
        cream: {
          DEFAULT: '#F7F1E7',
          dark: '#EFE6D6',
        },
        clay: {
          DEFAULT: '#B14E33', // burnt terracotta
          light: '#D97A54',
          dark: '#8A3A25',
        },
        ochre: {
          DEFAULT: '#E0A339', // warm yellow
          light: '#EFC876',
        },
        olive: {
          DEFAULT: '#707A46', // sage/olive
          light: '#94A066',
          dark: '#4E5631',
        },
        rust: {
          DEFAULT: '#9A3B30', // muted red
        },
        ink: {
          DEFAULT: '#332821', // deep brown, near-black replacement
          light: '#5B4A3E',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Archivo"', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      borderRadius: {
        art: '2px',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        reveal: 'reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pop: 'pop 0.4s ease-out',
      },
    },
  },
  plugins: [],
}