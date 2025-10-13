/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",  // optional custom color
        secondary: "#6366f1",
      },
      borderRadius: {
        DEFAULT: "0.5rem", // optional radius
      },
    },
  },
  plugins: [],
}
