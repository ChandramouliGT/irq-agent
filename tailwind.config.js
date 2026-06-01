/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: "#1A0533",
        card: "#240A45",
        violet: "#7C3AED",
        infosec: "#2563EB",
        bro: "#059669",
        muted: "#C4B5FD",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
}