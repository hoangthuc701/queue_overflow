require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require('../services/user');
const { getHashedPassword, comparePassword } = require('../util/password');
const response_format = require('../util/response_format');

exports.sign_up = async (req, res) => {
	let email_user = await UserService.getUserByEmail(req.body.email);
	if (email_user) {
		return res.json(response_format.error('Email is exist.'));
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
			res.json(
				response_format.success('Sign up success.', {
					_id: new_user._id,
					email: new_user.email,
					display_name: new_user.display_name,
				})
			);
		} else {
			res.json(response_format.error('Sign up failed'));
		}
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};

exports.sign_in = async (req, res) => {
	let user = await UserService.getUserByEmail(req.body.email);
	if (!user) {
		return res.json(response_format.error('Email is not existed.'));
	}
	let password_check = await comparePassword(
		req.body.password,
		user.hashed_password
	);
	if (password_check) {
		//Login Success
		const user_info = {
			_id: user._id,
			email: user.email,
			display_name: user.display_name,
		};
		const token = jwt.sign(user_info, process.env.PRIVATE_KEY, {
			expiresIn: '1h',
		});
		res.json(
			response_format.success('Sign in succeed', {
				token,
				user: user_info,
			})
		);
	} else {
		res.json(response_format.error('Email and password are not matched.'));
	}
};
