/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C72FF",
        primary_transparent: "rgba(255, 187, 92, 0.8)",

        secondary: "#080F25",
        secondary_transparent: "rgba(33, 51, 99, 0.7)",

        tertiary: "#53B8F4",
        tertiary_transparent: "rgba(124, 173, 247, 0.8)",

        chat_text: "#49A0A7",
        chat_border: "#2a4e7d",
        // chat_border_light:,
        // chat_bg_dark:
        // "bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C]",
        // chat_background_light:,
        // chat_text_dark: "#49A0A7",
        // chat_text_light:,

        border: "#101935",
        green: "#159464",
        red: "#C94A59",
        yellow: "#a88d2b",

        dark_box: "#101935",
        oc_white: "rgba(255,255,255,0.2)",
      },
    },
  },
  plugins: [],
};
