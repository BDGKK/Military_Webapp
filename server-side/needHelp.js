const express = require("express");

const router = express.Router();
router.use('/need-help', express.static('./client-side/need-help-page'));

module.exports = router;