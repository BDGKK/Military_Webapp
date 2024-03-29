const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../database/connection");

const router = express.Router();
router.use('/user-log', express.static('./client-side/user-log-page'));

router.post('/user-log/userLoginInfo', (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const findUserEmailQuery = `SELECT userid, password FROM user_table WHERE emailAddr = "${userEmail}"`;
    connection.query(findUserEmailQuery, async (err, result) => {
        if (err) throw err;
        const isUserInDatabase = result.length === 1;

        if (isUserInDatabase) {
            const userIdInDB = result[0].userid;
            const userPasswordInDB = result[0].password;
            const isPasswordMatching = await bcrypt.compare(userPassword, userPasswordInDB);

            if (isPasswordMatching) {
                req.session.userId = userIdInDB;
                res.status(200).send({ message: "User is verified" });
            } else {
                res.status(400).send({ message: "Password is incorrect" });
            }
        } else {
            res.status(400).send({ message: "Email is incorrect" });
        }
    });
});

module.exports = router;