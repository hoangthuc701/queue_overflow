const { body } = require('express-validator');

exports.answerValidator = [
	body('content')
		.isLength({ min: 5, max: 10000 })
		.withMessage('Content must be between 5 and 10000 characters.'),
];