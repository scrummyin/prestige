var pipes = {
	'responseTime': require('./responseTime'),
	'ratelimit': require('./ratelimit'),
	'cache': require('./cache'),
	'request': require('./request'),
	'compress': require('./compress'),
	'validateQuerystring': require('./validateQuerystring'),
}

module.exports = pipes
