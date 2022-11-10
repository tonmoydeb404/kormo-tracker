/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },

        center: true,
      },
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          info: "#facc15",
          success: "#16a34a",
          "base-content": "#fafafa",
        },
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          info: "#facc15",
          success: "#16a34a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
