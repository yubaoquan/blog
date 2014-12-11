var settings = require('../settings'),
  redis = require('redis'),
  redisClient = redis.createClient(settings.redisPort, settings.redisHost, {});
module.exports = redisClient;