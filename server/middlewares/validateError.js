const { validationResult } = require('express-validator');
const response_format = require('../util/response_format');

exports.validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json(response_format.error(errors.errors[0].msg));
	}
	next();
};
