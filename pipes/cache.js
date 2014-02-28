var redis = require('koa-redis')

module.exports = function(route) {
  var store = redis();
  var timeout = route.pipeline.cache.timeout || 15000;
  var prefix = route.pipeline.cache.prefix || "";

  return function *(next) {
    var hash_key = prefix.concat(this.request.url);
    var cache_lookup_result = yield store.get(hash_key);
    if (cache_lookup_result) {
      this.body = cache_lookup_result;
      return;
    };
    yield next;
    yield store.set(hash_key, this.body, timeout);
  }
}
