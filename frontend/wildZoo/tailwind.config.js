/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{html,ts}",
    "./src/components/home-components/**/*.{html,ts}",
  ],
  
  theme: {
    extend: {
      perspective: {
        '3000': '3000px',
      },
      colors: {
        primary: "#fdd340",
        greenColor: "#003629",
        text: "#333",
        primarySub: "#eeda91"
      },
      backgroundImage: {
        'header': "url('../src/assets/img/bg-home-top.jpg')",
      },
      transitionProperty: {
        'opacity': 'opacity'
      },
      transitionDuration: {
        '700': '700ms',
        '1000': '1000ms'
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


