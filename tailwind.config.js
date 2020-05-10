module.exports = {
  purge: ["./src/app/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",

        black: "#000",
        white: "#fff",

        gray: {
          dark: "#444444",
          medium: "#505050",
          light: "#6a6a6a",
        },
        green: "#7ffa0b",
        red: "#ff0000",
      },
    },
  },
  variants: {},
  plugins: [],
};
