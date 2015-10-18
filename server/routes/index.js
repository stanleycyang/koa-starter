'use strict'

const path = require('path')
const jade = require('jade')

const config = require('../../config')
const routes = module.exports = []

const home = path.resolve('client/views/index.jade')
const error = path.resolve('client/views/error.jade')

/*
 * Home page for our SPA
 */

routes.push(function * (next) {
  if (this.request.path !== '/') return yield* next

  // Send the jade file
  this.response.body = jade.renderFile(home, {
    title: 'Home'
  })

  // Set response header
  this.response.set('Cache-Control', 'public, max-age=300')
})

/*
 * Error page
 */

routes.push(function * (next) {
  if (this.request.path !== '/404') return yield* next

  // send the jade file
  this.response.body = jade.renderFile(error, {
    message: '404: Page not found',
  })
})
