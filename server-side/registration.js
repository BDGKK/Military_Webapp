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

            // Putting addresses as a single string
            const permanent_address = registryData.permanentAddress.streetAddress + ','
                + registryData.permanentAddress.city + ',' + registryData.permanentAddress.province;
            const temporary_address = registryData.temporaryAddress.streetAddress + ','
                + registryData.temporaryAddress.city + ',' + registryData.temporaryAddress.province;
            
            // Edit Query when changes are made
            const registryDataInsertQuery = 
                'INSERT INTO user_table(user_ID, first_Name, last_name, permanent_address,'+
                    'postal_code_permanent, temporary_address, postal_code_temporary, DOB,'+
                    'mobile_phone, phone_land, NIC, email, solider_number, pword, salary,'+
                    'recruited_date, years_of_service, retirment_date, rank_id, force_id)'+
                `VALUES (${userId}, '${registryData.firstName}', '${registryData.lastName}',
                    '${permanent_address}', ${registryData.permanentAddress.postCode},
                    '${temporary_address}', ${registryData.temporaryAddress.postCode},
                    '${registryData.dateOfBirth}', '${registryData.mobileNumber}',
                    '${registryData.landNumber}', '${registryData.NIC}', '${registryData.emailAddr}',
                    ${registryData.soldierNumber}, '${registryData.password}', ${registryData.salary},
                    '${registryData.recruitedDate}',
                    '${registryData.yearsOfService}', '${registryData.retiredDate}',
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