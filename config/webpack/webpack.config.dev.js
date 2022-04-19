const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const webpackConfig = require("./webpack.config.common");

const buildPath = path.resolve(__dirname, "../../dist/");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";

const devConfig = webpackMerge(webpackConfig, {
  mode: "development",
  output: {
    path: buildPath,
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
  },

  module: {},

  devServer: {
    contentBase: buildPath,
    compress: true,
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = devConfig;
