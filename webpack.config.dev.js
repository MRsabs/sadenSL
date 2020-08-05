const Path = require('path');
const WebpackBar = require('webpackbar');
const nodeExternals = require('webpack-node-externals');
const ElectronReloadPlugin = require('webpack-electron-reload')({
  path: Path.join(__dirname, './dist/main.js'),
});

module.exports = {
  mode: 'development',
  node: {
    __dirname: false,
  },
  devtool: 'source-map',
  externals: [nodeExternals()],
  target: 'electron-main',
  entry: Path.join(__dirname, './src/main.ts'),
  plugins: [
    ElectronReloadPlugin(),
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
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};
