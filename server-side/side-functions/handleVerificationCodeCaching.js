const redis = require('redis');
const redisClient = redis.createClient();

redisClient.connect();

const saveUserDataToCache = async(email, password, verificationCode) => {
    await redisClient.hSet(email, 'password', password);
    await redisClient.hSet(email, 'verificationCode', verificationCode);

    await redisClient.expire(email, 60); // Code expires in 60 seconds
}

const getUserDataFromCache = async(email) => {
    const userData = await redisClient.hGetAll(email);
    return userData;
}

module.exports = { saveUserDataToCache, getUserDataFromCache };