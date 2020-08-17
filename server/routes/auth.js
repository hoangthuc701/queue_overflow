const router = require('express').Router();
<<<<<<< HEAD
const { sign_up, sign_in } = require('../controllers/auth');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validateError');
const { signinValidator, signupValidator } = require('../validators/auth');
router.post(
	'/signup',
	[
		body('email').isEmail().withMessage('This is not email.'),
		body('password')
			.isLength({ min: 7, max: undefined })
			.withMessage('Password must be at least 7 character.')
			.matches(/\d/)
			.withMessage('Password must contain number.')
			.matches(/[a-z]|[A-Z]/)
			.withMessage('Password must contain character.'),
		body('display_name')
			.isLength({ min: 5, max: 30 })
			.withMessage('Display name must be between 5 and 30 characters.')
			.matches(/[!@#$%^&*(),.?":{}|<>//]/)
			.withMessage('Display name must not have special characters.'),
	],
	validate,
	sign_up
);
=======
const { sign_up, sign_in, forgotPassword } = require('../controllers/auth');
const {
	signupValidator,
	signinValidator,
	forgotPasswordValidator,
} = require('../validators/auth');
>>>>>>> server/emailService

router.post('/signup', signupValidator, sign_up);
router.post('/signin', signinValidator, sign_in);
router.post('/forgot_password', forgotPasswordValidator, forgotPassword);

module.exports = router;
