/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-violet-500": "#7c3aed",
        "main-violet-100": "#b088f4",
        "main-violet-900": "#1e1136",
        "main-violet-700": "#3e138f",
        "main-black-900":"rgba(5,5,5,1)",
        "main-black-800":"rgba(18,18,18,1)",
      },

    }
  }
}
