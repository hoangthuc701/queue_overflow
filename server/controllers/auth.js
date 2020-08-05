require('dotenv').config();
const UserService = require('../services/user');
const { getHashedPassword, comparePassword } = require('../util/password');
const jwt = require('jsonwebtoken');
exports.sign_up = async (req, res) => {
	let email_user = await UserService.getUserByEmail(req.body.email);
	if (email_user) {
		res.json({
			error: 'Email is already existed.',
		});
	}
	let hashed_password = await getHashedPassword(req.body.password);
	let user = {
		email: req.body.email,
		hashed_password,
		display_name: req.body.display_name,
	};
	try {
		let new_user = await UserService.create(user);
		if (new_user) {
			res.json({
				message: 'Sign up success.',
			});
		} else {
			res.json({
				error: 'Oh no, something went wrong.',
			});
		}
	} catch (error) {
		res.status(500).json({
			error: 'Oh no, something went wrong.',
		});
	}
};

exports.sign_in = async (req, res) => {
	let user = await UserService.getUserByEmail(req.body.email);
	if (!user) {
		res.json({
			message: 'Email is not existed.',
		});
	}
	let password_check = await comparePassword(
		req.body.password,
		user.hashed_password
	);
	if (password_check) {
		//Login Success
		const token = jwt.sign({ mess: 'hello' }, process.env.PRIVATE_KEY, {
			expiresIn: '1h',
		});
		res.json({
			token,
			user: {
				_id: user._id,
				email: user.email,
				display_name: user.display_name,
			},
		});
	} else {
		res.json('Email and password is not matched.');
	}
};
