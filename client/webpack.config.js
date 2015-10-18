'use strict'

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    'webpack-hot-middleware/client?reload=true'
  },
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      // babel + jax loader
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: [
          'babel'
        ]
      },
      // json loader
      {
        test: /\.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test:/\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },
  postcss: function () {
    return [
      require('postcss-import'),
      require('postcss-cssnext'),
      require('cssnano')({
        safe: true
      })
    ]
  },
  // node node built-ins
  node: false
}
