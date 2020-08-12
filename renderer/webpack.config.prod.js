const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');
if (fs.existsSync(path.join(__dirname, '../dist/renderer'))) {
  fs.removeSync(path.join(__dirname, '../dist/renderer'));
}

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
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
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
              ],
              ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
              '@babel/preset-react',
            ],
            plugins: [
              // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              'react-hot-loader/babel',
            ],
          },
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, './wasm'),
      args: '--log-level warn',
      // Default arguments are `--typescript --target browser --mode normal`.
      extraArgs: '--no-typescript',
      // The same as the `--out-dir` option for `wasm-pack`
      outDir: path.resolve(__dirname, './wasm/pkg'),
      // the mode `production` makes `wasm-pack` build in `release` mode.
      forceMode: 'production',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new WebpackBar({ name: 'Electron-Renderer' }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin({})],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.wasm', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};
