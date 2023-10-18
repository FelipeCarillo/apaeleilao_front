/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul': '#2C4FBC',
        'vermelho': '#FA0303',
        'verde': '#5BFA03',
      },
      backgroundImage: {
        'rodape': "url('/img/imgRodape.png')",
      }
    }
  },
  plugins: [],
}

