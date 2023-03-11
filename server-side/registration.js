const connection = require('../database/connection');
const express = require('express');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

router.post('/registration/registryData', (req, res) => {
    // Get user data from api
    // Get max_id from user table - increment by 1 to get new id no.
    // Use new_id and insert data into database
    // send new_id to registration page
    const registryData = req.body.registryData;

    if (registryData) {
        connection.query('SELECT COUNT(user_ID) as max_id FROM user_table', (err, result) => {
            if (err) throw err;
            let userId = result[0].max_id;
            userId = userId === null ? 1 : userId+1;

            const permanent_address = registryData.permanentAddress.streetAddress + ','
                + registryData.permanentAddress.city + ',' + registryData.permanentAddress.province;
            const temporary_address = registryData.temporaryAddress.streetAddress + ','
                + registryData.temporaryAddress.city + ',' + registryData.temporaryAddress.province;
            
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
                );`
            ;
            
            connection.query(registryDataInsertQuery, (err) => {
                if (err) throw err;
                console.log("Data written");
            });
        });
        
    } else {
        res.status(400).send("Failed");
    }
});

module.exports = router;