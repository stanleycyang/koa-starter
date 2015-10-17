'use strict'

const path = require('path')
const jade = require('jade')

const config = require('../../config')
const routes = module.exports = []

const home = path.resolve('client/views/index.jade')

// Home page for our SPA
routes.push(function * (next) {
  if (this.request.path !== '/') return yield* next
  this.response.body = jade.renderFile(home)
  this.response.set('Cache-Control', 'public, max-age=300')
})
