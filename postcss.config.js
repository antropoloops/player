const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.tsx"],
  css: ["./src/app/styles/index.css"],
});

const cssnano = require("cssnano")({
  preset: "default",
});
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    isProd && purgecss,
    isProd && cssnano,
  ],
};
