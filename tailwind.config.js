/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        fullvh: "100vh",
      },
      colors: {
        "dark-blue": "#11175D",
        "custom-black": "#000000",
        "btn-color": "#5F35F5",
      },
    },
    fontFamily: {
      Nunito: ["Nunito", "sans-serif"],
      sansSerif: ["Open Sans", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }), // default: 'standard'
  ],
};
