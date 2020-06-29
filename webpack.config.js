const Path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  node: {
    __dirname: false,
  },
  target: 'electron-main',
  externals: [nodeExternals()],
  entry: Path.join(__dirname, './src/main.js'),
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};
