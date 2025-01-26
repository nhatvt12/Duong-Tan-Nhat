/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: "#1B202A",
        themeForm : "#252B36",
        themeSection : "#2B3342",
        textTheme : "#717A8C"
      },
    },
  },
  plugins: [],
};
