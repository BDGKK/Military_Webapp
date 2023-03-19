const express = require("express");

const router = express.Router();
router.use('./download-application', express.static('./client-side/download-application-page'));

module.exports = router;