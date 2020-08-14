const router = require('express').Router();
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
<<<<<<< HEAD
			.isLength({ min: 5, max: 30 })
			.withMessage('Display name must be between 5 and 30 characters.')
			.matches(/[!@#$%^&*(),.?":{}|<>//]/)
			.withMessage('Display name must not have special characters.'),
=======
			.matches(/^[_A-z0-9]*((-|\s)[_A-z0-9]+)*$/)
			.withMessage(
				'Display name must not have special characters or too many spaces between words.'
			),
>>>>>>> server/signup
	],
	validate,
	sign_up
);

router.post('/signup', signupValidator, sign_up);

router.post('/signin', signinValidator, sign_in);

module.exports = router;
