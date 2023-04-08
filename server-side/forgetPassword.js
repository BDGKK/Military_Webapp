const express = require("express");
const connection = require('../database/connection');
//const { saveUserDataToCache, getUserDataFromCache } = require('./side-functions/handleVerificationCodeCaching');
const isVerificationEmailSent = require('./side-functions/sendVerificationCodeToEmail');

const redis = require('redis');
const redisClient = redis.createClient();

redisClient.connect();

const router = express.Router();
router.use('/forget-password', express.static('./client-side/forget-password-page'));

const generateCode = () => {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLimit = 8;

    for (let i = 0; i < codeLimit; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
}

router.post('/forget-password/newUserData', (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.password;

    // Store the {email: code} in server cache using redis for 20 seconds
    // Send ok response
    const isEmailInDatabaseQuery = `SELECT * FROM user_table WHERE emailAddr='${email}'`;
    connection.query(isEmailInDatabaseQuery, async(err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(400).send({message: "Email is incorrect"});
            return;
        }

        
        const verificationCode = generateCode();
        const values = JSON.stringify({ verificationCode: 'ho'});
        redisClient.setEx('names', 20, values);

        res.send(await redisClient.get('names'));
        //saveUserDataToCache(email, newPassword, verificationCode);
        /*
        if (!isVerificationEmailSent(email, verificationCode)) {
            res.status(400).send({message: "Error with verifying gmail address"});
            return;
        }
        */
        /*
        getUserDataFromCache(email, (err, cachedData) => {
            if (err) throw err;
            res.send(cachedData);
        })
        */
    });
});

module.exports = router;