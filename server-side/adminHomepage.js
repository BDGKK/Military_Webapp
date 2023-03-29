const express = require("express");

const router = express.Router();
router.use('/adminHomepage', express.static('./client-side/admin-home-page'));

module.exports = router;