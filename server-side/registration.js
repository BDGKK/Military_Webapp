const express = require('express');

const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

module.exports = router;