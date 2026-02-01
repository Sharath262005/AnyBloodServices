/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          primary: '#C62828',
          dark: '#8E0000',
          light: '#FF5F52'
        },
        neutral: {
          text: '#333333',
          bg: '#FFFFFF',
          section: '#F5F5F5',
          border: '#E0E0E0'
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}