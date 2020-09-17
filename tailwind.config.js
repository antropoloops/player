module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",

        black: "#000",
        white: "#efefef",
        "white-light": "#fff",
        "white-dark": "#aaa",
        primary: "#ffdf01",

        gray: {
          darker: "#343434",
          dark: "#444444",
          medium: "#505050",
          light: "#606060",
          "light-original": "#656565",
          lighter: "#757575",
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
        "cover-xs": "5rem",
        "cover-sm": "6rem",
        cover: "12rem",
        content: "820px",
      },
      maxHeight: {
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
      },
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        ping: {
          "75%, 100%": { transform: "scale(1.1)", opacity: "0" },
        },
      },
    },
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
          blockquote: {
            color: "#efefef",
            quotes: "none",
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
          p: {
            color: "#111",
          },
          blockquote: {
            color: "#111",
            quotes: "none",
          },
        },
      },
    },
  },
  variants: {
    textColor: ["hover", "group-hover"],
    opacity: ["hover", "group-hover"],
  },
  plugins: [require("@tailwindcss/typography")],
};
