const { body } = require('express-validator');
const { validate } = require('../middlewares/validateError');

exports.signupValidator = [
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
		.matches(/[^!@#$%^&*(),.?":{}|<>//]/)
		.withMessage('Display name must not have special characters.'),
	validate,
];

exports.signinValidator = [
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('This is not email.'),
	body('password').notEmpty().withMessage('Password is required'),
	validate,
];

exports.forgotPasswordValidator = [
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('This is not email.'),
	validate,
];
