const express_jwt = require('express-jwt');

const response_format = require('../util/response_format');

exports.auth = express_jwt({
	secret: process.env.PRIVATE_KEY,
	algorithms: ['HS256'],
	resultProperty: 'user',
});

exports.verifyUser = (req, res, next) => {
	if (req.res.user._id !== req.user_id) {
		res.status(401).json(
			response_format.error('You can not access this infomation')
		);
		return;
	}
	next();
};
