const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      primary: ['Jost'],
      secondary: ['Dosis'],
    },
    extend: {
      colors: {
        primary: '#F36B50',
        secondary: '#B0FBBC',
        'dark-primary': '#ECF8FF',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          'scrollbar-width': 'none',

          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    }),
  ],
}
