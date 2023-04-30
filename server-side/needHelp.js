const express = require("express");

const router = express.Router();

// Prevent user from accessing page if their login details aren't saved
router.get('/need-help', (req, res, next) => {
    !req.session.userId ? res.redirect('/user-log') : next();
});
router.use('/need-help', express.static('./client-side/need-help-page'));

module.exports = router;