const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'dracula'],
  },
}

module.exports = config
