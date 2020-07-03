const Path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  target: 'electron-main',
  entry: Path.join(__dirname, './src/main.ts'),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      { test: /\.(js|ts)$/, exclude: /node_modules/, loader: 'ts-loader' },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  output: {
    path: Path.join(__dirname, '/dist'),
  },
  resolve: {
    extensions: ['.wasm', '.js', '.ts', '.json', '.node'],
  },
  watch: false,
};
