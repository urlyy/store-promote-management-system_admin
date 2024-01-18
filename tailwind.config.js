/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary100: '#fdf6fd',
        primary200: '#B7B78A',
        primary300: '#658864',
        accent100: '#ecd79b',
        accent200: '#bc6c25',
        text100: '#78716c',
        text200: '#292524',
        bg100: '#EEEEEE',
        bg200: '#DDDDDD',
        bg300: '#d1d1d1',
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: true,
  },
  plugins: [

  ],
}


