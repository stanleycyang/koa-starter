'use strict'

const webpack = require('webpack')
const path = require('path')

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
      }
    ]
  }
}
