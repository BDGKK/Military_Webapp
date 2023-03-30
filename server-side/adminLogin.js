const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../database/connection");

const router = express.Router();
router.use('/adminLogin', express.static('./client-side/admin-login-page'));

router.post('/adminLogin/adminLoginInfo', (req, res) => {
    const adminEmail = req.body.email;
    const adminPassword = req.body.password;

    const findAdminEmailQuery = `SELECT password FROM admin WHERE email = "${adminEmail}"`;
    connection.query(findAdminEmailQuery, async(err, result) => {
        if (err) throw err;
        const isAdminInDatabase = result.length === 1;

        if (isAdminInDatabase) {
            const adminPasswordInDB = result[0].password;
            const isPasswordMatching = await bcrypt.compare(adminPassword, adminPasswordInDB);

            if (isPasswordMatching) {
                res.status(200).send({message: "Admin is verified"});
            } else {
                res.status(400).send({message: "Password is incorrect"});
            }
        } else {
            res.status(400).send({message: "Email is incorrect"});
        }
    });
});

module.exports = router;