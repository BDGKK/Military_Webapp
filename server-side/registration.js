const connection = require('../database/connection');
const express = require('express');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

router.post('/registration/registryData', (req, res) => {
    // Connect to db
    // Get user data from api
    // Get max_id from user table - increment by 1 to get new id no.
    // Use new_id and insert data into database
    // send new_id to registration page
    const registryData = req.body.registryData;
    const userId = 0;

    if (registryData) {
        connection.query('SELECT * FROM user_rank', (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    
        res.status(200).send({userId});
    } else {
        res.status(400).send("Failed");
    }
});

module.exports = router;