const express = require("express");
const connection = require('../database/connection');
const { saveUserDataToCache, getUserDataFromCache } = require('./side-functions/handleVerificationCodeCaching');
const isVerificationEmailSent = require('./side-functions/sendVerificationCodeToEmail');
const encryptPassword = require('./side-functions/encryptPassword');

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

    const isEmailInDatabaseQuery = `SELECT * FROM user_table WHERE emailAddr='${email}'`;
    connection.query(isEmailInDatabaseQuery, async(err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(400).send({message: "Email is incorrect"});
            return;
        }

        const verificationCode = generateCode();

        await saveUserDataToCache(email, newPassword, verificationCode);

        if (!isVerificationEmailSent(email, verificationCode)) {
            res.status(400).send({message: "Error with verifying gmail address"});
            return;
        }

        res.status(200).send({message: "Verification Code was sent to your email\nCode will expire in 120 seconds"});
    });
});

router.post('/forget-password/userVerificationData', async(req, res) => {
    const email = req.body.email;
    const verificationCode = req.body.verificationCode;

    const isEmailInDatabaseQuery = `SELECT * FROM user_table WHERE emailAddr='${email}'`;
    connection.query(isEmailInDatabaseQuery, async(err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(400).send({message: "Email is incorrect"});
            return;
        }

        const userData = await getUserDataFromCache(email);
        if (Object.entries(userData).length === 0) {
            res.status(400).send({message: "Sorry, the verification code for this email has either expired or has not been sent yet.\n"+
            "Please request a new verification code"});
            return;
        }

        if (userData.verificationCode !== verificationCode) {
            res.status(400).send({message: "Verification Code is Incorrect"});
            return;
        }
        
        // Update password for the user in the database
        const newEncryptedPassword = await encryptPassword(userData.password);
        const updateUserPasswordQuery = `
            UPDATE user_table
            SET password='${newEncryptedPassword}'
            WHERE emailAddr='${email}';`
        
        connection.query(updateUserPasswordQuery, (err) => {
            if (err) throw err;
            res.status(200).send({message: "Password Changed Succesfully"});
        });
    });
});

module.exports = router;