const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');
if (fs.existsSync(path.join(__dirname, '../dist/renderer'))) {
  fs.removeSync(path.join(__dirname, '../dist/renderer'));
}

module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  mode: 'production',
  target: 'electron-renderer',
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, '../dist/erenderer'),
    filename: 'index_bundle.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.wasm', '.js', '.jsx', '.json'],
    alias: {
      '@utils': path.join(__dirname, './src/utils'),
      '@contexts': path.join(__dirname, './src/contexts'),
    },
  },
};
