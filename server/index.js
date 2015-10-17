'use strict'

const compose = require('koa-compose') // Plug and play middleware where we need it. ie. compose([a,b,c])
const path = require('path')
const config = require('../config')
const app = module.exports = require('koa')()

// logger
app.use(require('koa-logger')())

// CORS
app.use(require('kcors')())

// compress everything
app.use(require('koa-compress')({
  // flush: require('zlib').Z_SYNC_FLUSH
}))

// HTTP Caching
app.use(require('koa-fresh')())
app.use(require('koa-etag')())

// mount API
app.use(require('koa-mount')('/api', compose(require('./api'))))

// routes
app.use(compose(require('./routes')))

app.use(require('koa-static')(path.resolve('static'), {
  maxage: config.env === 'production'
    ? 31536000
    : 0,
  hidden: false,
  index: false
}))

app.use(require('koa-static')(path.resolve('build'), {
  maxage: config.env === 'production'
    ? 31536000
    : 0,
  hidden: false,
  index: false
}))

app.use(require('koa-favicon')(path.resolve('static/favicon.ico'), {
  maxAge: 31536000
}))

// Throw a 404
app.use(function * (next) {
  this.status = 404
})
