const { body, validationResult } = require('express-validator');

exports.signupValidator = [
	body('email').isEmail().withMessage('Not email.'),
	(req, res, next) => {
		var errorValidation = validationResult(req);
		if (errorValidation) {
			return res.status(500).json({
				error: errorValidation.errors[0].msg,
			});
		}
		next();
	},
];
