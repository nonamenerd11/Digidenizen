const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      gray: colors.gray,
      discord: "#7289da",
      green: colors.green,
      slate: colors.slate,
      white: colors.white,
      "discord-dark": "#39456d",
    },
  },
  plugins: [],
};
