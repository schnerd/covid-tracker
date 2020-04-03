/* eslint-env node */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: 'main.bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CopyPlugin([{from: 'src/style.css', to: 'style.css'}]),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
