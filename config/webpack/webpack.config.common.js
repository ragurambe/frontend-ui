const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

require("dotenv").config();

const config = {
  output: {
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
  },
  entry: {
    vendor: "./src/vendor.js",
    app: "./src/index.jsx",
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }, // translates CSS into CommonJS
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./config/postcss.config.js" },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }, // translates CSS into CommonJS
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./config/postcss.config.js" },
            },
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader?name=images/[name].[hash:4].[ext]",
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          "file-loader?name=fonts/[name].[hash:4].[ext]&mimetype=application/font-woff",
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          "file-loader?name=fonts/[name].[hash:4].[ext]&mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          "file-loader?name=fonts/[name].[hash:4].[ext]&mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=fonts/[name].[hash:4].[ext]",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          "file-loader?name=images/[name].[hash:4].[ext]&mimetype=image/svg+xml",
      },
    ],
  },

  resolve: {
    alias: {
      "@Root": path.resolve(__dirname, "../../src/"),
      "@Components": path.resolve(__dirname, "../../src/components"),
      // '@Constants': path.resolve(__dirname, '../../src/constants'),
      "@Helpers": path.resolve(__dirname, "../../src/helpers"),
      "@Scenes": path.resolve(__dirname, "../../src/scenes"),
      "@Services": path.resolve(__dirname, "../../src/services"),
      "@Models": path.resolve(__dirname, "../../src/models"),
      "@Assets": path.resolve(__dirname, "../../src/assets"),
      // '@Styles': path.resolve(__dirname, '../../src/styles'),
      // '@Variables': path.resolve(__dirname, '../../src/styles/variables'),
      // '@Utils': path.resolve(__dirname, '../../src/utils'),
    },
    extensions: [".js", ".jsx", ".css", ".scss", ".json"],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      ENV: process.env.ENV || "development",
      API_BASE: process.env.API_BASE,
    }),
    new CopyWebpackPlugin([{ from: "src/assets", to: "src/assets" }]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
};

module.exports = config;
