const express = require("express");

const router = express.Router();
router.use('/user-log', express.static('./client-side/user-log-page'));

module.exports = router;