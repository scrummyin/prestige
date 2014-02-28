var thunkify = require('thunkify')
  , ms = require('ms')
  , redis = require('koa-redis')

module.exports = function(route) {
  var store = redis();

  return function *(next) {
    console.log('lookup attempt');
    var cache_lookup_result = yield store.get("prefixs_");
    if (cache_lookup_result) {
      console.log('lookup good');
      this.body = cache_lookup_result;
      return;
    }
    console.log('lookup failed');
    yield next;
  }
}
