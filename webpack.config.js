const Path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  externals: [nodeExternals()],
  target: 'electron-main',
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
    path: __dirname + '/dist',
  },
};
