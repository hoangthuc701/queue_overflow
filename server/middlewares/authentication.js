const express_jwt = require('express-jwt');
require('dotenv').config();

exports.auth = express_jwt({
	secret: process.env.PRIVATE_KEY,
	algorithms: ['HS256'],
	resultProperty: 'user',
});
