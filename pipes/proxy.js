var debug = require('debug')('proxy')
 , request = require('koa-request')

module.exports = function(route) {
  return function *(next) {
    var url = route.domain + route.destination
    console.log('Proxying ' + url)

    var options = {
      url: url,
      headers: { 'User-Agent': 'prestige==0.0.1' }
    }

    var response = yield request(options)
    var contentType = response.headers['content-type']

    this.body = response.body
    this.type = contentType

    yield next
  }
}