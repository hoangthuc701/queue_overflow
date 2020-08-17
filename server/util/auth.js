const response_format = require('./response_format');

exports.verifyUser = (req, res, user_id) => {
	if (req.res.user._id !== user_id) {
		res.status(401).json(
			response_format.error('You can not access this infomation')
		);
		return false;
	}
	return true;
};
