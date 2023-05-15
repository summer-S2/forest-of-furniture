/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      // 메인색, 강조색
      colors: {
        main: "#94AF9F",
        accent: "#FF8787",
      },

      // 홈화면 배너
      backgroundImage: {
        banner: `url('../public/images/home_banner.jpg')`,
      },

      // 컴포넌트 애니메이션
      keyframes: {
        mount: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        unmount: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        mount: "mount 1s ease-in-out",
        unmount: "unmount 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
