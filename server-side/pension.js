const express = require("express");

const router = express.Router();
router.use('/pension', express.static('./client-side/pension-page'));

module.exports = router;