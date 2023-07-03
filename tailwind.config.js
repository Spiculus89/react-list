/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./index.html",
    ],
    theme: {
      extend: {
        fontFamily: {
            sourceCodePro: ["Source Code Pro", ...defaultTheme.fontFamily.sans]
        }
      },
    },
    plugins: [],
  }