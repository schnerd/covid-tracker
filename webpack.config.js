/* eslint-env node */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const dist = devMode ? 'dist-dev' : 'dist';

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, dist),
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    publicPath: devMode ? '/' : dist,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    ...(devMode ? [new CopyPlugin([{from: 'assets', to: `assets`}])] : []),
    new HtmlWebpackPlugin({
      filename: devMode
        ? path.resolve(__dirname, `./${dist}/index.html`)
        : path.resolve(__dirname, 'index.html'),
      template: 'src/index.html',
      inject: false,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, `/${dist}/`),
    publicPath: '/',
  },
  optimization: {
    moduleIds: 'hashed',
    minimizer: devMode ? [] : [new UglifyJsPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
        },
      },
    },
  },
};
