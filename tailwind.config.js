/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(25px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
        slideUpSlow: "slideUp 1.1s ease-out forwards",
        slideUpSlower: "slideUp 1.4s ease-out forwards",
        slideUpSlowest: "slideUp 1.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
