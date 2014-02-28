var config = {
  applications: [{
    name: 'test',
    description: 'For testing',
    path: '/test',
    routes: [{
      source: '/',
      startDate: null,
      endDate: null,
      pipeline: {
        cache: {},
        ratelimit: {
          max: 1000,
          duration: 1000
        },
        compress: {
          filter: function(content_type) {
            return /text|json/i.test(content_type)
          },
          threshold: 2000,
          flush: require('zlib').Z_SYNC_FLUSH
        },
        request: {
          destination: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk',
        },
      },
    }],
    startDate: null,
    endDate: null,
    pipeline: {
      cache: {},
      // ratelimit: {
      //   max: 0,
      //   duration: 0,
      // }
    },
  }, ]
}

if (false) {
  // TODO: load config from db
}

module.exports = config
