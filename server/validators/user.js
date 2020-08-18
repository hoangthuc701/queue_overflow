const { body } = require('express-validator');
const { validate } = require('../middlewares/validateError');

exports.userValidator = [
	body('display_name')
		.optional({ nullable: true })
		.isLength({ min: 5, max: 30 })
		.withMessage('Display name must be between 5 and 30 characters.')
		.matches(/[^!@#$%^&*(),.?":{}|<>//]/)
		.withMessage('Display name must not have special characters.'),
	body('password')
		.optional({ nullable: true })
		.isLength({ min: 7, max: undefined })
		.withMessage('Password must be at least 7 character.')
		.matches(/\d/)
		.withMessage('Password must contain number.')
		.matches(/[a-z]|[A-Z]/)
		.withMessage('Password must contain character.'),
	body('description')
		.optional({ nullable: true })
		.isLength({ min: 0, max: 500 })
		.withMessage('Description must be less than 500 character.'),
	validate,
];
