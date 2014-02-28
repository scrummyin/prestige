var pipes = {
	'responseTime': require('./responseTime'),
	'ratelimit': require('./ratelimit'),
	'cache': require('./cache'),
	'request': require('./request'),
	'compress': require('./compress'),
	'verbs': require('./verbs')
}

module.exports = pipes
