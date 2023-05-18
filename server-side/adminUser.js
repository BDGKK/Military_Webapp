const express = require("express");
const connection = require('../database/connection');

const router = express.Router();

router.get('/adminUser', (req, res, next) => {
    !req.session.isAdminLoggedIn ? res.redirect('/adminLogin') : next();
});
router.use('/adminUser', express.static('./client-side/admin-user-page'));

router.get('/adminUser/:id', (req, res) => {
    const userId = req.params.id;

    const getUserProfileQuery = `
    SELECT
      userID, firstName, lastName, gender,
      permanentAddress, permanentPostCode,
      temporaryAddress, temporaryPostCode,
      dateOfBirth, mobileNumber, landNumber,
      NIC, emailAddr, frcs.forceName,
      reg.regimentName, ur.rankName,
      soldierNumber, salary, recruitedDate,
      yearsOfService, retirement_date
    
    FROM user_table ut, user_rank ur, regiment reg, forces frcs

    WHERE ut.rankID = ur.rankID AND ut.regimentID = reg.regimentID 
      AND reg.forceID = frcs.forceID AND userID = ${userId};`;

    connection.query(getUserProfileQuery, (err, userProfile) => {
        if (err) throw err;

        const getUserPensionData = `
        SELECT totalAmount, renewDate
        FROM pension
        WHERE userId = '${userId}';
        `;

        connection.query(getUserPensionData, (err, userPensionData) => {
            if (err) throw err;

            const getUserLoanData = `
            SELECT amount, interestRate, timePeriod, partonName
            FROM loan
            WHERE userId = '${userId}';
            `;

            connection.query(getUserLoanData, (err, userLoanData) => {
                if (err) throw err;

                const allUserData = {
                    profile: userProfile[0],
                    pensions: userPensionData,
                    loans: userLoanData
                }

                res.send(allUserData);
            });
        });
    });
});

module.exports = router;