const router = require('express').Router();
const { sign_up, sign_in } = require('../controllers/auth');
const { signupValidator } = require('../validators/auth');

router.post('/signup', signupValidator, sign_up);

router.post('/signin', sign_in);

module.exports = router;
