/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: {
        200: "#444448",
        800: "#1E1F22",
      },
      gray: { 200: "#7F8388" },
      white: "#FFFFFF",
    },
  },

  plugins: [require("daisyui")],
};
