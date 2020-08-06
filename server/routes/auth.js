const router = require('express').Router();
const { sign_up, sign_in } = require('../controllers/auth');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validateError');
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
			.isAlphanumeric()
			.withMessage('Display name must be only number and character.'),
	],
	validate,
	sign_up
);

router.post('/signin', sign_in);

module.exports = router;
