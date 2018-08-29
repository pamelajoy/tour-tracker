// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServer = require('@webpack-blocks/dev-server2');
const splitVendor = require('webpack-blocks-split-vendor');
const happypack = require('webpack-blocks-happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  addPlugins, createConfig, entryPoint, env, setOutput,
  sourceMaps, defineConstants, webpack,
} = require('@webpack-blocks/webpack2');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const sourceDir = process.env.SOURCE || 'src';
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/');
const sourcePath = path.join(process.cwd(), sourceDir);
const scssPath = './scss/main.scss';
const outputPath = path.join(process.cwd(), 'dist');

const babel = () => () => ({
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
})

const config = createConfig([
  entryPoint({
    app: [sourcePath, scssPath],
  }),
  setOutput({
    filename: '[name].[hash].js',
    path: outputPath,
    publicPath,
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.PUBLIC_PATH': publicPath,
  }),
  addPlugins([
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/index.html'),
    }),
  ]),
  happypack([
    babel(),
  ], {
    cacheContext: {
      sourceDir,
    },
  }),
  () => ({
    resolve: {
      modules: [sourceDir, 'node_modules'],
    },
    module: {
      rules: [
        { 
          test: /\.(png|jpe?g|svg)$/, 
          loader: 'url-loader?&limit=8000',
        },
        { 
          test: /\.(woff2?|ttf|eot)$/, 
          loader: 'url-loader?&limit=8000',
        },
        { // regular css files
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            loader: 'css-loader?importLoaders=1',
          }),
        },
        { // sass / scss loader for webpack
          test: /\.(sass|scss)$/,
          loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        }
      ],
    },
  }),

  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      publicPath,
      host,
      port,
    }),
    sourceMaps(),
    addPlugins([
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin({
      filename: 'public/[name].bundle.css',
      allChunks: true,
    })
    ]),
  ]),

  env('production', [
    splitVendor(),
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ]),
  ]),
])

module.exports = config
