var debug = require('debug')('prestige')
  , mount = require('koa-mount')
  , compose = require('koa-compose')
  , _ = require('underscore')
  , pipelines = require('../pipelines/')
  


function getRoutePipeline(route) {
  var inputGenerators = []
  var outputGenerators = []
  
  var pipelineGenerators = inputGenerators.concat(pipelines.proxy(route))
  pipelineGenerators.concat(outputGenerators)

  Object.keys(route.pipeline).forEach(function(key) {
    pipelineGenerators.push(pipelines[key](route))
  })

  var composedPipeline = compose(pipelineGenerators)
  return composedPipeline
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

        dynamicRoute.get(route.source, getRoutePipeline(route))
      })

      app.use(mount(application.path, dynamicRoute.middleware()))
    }
  })
}
