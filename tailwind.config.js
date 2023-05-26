/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue-dark':'#3e436d',
        'white':'#FFFFFF',
        'gray':'#D9D9D9',
        'black':'#000000',
        'blue':'#61C6FF',
        'gray-dark':'#5b5b5b',
        'blue-thin':'#4893E6',
        'green-succss':'#44C4A1',
        'red-failed': '#E24C4B'
      }
    },
  },
  plugins: [],
}