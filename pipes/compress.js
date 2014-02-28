var compressible = require('compressible')
  , Stream = require('stream')
  , bytes = require('bytes')
  , zlib = require('zlib')


var encodingMethods = {
  gzip: zlib.createGzip,
  deflate: zlib.createDeflate
}

module.exports = function(route) {
  return function *(next) {
    // https://github.com/koajs/compress/blob/master/index.js
    var filter = route.pipeline.compress.filter || compressible

    var threshold = !route.pipeline.compress.threshold ? 1024
      : typeof route.pipeline.compress.threshold === 'number' ? route.pipeline.compress.threshold
      : typeof route.pipeline.compress.threshold === 'string' ? bytes(route.pipeline.compress.threshold)
      : 1024

    this.vary('Accept-Encoding')

    yield* next

    var body = this.body

    if (this.method === 'HEAD'
      || this.status === 204
      || this.status === 304
      // Assumes you either always set a body or always don't
      || body == null
    ) return

    // forced compression or implied
    if (!(filter(this.response.type))) return

    // identity
    var encoding = this.acceptsEncodings('gzip', 'deflate', 'identity')
    if (!encoding) this.throw(406, 'supported encodings: gzip, deflate, identity')
    if (encoding === 'identity') return

    // threshold
    if (threshold && this.response.length < threshold) return

    // json
    if (isJSON(body)) {
      body = JSON.stringify(body)
      if (threshold && body.length < threshold) return
    }

    this.set('Content-Encoding', encoding)
    this.res.removeHeader('Content-Length')

    var stream = encodingMethods[encoding](route.pipeline.compress)

    if (body instanceof Stream) {
      body.on('error', this.onerror).pipe(stream)
    } else {
      stream.end(body)
    }

    this.body = stream
  }

  function isJSON(obj) {
    if ('string' == typeof obj) return false;
    if (obj instanceof Stream) return false;
    if (Buffer.isBuffer(obj)) return false;
    return true;
  }
}
