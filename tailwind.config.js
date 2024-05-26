/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    darkMode: 'class',
    extend: {
      fontFamily:{
        'public':['Public Sans, sans-serif']
      }
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}
