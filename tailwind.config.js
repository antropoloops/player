module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    typography: {
      default: {
        css: {
          p: {
            lineHeight: "24px",
            textAlign: "justify",
          },
          color: "#efefef",
          h1: {
            color: "#efefef",
            fontWeight: "medium",
          },
          h2: {
            color: "#efefef",
            fontWeight: "normal",
          },
          h3: {
            color: "#efefef",
            fontWeight: "normal",
          },
          strong: {
            color: "white",
          },
          a: {
            color: "#F6AD55",
          },
        },
      },
      page: {
        css: {
          color: "#111",
          h1: {
            color: "#111",
          },
          h2: {
            color: "#111",
          },
          h3: {
            color: "#111",
          },
          strong: {
            color: "black",
          },
          a: {
            color: "#DD6B20",
          },
        },
      },
    },
    extend: {
      colors: {
        transparent: "transparent",

        black: "#000",
        white: "#ddd",
        "white-light": "#fff",
        "white-dark": "#aaa",

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
        "layout-desktop": "auto 1fr",
      },
      gridTemplateColumns: {
        "media-object": "33% auto 4rem",
      },
      minWidth: {
        sidebar: "300px",
      },
      minHeight: {
        "8": "2rem",
        "12": "3rem",
      },
      maxWidth: {
        content: "820px",
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
    opacity: ["hover", "group-hover"],
  },
  plugins: [require("@tailwindcss/typography")],
};
