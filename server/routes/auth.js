const router = require('express').Router();
const {sign_up, sign_in} = require('../controllers/auth');

router.post('/users', sign_up);

router.post('/signin', sign_in);

module.exports = router;
