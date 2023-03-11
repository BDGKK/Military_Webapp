const express = require('express');

const router = express.Router();
router.use('/profile', express.static('./client-side/profile-page'));

// Sample User details from Database
const registryData = {
    userId: 333,
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    permanentAddress: {
      streetAddress: "123 Main St",
      city: "Anytown",
      province: "Ontario",
      postCode: "A1B 2C3"
    },
    temporaryAddress: {
      streetAddress: "456 High St",
      city: "Anycity",
      province: "Ontario",
      postCode: "X1Y 2Z3"
    },
    dateOfBirth: "1990-01-01",
    mobileNumber: "123-456-7890",
    landNumber: "987-654-3210",
    NIC: "1234567890V",
    emailAddr: "johndoe@example.com",
    password: "mypassword",
    force: "Army",
    regiment: "1st Infantry Regiment",
    rank: "Sergeant",
    soldierNumber: "123456",
    salary: 50000.00,
    recruitedDate: "2010-01-01",
    yearsOfService: 12,
    retiredDate: "2030-01-01"
}
// Get data from database later

router.get('/profile/:id', (req, res) => {
    res.send({registryData});
});

module.exports = router;