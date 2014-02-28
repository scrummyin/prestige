var _ = require('underscore');

module.exports = function(route) {

  return function *(next) {
    var white_list_verbs = {
      'GET': false,
      'HEAD': false,
      'POST': false,
      'PUT': false,
      'PATCH': false,
      'DELETE': false,
      'COPY': false,
      'OPTIONS': false,
      'LINK': false,
      'UNLINK': false,
      'PURGE': false,
    }
    var black_list_verbs = {
      'GET': true,
      'HEAD': true,
      'POST': true,
      'PUT': true,
      'PATCH': true,
      'DELETE': true,
      'COPY': true,
      'OPTIONS': true,
      'LINK': true,
      'UNLINK': true,
      'PURGE': true,
    }
    var success = false;
    if (route.pipeline.verbs.deny) {
      _.forEach(route.pipeline.verbs.deny, function(verb) {black_list_verbs[verb] = false});
      if (black_list_verbs[this.request.method]) {
        yield next;
        success = true;
      }
    }
    if (route.pipeline.verbs.allow) {
      _.forEach(route.pipeline.verbs.allow, function(verb) {white_list_verbs[verb] = true});
      if (white_list_verbs[this.request.method]) {
        yield next;
        success = true;
      }
    }
    if (!success){
      this.throw(405, 'Method Not Allowed');
    }
  }
}
