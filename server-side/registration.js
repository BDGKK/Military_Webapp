const express = require('express');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

router.post('/registration/registryData', (req, res) => {
    //registryData = req.body.registryData;
    //res.send("registryData");
    //registryData ? res.status(200).send(registryData) : res.status(400).send("Posted Failed");
});

module.exports = router;