const connection = require('../database/connection');
const columnData = require('../columnData');
const express = require('express');
const encryptPassword = require('./side-functions/encryptPassword');
const isRegistryEmailSent = require('./side-functions/sendRegistryEmail');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

router.post('/registration/registryData', (req, res) => {
    const registryData = req.body.registryData;

    if (registryData) {
        connection.query('SELECT MAX(userID) as max_id FROM user_table', async (err, result) => {
            if (err) throw err;

            const {
                firstName, lastName, gender, permanentAddress,
                temporaryAddress, dateOfBirth, mobileNumber,
                landNumber, NIC, emailAddr, password, soldierNumber,
                salary, recruitedDate, yearsOfService, retiredDate,
                rankID, regimentID
            } = registryData;

            // Increment highest userid for new user
            let userId = result[0].max_id;
            userId = userId === null ? 1 : parseInt(userId) + 1;

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

            const duplicatePrimaryKeyErrorRegex = /(ER_DUP_ENTRY)/;

            connection.query(registryDataInsertQuery, (err) => {
                if (err) {
                    if (duplicatePrimaryKeyErrorRegex.test(err.message)) {
                        res.status(400).send({ message: "Email is already in use. Please use a different Gmail address" });
                        return;
                    } else {
                        throw err;
                    }
                }

                if (!isRegistryEmailSent(emailAddr)) {
                    res.status(400).send({ message: "Error with verifying gmail address" });
                    return;
                }

                console.log(`Added User ${userId}`);
                res.status(200).send({ userId });
            });
        });

    } else {
        res.status(400).send({ message: "Registration Failed" });
    }
});

// This API contains the ranks, regiments, cities and provinces to be shown in the registry page
router.get('/registration/columnData', (req, res) => {
    const { ranks, regiments, SLCities, SLProvinces } = columnData;
    res.send({ ranks, regiments, SLCities, SLProvinces });
});

module.exports = router;