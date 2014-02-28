var debug = require('debug')('prestige')
  , mount = require('koa-mount')
  , compose = require('koa-compose')
  , _ = require('underscore')
  , pipes = require('../pipes')



function getRouteMiddleware(route) {
  var inputPipes = []
  var outputPipes = []

  var pipeline = inputPipes.concat(pipes.proxy(route))
  pipeline.concat(outputPipes)

  Object.keys(route.pipeline).forEach(function(key) {
    // Pass route.pipeline into pipeline fn, not route?
    pipeline.push(pipes[key](route))
  })

  var middleware = compose(pipeline)
  return middleware
}


exports.load = function(app, router) {
  var config = require('../config')

  config.applications.forEach(function(application) {
    if ((!application.startDate || application.startDate < Date.now())
      && (!application.endDate || application.endDate > Date.now())) {

      var dynamicRoute = new router()

      application.routes.forEach(function(route) {
        route.pipeline = _.defaults(route.pipeline, application.pipeline) || {}
        route.domain = route.domain || application.domain || config.domain || ''

        dynamicRoute.get(route.source, getRouteMiddleware(route))
      })

      app.use(mount(application.path, dynamicRoute.middleware()))
    }
  })
}
