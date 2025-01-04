/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "boxShadow": "0px 5px 30px rgba(0, 0, 0, 0.35)"
      },

      fontFamily: {
        "Inter": ["Inter", "serif"],
      },

      screens: {
        "lg": "1025px"
      }
    },
  },
  plugins: [],
}

