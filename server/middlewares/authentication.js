const express_jwt = require('express-jwt');

exports.auth = express_jwt({
	secret: process.env.PRIVATE_KEY,
	algorithms: ['HS256'],
	resultProperty: 'user',
});
