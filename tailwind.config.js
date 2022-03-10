const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['Jost'],
      secondary: ['Cabin'],
    },
    extend: {
      colors: {
        primary: '#F36B50',
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
