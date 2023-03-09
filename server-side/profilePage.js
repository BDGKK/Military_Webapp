const express = require('express');

const router = express.Router();
router.use('/profile', express.static('./client-side/profile-page'));

module.exports = router;