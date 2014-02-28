module.exports = function(route) {
  return function *(next) {
    // TODO: cache somewhere; duration?
    console.log('cache')

    yield next
  }
}
