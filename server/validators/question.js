const { body } = require('express-validator');

exports.questionValidator = [
	body('title')
		.isLength({ min: 5, max: 200 })
		.withMessage('Title must be between 5 and 200 characters.'),
	body('content')
		.isLength({ min: 5, max: 1000 })
		.withMessage('Content must be between 5 and 1000 characters.'),
	body('tags.*')
		.isLength({ min: 1, max: 20 })
		.withMessage('Tags must be between 1 and 20 characters.'),
];


