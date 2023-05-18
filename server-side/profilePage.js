const express = require('express');
const connection = require('../database/connection');

const router = express.Router();

// Prevent user from accessing page if their login details aren't saved
router.get('/profile', (req, res, next) => {
  !req.session.userId ? res.redirect('/user-log') : next();
});
router.use('/profile', express.static('./client-side/profile-page'));

router.get('/profile/userData', (req, res) => {
  const id = req.session.userId;

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
      AND reg.forceID = frcs.forceID AND userID = ${id};`;

  connection.query(getUserProfileQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length < 1) {
      return res.status(404).send({ error: 'User not found' });
    }

    let {
      userID, firstName, lastName, gender, permanentAddress,
      permanentPostCode, temporaryAddress, temporaryPostCode,
      dateOfBirth, mobileNumber, landNumber, NIC, emailAddr,
      forceName, regimentName, rankName, soldierNumber, salary,
      recruitedDate, yearsOfService, retirement_date
    } = result[0];

    const userData = {
      userId: userID,
      firstName,
      lastName,
      gender,
      permanentAddress,
      permanentPostCode,
      temporaryAddress,
      temporaryPostCode,
      dateOfBirth,
      mobileNumber,
      landNumber,
      NIC,
      emailAddr,
      force: forceName,
      regiment: regimentName,
      rank: rankName,
      soldierNumber,
      salary,
      recruitedDate,
      yearsOfService,
      retirement_date,
    };

    res.status(200).send(userData);
  });
});

module.exports = router;