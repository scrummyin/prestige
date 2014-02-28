var debug = require('debug')('ratelimit')
  , Limiter = require('ratelimiter')
  , thunkify = require('thunkify')
  , ms = require('ms')
  , redis = require('redis')


module.exports = function(route) {
  return function *(next) {
    // https://github.com/koajs/ratelimit/blob/master/index.js
    var id = this.ip + route.domain + route.destination;

    // initialize limiter
    var limiter = new Limiter({
      id: id,
      __proto__: {
        max: route.pipeline.ratelimit.max,
        duration: route.pipeline.ratelimit.duration,
        db: redis.createClient()
      }
    });
    limiter.get = thunkify(limiter.get);

    // check limit
    // TODO: lame.. add limiter.load() or sth
    var limit = yield limiter.get();

    // header fields
    this.set('X-RateLimit-Limit', limit.total);
    this.set('X-RateLimit-Remaining', limit.remaining);
    this.set('X-RateLimit-Reset', limit.reset);

    // yield downstream
    yield next;

    // it's all good
    debug('remaining %s/%s %s', limit.remaining, limit.total, id);
    if (limit.remaining) return;

    // it's not good
    var delta = (limit.reset * 1000) - Date.now() | 0;
    var after = limit.reset - (Date.now() / 1000) | 0;
    this.set('Retry-After', after);
    this.status = 429;
    this.body = 'Rate limit exceeded, retry in ' + ms(delta, { long: true });
  }
}
