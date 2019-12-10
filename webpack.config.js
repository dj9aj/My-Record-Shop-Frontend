const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

const devMode = process.env.NODE_ENV !== 'production';
const SRC_DIR = `${__dirname}/src`;
const DIST_DIR = `${__dirname}/dist`;

module.exports = {
  // babel-polyfill needed for ES6 promises, Array.from etc. react-hot-loader to preserve React state after hot-reloading.
  entry: ['babel-polyfill', 'react-hot-loader/patch', `${SRC_DIR}/index.js`],
  output: {
    path: path.resolve(__dirname, 'dist.js'),
    filename: 'bundle.js'
  },
  module: {
    // When pre-processing source code as it's imported, Loaders are executed from bottom to top in the rules array.
    rules: [
      {
        // Apply babel to JS files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          // fallback to style-loader in development. style-loader translates CSS into CommonJS
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                modules: {
                  localIdentName: '[local]___[hash:base64:5]'
                },
              },
            },
            {
              // Compiles Sass to CSS 
              loader: 'sass-loader', options: { sourceMap: true },
            },
        ],
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: { minimize: true }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: `${SRC_DIR}/index.html`, filename: './index.html' }),
    // This plugin creates a CSS file per JS file which contains CSS
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  devServer: { contentBase: DIST_DIR, hot: true, port: 9000 },
}