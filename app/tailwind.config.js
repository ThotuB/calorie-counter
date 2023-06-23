/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", './app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'calories': '#37b97c',
        'carbs': '#f78f2f',
        'protein': '#3ca9e4',
        'fat': '#8078c7'
      }
    },
  },
}

