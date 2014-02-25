module.exports = function(route) {
	return function *(next) {
    var start = Date.now()
    yield next
    
    var delta = (Date.now() - start)
    console.log('%sms', delta)
    // TODO: Store response time somewhere.
  }
}
