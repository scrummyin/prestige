# Prestige

APIs are the future. Well, APIs were the future around 10 years ago. Creating APIs for all the things means more rapid development and future growth for your tech stack.

## What?

Prestige is basically a replacement for Apigee. Think: API proxy that can do fun stuff in the middle of the request like transform JSON to XML, check for API keys, headers, throttles, rate limiting, etc.

Ambitious goal: store analytics about every API request in a time series database and graph some fun data about the APIs being proxied.

## Tech stack

Let's go crazy.

### [NodeJS](http://nodejs.org)

Asynchronous. Fast. JavaScripty.

### [koa](https://github.com/koajs/koa)

Hate callbacks? Me too. Hi, [Harmony](http://wiki.ecmascript.org/doku.php?id=harmony:generators)!

### [redis](http://redis.io)

Cache all the things.

### [RethinkDB](http://www.rethinkdb.com) (future-land)

Like MongoDB, but with less suck. Also, a sweet admin interface.

### [InfluxDB](http://influxdb.org) (future-land)

Time series database. Has a penchant for analytics.

## Requirements

### NodeJS
1. Download and install a bleeding-edge version of NodeJS e.g. [0.11.9](http://nodejs.org/dist/v0.11.9/)

### Prestige

1. `git clone git@github.com:adamghill/prestige.git`
1. `cd prestige`
1. `npm install`
1. `npm install nodemon -g`
1. `up.sh`

### Redis

1. Download and un-archive [Redis](http://redis.io/download)
1. `cd ~/Downloads/redis-2.8.6`
1. `make`
1. `cd src`
1. `redis-server`

## Future-land requirements

### RethinkDB

1. `rethinkdb`
1. [RethinkDB admin](http://localhost:8080/)

### InfluxDB

1. `influxdb -config=/usr/local/etc/influxdb.conf`
1. [InfluxDB admin](http://localhost:8083/)

### Tasseo

1. `git clone git@github.com:obfuscurity/tasseo.git`
1. [Install locally](https://github.com/obfuscurity/tasseo#local)
1. Set up the [InfluxDB backend](https://github.com/obfuscurity/tasseo#influxdb)
