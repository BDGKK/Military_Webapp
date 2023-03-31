const express = require("express");
const connection = require('../database/connection')

const router = express.Router();
router.use('/pension', express.static('./client-side/pension-page'));

router.post('/pension/pensionInfo', (req, res) => {
    const totalAmount = req.body.totalAmount;
    const renewDate = req.body.renewDate;
    const userId = req.body.userId;
    
    const insertPensionDataQuery = `
        INSERT INTO pension(totalAmount, renewDate, userID)
        VALUES (${totalAmount}, '${renewDate}', '${userId}')`;
    
    connection.query(insertPensionDataQuery, (err) => {
        if (err) throw err;
        console.log(`User ${userId} applied for a pension`);
        res.status(200).send({message: "Successfully Submitted!"});
    });

    // Add code later to get pension document and upload to Google Drive
});

module.exports = router;