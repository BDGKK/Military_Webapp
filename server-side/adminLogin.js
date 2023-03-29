const express = require("express");

const router = express.Router();
router.use('/adminLogin', express.static('./client-side/admin-login-page'));

module.exports = router;