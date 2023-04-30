const express = require("express");
const connection = require('../database/connection');

const router = express.Router();

// Prevent user from accessing page if their login details aren't saved
router.get('/loan', (req, res, next) => {
    !req.session.userId ? res.redirect('/user-log') : next();
});
router.use('/loan', express.static('./client-side/loan-page'));

router.post('/loan/loanInfo', (req, res) => {
    const amount = req.body.amount;
    const interestRate = req.body.interestRate;
    const timePeriod = req.body.timePeriod;
    const partonName = req.body.partonName;
    const userId = req.body.userId;
    
    const insertLoanDataQuery = `
        INSERT INTO loan(amount, interestRate, timePeriod, partonName, userID)
        VALUES (${amount}, ${interestRate}, ${timePeriod}, '${partonName}', '${userId}')`;
    
    connection.query(insertLoanDataQuery, (err) => {
        if (err) throw err;
        console.log(`User ${userId} applied for a loan`);
        res.status(200).send({message: "Successfully Submitted!"});
    });

    // Add code later to get loan document and upload to Google Drive
});

module.exports = router;