/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0F172A', // Azul Oscuro (Logo)
          800: '#1E293B',
        },
        accent: {
          500: '#14B8A6', // Teal (Botones)
          600: '#0D9488', // Hover
          50:  '#F0FDFA', // Fondos suaves
        },
        status: {
          active: '#dcfce7', // Verde pastel
          activeText: '#166534',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
