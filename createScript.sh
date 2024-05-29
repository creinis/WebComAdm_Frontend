#bin/bash

#! comand line para criar o projeto react usando vite no diretorio atual
#! troque o ./ pelo nome do projeto caso não tenha criado um diretorio vazio no inicio desta acao
npm create vite@latest ./ -- --template react

#! Framework Tailwind install e configure
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

#! G-sap animation
npm install gsap @gsap/react

#! Split type / text animations
npm i split-type

#! Sentry
npm install --save @sentry/react
npx @sentry/wizard@latest -i sourcemaps

#! tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F35C56",
        accent: {
          blue: "#2E2B5E",
          greenDark: "#2AA723",
          greenLight: "#59FF1F",
        },
        neutral: {
          100: "#FFFFFF",
          200: "#F0F1F5",
          300: "#C8C8D3",
          400: "#75759E",
        },
        semantic: {
          yellow: "#F7D96F",
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

