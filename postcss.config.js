const tailwindcss = require("tailwindcss");
const vhFix = require("postcss-100vh-fix");
module.exports = {
  plugins: ["postcss-preset-env", tailwindcss, vhFix],
};
