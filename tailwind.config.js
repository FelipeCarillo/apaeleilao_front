/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rodape': "url('/img/imgRodape.png')",
      }
    }
  },
  plugins: [],
}

