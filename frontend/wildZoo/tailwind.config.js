/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fdd340",
        text: "#333",
        primarySub: "#eeda91"
      }
    },
    screens: {
      'xs': '480px',
      'normal': '769px'
    }
  },
  plugins: [],
}


