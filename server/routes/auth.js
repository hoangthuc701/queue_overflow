const router = require('express').Router();
const {
	sign_up,
	sign_in,
	sendResetPasswordMail,
	resetPassword,
	activateAccount,
} = require('../controllers/auth');
const {
	signupValidator,
	signinValidator,
	sendResetPasswordMailValidator,
	resetPasswordValidator,
} = require('../validators/auth');

router.post('/signup', signupValidator, sign_up);
router.post('/signin', signinValidator, sign_in);
router.post(
	'/send_reset_password_email',
	sendResetPasswordMailValidator,
	sendResetPasswordMail
);
router.post('/reset_password', resetPasswordValidator, resetPassword);
router.post('/activate_account', activateAccount);

module.exports = router;
