var responseTime = require('koa-response-time')
  , logger = require('koa-logger')
  , router = require('koa-router')
  , serve = require('koa-static')
  , koa = require('koa')


var env = process.env.NODE_ENV || 'development';

function api(opts) {
  opts = opts || {};
  var app = koa();

  if ('test' != env) {
    app.use(logger());
  }

  app.use(responseTime());

  app.use(serve('assets'));

  app.use(router(app))
  require('./routes/admin').load(app, router)
  require('./routes/dynamic').load(app, router)

  return require('koa-qs')(app)
}

module.exports = api;
