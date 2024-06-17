/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFBB5C",
        primary_transparent: "rgba(255, 187, 92, 0.8)",

        secondary: "#213363",
        secondary_transparent: "rgba(33, 51, 99, 0.8)",

        tertiary: "#7cadf7",
        tertiary_transparent: "rgba(124, 173, 247, 0.8)",
      },
    },
  },
  plugins: [],
};
