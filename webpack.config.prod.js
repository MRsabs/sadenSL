const Path = require('path');
const WebpackBar = require('webpackbar');
const fs = require('fs-extra');
const nodeExternals = require('webpack-node-externals');
if (fs.existsSync(Path.resolve(__dirname, './tmp'))) {
  fs.removeSync(Path.resolve(__dirname, './tmp'));
}

module.exports = {
  mode: 'production',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  target: 'electron-main',
  entry: Path.join(__dirname, './src/main.ts'),
  plugins: [
    new WebpackBar({name: 'Electron-Main'})
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' },
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
