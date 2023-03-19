const express = require("express");

const router = express.Router();
router.use('/forget-password', express.static('./client-side/forget_password-page'));

module.exports = router;