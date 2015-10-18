'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const port = require('../config').port + 1

const entrypoint_prefix = [
  'webpack/hot/only-dev-server',
  'webpack-dev-server/client?http://localhost:' + port
]

const config = module.exports = {
  entry: {
    // Root component. Add additional components with the same prefix, ie. entrypoint_prefix.concat('your_entry_point')
    'main': entrypoint_prefix.concat('./client/components/main/index')
  },
  output: {
    path: path.resolve('client', 'build'),
    publicPath: 'http://localhost:' + port + '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },
  module: {
    loaders: [
      // babel + jsx loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
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
      // css loader
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss'
        ]
      }
    ],
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
  },
  postcss: function () {
    return [
      require('postcss-import'),
      require('postcss-cssnext')
    ]
  },
  node: false
}

const DevServer = new WebpackDevServer(webpack(config), {
  contentBase: path.resolve('build') + '/',
  hot: true,
  quiet: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

DevServer.listen(port, 'localhost', (err) => {
  if (err) throw err
})
