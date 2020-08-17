const router = require('express').Router();
const { sign_up, sign_in, forgotPassword } = require('../controllers/auth');
const {
	signupValidator,
	signinValidator,
	forgotPasswordValidator,
} = require('../validators/auth');

router.post('/signup', signupValidator, sign_up);
router.post('/signin', signinValidator, sign_in);
router.post('/forgot_password', forgotPasswordValidator, forgotPassword);

module.exports = router;
