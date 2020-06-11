module.exports = {
  purge: false,
  theme: {
    extend: {
      colors: {
        transparent: "transparent",

        black: "#000",
        white: "#ddd",
        "white-light": "#fff",

        gray: {
          dark: "#444444",
          medium: "#505050",
          light: "#6a6a6a",
        },
        green: "#7ffa0b",
        red: "#ff0000",
      },
      spacing: {
        "1px": "1px",
      },
    },
  },
  variants: {
    textColor: ["group-hover"],
  },
  plugins: [],
};
