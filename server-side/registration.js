const express = require('express');

// Initialize the Router and display the frontend at the root URL (localhost:<port>/)
const router = express.Router();
router.use('/registration', express.static('./client-side/registration-page'));

module.exports = router;