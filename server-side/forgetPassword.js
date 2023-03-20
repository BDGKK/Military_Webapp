const express = require("express");

const router = express.Router();
router.use('/forget-password', express.static('./client-side/forget-password-page'));

module.exports = router;