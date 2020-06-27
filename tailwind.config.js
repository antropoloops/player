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
      gridTemplateRows: {
        // Complex site-specific row configuration
        "layout-desktop": "auto 1fr",
      },
      minWidth: {
        sidebar: "300px",
      },
      maxHeight: {
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
      },
    },
  },
  variants: {
    textColor: ["hover", "group-hover"],
  },
  plugins: [],
};
