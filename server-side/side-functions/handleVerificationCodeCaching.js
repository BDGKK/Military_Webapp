const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

const saveUserDataToCache = (email, password, verificationCode) => {
    const key = email;
    const value = JSON.stringify({ password, verificationCode });
    const durationToKeepDataCachedInSeconds = 10;
    redisClient.setEx(key, durationToKeepDataCachedInSeconds, value, (err) => {
        if (err) throw err;
    });
}

const getUserDataFromCache = (email, callback) => {
    const key = email;
    redisClient.get(key, (err, cachedData) => {
        if (err) {
            console.log('Redis error: ', err);
            callback(err, null);
        } else {
            callback(null, JSON.parse(cachedData));
        }
    });
}

module.exports = { saveUserDataToCache, getUserDataFromCache };