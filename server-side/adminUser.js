const express = require("express");

const router = express.Router();
router.use('/adminUser', express.static('./client-side/admin-user-page'));

module.exports = router;