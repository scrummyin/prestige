var debug = require('debug')('prestige')
  , mount = require('koa-mount')
  , compose = require('koa-compose')
  , _ = require('underscore')
  , pipes = require('../pipes')


function getRouteMiddleware(route) {
  var pipelineFunctions = []

  Object.keys(route.pipeline).forEach(function(key) {
    pipelineFunctions.push(pipes[key](route))
  })

  var middleware = compose(pipelineFunctions)
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
        dynamicRoute.get(route.source, getRouteMiddleware(route))
      })

      app.use(mount(application.path, dynamicRoute.middleware()))
    }
  })
}
