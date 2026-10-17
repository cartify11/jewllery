/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#111111',
          charcoal: '#1C1C1C',
          ivory: '#FAF7F0',
          gold: '#C6A15B',
          'gold-light': '#D8B878',
          'gold-dark': '#9E7B3B',
          'gold-soft': '#F4EEDA',
          beige: '#E9DFD0',
          'beige-light': '#F5EFE6',
          white: '#FFFFFF',
          grey: '#777777',
          'grey-light': '#E8E8E8',
          'grey-dark': '#2E2E2E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.18em',
        'super-luxury': '0.28em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(17, 17, 17, 0.07)',
        'luxury-hover': '0 25px 50px -12px rgba(198, 161, 91, 0.15)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
