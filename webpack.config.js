const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");

const getCommonConfig = (env) => ({
  entry: ["./src/index.js"],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
  node: {
    global: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.USE_MOCK": env.mock,
    }),
  ],
});

const productionConfig = {
  mode: "production",
};

const developmentConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = (env) => {
  const config = getCommonConfig(env);
  switch (true) {
    case env.development:
      return merge(config, developmentConfig);
    case env.production:
      return merge(config, productionConfig);
    default:
      throw new Error("No matching configuration was found!");
  }
};
