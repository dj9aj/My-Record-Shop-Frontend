const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

const devMode = process.env.NODE_ENV !== 'production';
const SRC_DIR = `${__dirname}/src`;
const DIST_DIR = `${__dirname}/dist`;

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', `${SRC_DIR}/index.js`],
  output: {
    path: path.resolve(__dirname, 'dist.js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          // Translates CSS into CommonJS
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // css-loader
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[local]___[hash:base64:5]'
              },
            }, 
          },
          
          // Compiles Sass to CSS 
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: {minimize: true}
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`,
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    port: 9000
  }
}