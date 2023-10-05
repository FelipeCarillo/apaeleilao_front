/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul': '#2C4FBC',
      },
      backgroundImage: {
        'rodape': "url('/img/imgRodape.png')",
      }
    }
  },
  plugins: [],
}

