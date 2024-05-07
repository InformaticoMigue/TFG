/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{html,ts}",
    "./src/components/home-components/**/*.{html,ts}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: "#fdd340",
        text: "#333",
        primarySub: "#eeda91"
      },
      backgroundImage: {
        'header': "url('../src/assets/img/bg-home-top.jpg')",
      }
    },
    screens: {
      'xs': '480px',
      'normal': '769px',
      'portatil': '1025px',
    }
  },
  plugins: [],
}


