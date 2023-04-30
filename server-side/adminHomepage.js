const express = require("express");
const connection = require('../database/connection');

const router = express.Router();

router.get('/adminHomepage', (req, res, next) => {
    !req.session.isAdminLoggedIn ? res.redirect('/adminLogin') : next();
});
router.use('/adminHomepage', express.static('./client-side/admin-home-page'));

router.get('/adminHomepage/allUserIds', (req, res) => {
    const allUserIdsQuery = "SELECT userID FROM user_table";
    connection.query(allUserIdsQuery, (err, result) => {
        if (err) throw err;
        const rawUserIds = result.map(item => item.userID);
        res.status(200).send(rawUserIds);
    });
});

module.exports = router;