/** @type {import('tailwindcss').Config} */
const { join } = require('path');

export default {
  content: [
    join(__dirname, "index.html"),
    join(__dirname, "public/index.html"),
    join(__dirname, "src/**/*.js"),
    join(__dirname, "src/**/*.ts"),
    join(__dirname, "src/**/*.jsx"),
    join(__dirname, "src/**/*.tsx"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

