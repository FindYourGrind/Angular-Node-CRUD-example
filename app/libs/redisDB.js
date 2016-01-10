/**
 * Created by ihor on 10.01.16.
 */

var redis = require('redis');
var config = require('../config');

var redisClient = redis.createClient(config.get('redis:port'));

redisClient.on('error', function (err) {
    console.log('Redis Error: ' + err);
});

redisClient.on('connect', function () {
    console.log('Redis is ready');
});

exports.redis = redis;
exports.redisClient = redisClient;