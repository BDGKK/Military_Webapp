const express = require('express');
const connection = require('../database/connection');

const router = express.Router();
router.use('/profile', express.static('./client-side/profile-page'));

router.get('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Edit Select query to get force, rank and regiment names - use their ids for now
    connection.query(`SELECT * FROM user_table WHERE user_ID=${id}`, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length < 1) {
        return res.status(404).send({error: 'User not found'});
      }
      let userData = result[0];

      // Edit JSON Object when database changes
      userData = {
        userId: userData.user_ID,
        firstName: userData.first_Name,
        lastName: userData.last_name,
        gender: 'male',//userData.gender, Change when gender is added
        permanentAddress: userData.permanent_address,
        permanentPostCode: userData.postal_code_permanent,
        temporaryAddress: userData.temporary_address,
        temporaryPostCode: userData.postal_code_permanent,
        dateOfBirth: userData.DOB,
        mobileNumber: userData.mobile_phone,
        landNumber: userData.phone_land,
        NIC: userData.NIC,
        emailAddr: userData.email,
        password: userData.pword,
        force: "Army", //Use force_name instead of force_id
        regiment: "1st Infantry Regiment", //Use regiment_name when regiment is added to table
        rank: "Sergeant",//Use rank_name instead of rank_id
        soldierNumber: userData.solider_number,
        salary: userData.salary,
        recruitedDate: userData.recruited_date,
        yearsOfService: userData.years_of_service,
        retiredDate: userData.retirment_date
      };

      res.status(200).send(userData);
    });
});

module.exports = router;