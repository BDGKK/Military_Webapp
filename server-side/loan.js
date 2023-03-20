const express = require("express");

const router = express.Router();
router.use('/loan', express.static('./client-side/loan-page'));

module.exports = router;