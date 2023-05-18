const express = require('express');
const router = express.Router();

router.get('/loan-calculated', (req, res, next) => {
    !req.session.userId ? res.redirect('/user-log') : next();
});
router.use('/loan-calculated', express.static('./client-side/loan-page-calculated'));

module.exports = router;