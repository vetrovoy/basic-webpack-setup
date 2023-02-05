const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const path = require("path");

const mode = process.env.NODE_ENV;

const projectPath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist");

module.exports = {
  mode: mode,
  entry: {
    index: `${projectPath}/js/index.js`,
  },
  output: {
    path: distPath,
    filename: "js/[name].js",
    assetModuleFilename: "images/[name][ext]",
    clean: true,
  },
  devServer: {
    static: {
      directory: distPath,
    },
    hot: false,
    liveReload: true,
    compress: true,
    port: 9000,
  },
  devtool: mode === "development" ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Test",
      filename: "index.html",
      template: "src/index.html",
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
};
