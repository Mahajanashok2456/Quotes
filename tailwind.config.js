/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'lora': ['Lora', 'serif'],
      },
      colors: {
        dark: {
          primary: '#0f172a',
          secondary: '#1e293b',
          accent: '#334155',
        }
      }
    },
  },
  plugins: [],
}