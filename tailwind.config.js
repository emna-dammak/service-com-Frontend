/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        public: ["Public Sans, sans-serif"],
      },
      backgroundImage: {
        "gradient-bg": "linear-gradient(90deg, #99CA3D 0%, #02BDE6 100%)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
