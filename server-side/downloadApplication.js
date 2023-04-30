const express = require("express");

const router = express.Router();

// Prevent user from accessing page if their login details aren't saved
router.get('/download-application', (req, res, next) => {
    !req.session.userId ? res.redirect('/user-log') : next();
});
router.use('/download-application', express.static('./client-side/download-application-page'));

module.exports = router;