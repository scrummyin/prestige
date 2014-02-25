var pipelines = {
	'responseTime': require('./responseTime'),
	'ratelimit': require('./ratelimit'),
	'cache': require('./cache'),
	'proxy': require('./proxy'),
	// compress
}

module.exports = pipelines
