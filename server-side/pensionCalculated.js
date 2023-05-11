const express = require('express');

const router = express.Router();

router.get('/pension-calculated', (req, res, next) => {
    !req.session.userId ? res.redirect('/user-log') : next();
});
router.use('/pension-calculated', express.static('./client-side/pension-page-calculated'));

module.exports = router;