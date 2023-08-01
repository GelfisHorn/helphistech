/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: '400px'
      },
      colors: {
        // Light mode
        "light-main": "rgb(99 102 241)",
        "light-description": "rgb(64 64 64)",
        "light-subtitle": "rgb(120 120 120)",
        // Dark mode
        "dark-main": "rgb(76 78 149)",
        "dark-text": "rgb(225 225 225)",
        "darkmode": "rgb(5,5,5)",
        // New design
        "primary": "#866bfe",
        "primary-2": "#5a43be",
        "secondary": "#f7e654",
        "tertiary": "#00ADB5",
      },
      backgroundImage: {
        'hero-light': "url('/home/hero/wave/light/wave.webp')",
        'hero-dark': "url('/home/hero/wave/dark/wave.webp')",
        'introduction-dark': "url('/home/waves-variant.svg')",
        'introduction-light': "url('/home/waves-light.svg')"
      },
      height: {
        'sidebar-xs': 'calc(100vh - 3.5rem)',
        'sidebar': 'calc(100vh - 7rem)'
      },
      width: {
        modal: "min(90%, 700px)"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}