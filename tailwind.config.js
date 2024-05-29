/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2997FF",
        primary: "#443368",
        accent: {
          blue: "#5A55CA",
          greenDark: "#2AA723",
          greenLight: "#59FF1F",
          grayDark: "#413C3C",
        },
        neutral: {
          100: "#FFFFFF",
          200: "#F0F1F5",
          300: "#D9D2D2",
          400: "#75759E",
          500: "#2A2727"
        },
        semantic: {
          green: "#2CC09C",
          purple: "#BBAFFE",
          redVerySoft: "#F6BDAC",
          blueSky: "#89E2FE",
          orangeVerySoft: "#F5B888",
        },
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
    },
  },
  plugins: [],
};

