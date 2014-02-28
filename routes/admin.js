var render = require('../render')


exports.load = function(app, router) {
  app.get('/admin', function *(next) {
    this.body = yield render('index', { });;
  });
}
