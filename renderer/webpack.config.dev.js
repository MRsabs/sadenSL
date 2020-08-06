const path = require('path');
const WebpackBar = require('webpackbar');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'source-map',
  output: {
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
    watchOptions: {
      ignored: path.resolve(__dirname, './node_modules'),
    },
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
              ['@babel/preset-env', { targets: { electron: '9' } }],
              ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
              '@babel/preset-react',
            ],
            plugins: [
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
      // extraArgs: '--version',
      // The same as the `--out-dir` option for `wasm-pack`
      outDir: path.resolve(__dirname, './wasm/pkg'),
      // the mode `production` makes `wasm-pack` build in `release` mode.
      forceMode: 'development',
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
