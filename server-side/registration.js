const connection = require('../database/connection');
const columnData = require('../columnData');
const express = require('express');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

router.post('/registration/registryData', (req, res) => {
    const registryData = req.body.registryData;

    if (registryData) {
        connection.query('SELECT MAX(userID) as max_id FROM user_table', (err, result) => {
            // Increment highest userid for new user
            if (err) throw err;
            let userId = result[0].max_id;
            userId = userId === null ? 1 : parseInt(userId)+1;

            const {
                firstName, lastName, gender, permanentAddress, temporaryAddress,
                dateOfBirth, mobileNumber, landNumber, NIC, emailAddr, soldierNumber,
                salary, recruitedDate, yearsOfService, retiredDate, rankID, regimentID
            } = registryData;

            // Putting addresses as single strings
            const permanentFullAddress = permanentAddress.streetAddress + ','
                + permanentAddress.city + ',' + permanentAddress.province;
            const temporaryFullAddress = temporaryAddress.streetAddress + ','
                + temporaryAddress.city + ',' + temporaryAddress.province;
            
            const registryDataInsertQuery = 
                `INSERT INTO user_table (
                    userID, firstName, lastName, gender,
                    permanentAddress, permanentPostCode,
                    temporaryAddress, temporaryPostCode,
                    dateOfBirth, mobileNumber, landNumber,
                    NIC, emailAddr, soldierNumber, salary,
                    recruitedDate, yearsOfService, retirement_date,
                    rankID, regimentID
                ) VALUES (
                    '${userId}', '${firstName}', '${lastName}', '${gender}',
                    '${permanentFullAddress}', ${permanentAddress.postCode},
                    '${temporaryFullAddress}', ${temporaryAddress.postCode},
                    '${dateOfBirth}', '${mobileNumber}', '${landNumber}',
                    '${NIC}', '${emailAddr}', '${soldierNumber}', ${salary},
                    '${recruitedDate}', ${yearsOfService}, '${retiredDate}',
                    '${rankID}', '${regimentID}'
                );`;
            
            connection.query(registryDataInsertQuery, (err) => {
                if (err) throw err;
                console.log(`Added User ${userId}`);
                res.status(200).send({userId});
            });
        });
        
    } else {
        res.status(400).send("Failed");
    }
});

router.get('/registration/columnData', (req, res) => {
    const { ranks, regiments, SLCities, SLProvinces } = columnData;
    res.send({ranks, regiments, SLCities, SLProvinces});
});

module.exports = router;