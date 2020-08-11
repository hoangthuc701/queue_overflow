require('dotenv').config();
const UserService = require('../services/user');
const response_format = require('../util/response_format');

exports.getUserInfoById = async (req, res) => {
	const user_id = req.param.id;
	let user = await UserService.getUserById(user_id);
	if (!user) {
		res.json(response_format.error('User is not exist.'));
		return;
	}

	let user_info = {
		_id: user._id,
		email: user.email,
		display_name: user.display_name,
	};

	res.json(response_format.success('Request succeed.', user_info));
};

exports.updateUserInfo = async (req, res) => {
	const user_id = req.param.id;
	let user = await UserService.getUserById(user_id);
	if (!user) {
		res.json(response_format.error('User is not exist.'));
		return;
	}

	let user_info = {
		email: req.body.email,
		hashed_password: req.body.hashed_password,
		display_name: req.body.display_name,
	};

	user = await UserService.update(user_id, user_info);

	user_info = {
		_id: user._id,
		email: user.email,
		display_name: user.display_name,
	};

	res.json(response_format.success('Request succeed.', user_info));
};
