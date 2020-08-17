require('dotenv').config();
const UserService = require('../services/user');
const response_format = require('../util/response_format');
const { getHashedPassword } = require('../util/password');
const { verifyUser } = require('../util/auth');

exports.getUserInfoById = async (req, res) => {
	const user_id = req.params.user_id;
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
	const user_id = req.params.user_id;
	if (!verifyUser(req, res, user_id)) return;
	let user = await UserService.getUserById(user_id);
	if (!user) {
		res.json(response_format.error('User is not exist.'));
		return;
	}
	const hashed_password = await getHashedPassword(req.body.password);
	let user_info = {
		hashed_password,
		display_name: req.body.display_name,
	};

	user = await UserService.update(user_id, user_info);

	user_info = {
		_id: user._id,
		email: user.email,
		display_name: user.display_name,
	};

	res.json(response_format.success('Update succeed.', user_info));
};
