/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      width:{
        '100':'425px'
      },
      borderWidth: {
        '3': '3px',
      },
      colors: {
        'image-border-pink': '#ec4899',
      },
      screens: {
        'xs': '320px',
        'xxs': '425px',
      }
    },
  },
  plugins: [
  ],
}

