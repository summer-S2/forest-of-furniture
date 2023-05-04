/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        main: "#94AF9F",
        accent: "#FF8787",
      },
      backgroundImage: {
        banner: `url('../public/images/home_banner.jpg')`,
      },
    },
  },
  plugins: [],
};
