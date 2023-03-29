const connection = require('../database/connection');
const columnData = require('../columnData');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

const encryptPassword = async(password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

router.post('/registration/registryData', (req, res) => {
    const registryData = req.body.registryData;
    
    if (registryData) {
        connection.query('SELECT MAX(userID) as max_id FROM user_table', async(err, result) => {
            // Increment highest userid for new user
            if (err) throw err;
            let userId = result[0].max_id;
            userId = userId === null ? 1 : parseInt(userId)+1;

            const {
                firstName, lastName, gender, permanentAddress,
                temporaryAddress, dateOfBirth, mobileNumber,
                landNumber, NIC, emailAddr, password, soldierNumber,
                salary, recruitedDate, yearsOfService, retiredDate,
                rankID, regimentID
            } = registryData;

            const encryptedPassword = await encryptPassword(password);

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
                    NIC, emailAddr, password, soldierNumber, salary,
                    recruitedDate, yearsOfService, retirement_date,
                    rankID, regimentID
                ) VALUES (
                    '${userId}', '${firstName}', '${lastName}', '${gender}',
                    '${permanentFullAddress}', ${permanentAddress.postCode},
                    '${temporaryFullAddress}', ${temporaryAddress.postCode},
                    '${dateOfBirth}', '${mobileNumber}', '${landNumber}',
                    '${NIC}', '${emailAddr}', '${encryptedPassword}', '${soldierNumber}', ${salary},
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

// This API contains the ranks, regiments, cities and provinces to be shown in the registry page
router.get('/registration/columnData', (req, res) => {
    const { ranks, regiments, SLCities, SLProvinces } = columnData;
    res.send({ranks, regiments, SLCities, SLProvinces});
});

module.exports = router;