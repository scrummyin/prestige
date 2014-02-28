var pipes = {
	'responseTime': require('./responseTime'),
	'ratelimit': require('./ratelimit'),
	'cache': require('./cache'),
	'proxy': require('./proxy'),
	'compress': require('./compress')
}

module.exports = pipes
