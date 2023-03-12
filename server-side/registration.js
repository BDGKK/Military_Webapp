const connection = require('../database/connection');
const express = require('express');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

router.post('/registration/registryData', (req, res) => {
    const registryData = req.body.registryData;

    if (registryData) {
        connection.query('SELECT MAX(user_ID) as max_id FROM user_table', (err, result) => {
            // Increment highest userid for new user
            if (err) throw err;
            let userId = result[0].max_id;
            userId = userId === null ? 1 : userId+1;

            const { firstName, lastName, permanentAddress, temporaryAddress, dateOfBirth,
                mobileNumber, landNumber, NIC, emailAddr, soldierNumber, password, salary,
                recruitedDate, yearsOfService, retiredDate, rank, regiment} = registryData;

            // Putting addresses as a single string
            const permanent_address = permanentAddress.streetAddress + ','
                + permanentAddress.city + ',' + permanentAddress.province;
            const temporary_address = temporaryAddress.streetAddress + ','
                + temporaryAddress.city + ',' + temporaryAddress.province;
            
            // Edit Query when to store the rank, force and regiment IDs
            const registryDataInsertQuery = 
                `INSERT INTO user_table (
                    userID, firstName, lastName, gender, permanentAddress, permanentPostCode,
                    temporaryAddress, temporaryPostCode, dateOfBirth, mobileNumber, landNumber,
                    NIC, emailAddr, solidierNumber, salary, recruitedDate, yearsOfService,
                    retirement_date, rankID, regimentID
                ) VALUES (${userId}, '${firstName}', '${lastName}',
                    '${permanent_address}', ${permanentAddress.postCode},
                    '${temporary_address}', ${temporaryAddress.postCode},
                    '${dateOfBirth}', '${mobileNumber}',
                    '${landNumber}', '${NIC}', '${emailAddr}',
                    ${soldierNumber}, '${password}', ${salary},
                    '${recruitedDate}',
                    '${yearsOfService}', '${retiredDate}',
                    ${12}, ${10}
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

module.exports = router;