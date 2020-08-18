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
		description: user.description,
	};

	res.json(response_format.success('Request succeed.', user_info));
};

exports.updateUserbyId = async (req, res) => {
	const user_id = req.params.user_id;
	if (!verifyUser(req, res, user_id)) return;
	let user = await UserService.getUserById(user_id);
	if (!user) {
		res.json(response_format.error('User is not exist.'));
		return;
	}
	if (
		!(
			req.body.password ||
			req.body.description ||
			req.body.display_name ||
			req.file
		)
	) {
		res.json(response_format.error('Need at least 1 field to update.'));
		return;
	}
	let hashed_password;
	if (req.body.password) {
		hashed_password = await getHashedPassword(req.body.password);
	}
	let user_info = {
		hashed_password,
		description: req.body.description,
		display_name: req.body.display_name,
	};
	user = await UserService.update(user_id, user_info);
	user_info = {
		_id: user._id,
		email: user.email,
		display_name: user.display_name,
		description: user.description,
	};
	res.json(response_format.success('Update succeed.', user_info));
};
