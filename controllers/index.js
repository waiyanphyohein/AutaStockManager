const router = require('express').Router();

router.use('/chart',require('./chart'));
router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/profile', require('./profile'));
router.use('/', require('./home'));
router.use('/table',require('./table'));
router.use('/form',require('./form'));
router.use('/logout',require('./logout'));
module.exports = router;