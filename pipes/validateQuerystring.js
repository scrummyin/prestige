var qs = require('qs')


module.exports = function(route) {
  return function *(next) {
    var querystring = qs.parse(this.request.querystring)

    if (querystring[route.pipeline.validateQuerystring.key]
      && querystring[route.pipeline.validateQuerystring.key] === route.pipeline.validateQuerystring.val) {
        yield next
    } else {
      this.throw(401, 'Unauthorized')
    }
  }
}
