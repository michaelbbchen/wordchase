/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Barlow"],
      },
      colors: {
        night: {
          DEFAULT: "#0f0f0f",
          100: "#030303",
          200: "#060606",
          300: "#090909",
          400: "#0c0c0c",
          500: "#0f0f0f",
          600: "#3f3f3f",
          700: "#6f6f6f",
          800: "#9f9f9f",
          900: "#cfcfcf",
        },
        sandy_brown: {
          DEFAULT: "#ee964b",
          100: "#391d05",
          200: "#723b0b",
          300: "#ab5810",
          400: "#e47615",
          500: "#ee964b",
          600: "#f1ab6d",
          700: "#f5c092",
          800: "#f8d5b6",
          900: "#fceadb",
        },
        columbia_blue: {
          DEFAULT: "#bcd2ee",
          100: "#112745",
          200: "#224f89",
          300: "#3576cc",
          400: "#79a5de",
          500: "#bcd2ee",
          600: "#cbdcf2",
          700: "#d8e5f5",
          800: "#e5edf8",
          900: "#f2f6fc",
        },
        dim_gray: {
          DEFAULT: "#716969",
          100: "#171515",
          200: "#2e2a2a",
          300: "#443f3f",
          400: "#5b5454",
          500: "#716969",
          600: "#8f8686",
          700: "#aba4a4",
          800: "#c7c3c3",
          900: "#e3e1e1",
        },
        snow: {
          DEFAULT: "#f7f3f3",
          100: "#3b2727",
          200: "#764e4e",
          300: "#a97d7d",
          400: "#d0b8b8",
          500: "#f7f3f3",
          600: "#f8f5f5",
          700: "#faf8f8",
          800: "#fcfafa",
          900: "#fdfdfd",
        },
      },
      animation: {
        typewriter: "typewriter 2s steps(11) forwards",
        caret:
          "typewriter 2s steps(11) forwards, blink 1s steps(11) infinite 2s",
      },
      keyframes: {
        typewriter: {
          to: {
            left: "100%",
          },
        },
        blink: {
          "0%": {
            opacity: "0",
          },
          "0.1%": {
            opacity: "1",
          },
          "50%": {
            opacity: "1",
          },
          "50.1%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
