const express = require('express');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

router.post('/registration/registryData', (req, res) => {
    const registryData = req.body.registryData;
    const userId = 0;

    if (registryData) {
        res.status(200).send({userId});
        // Write data to database later
    } else {
        res.status(400).send("Failed");
    }
});

module.exports = router;