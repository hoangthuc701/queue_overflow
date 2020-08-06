require('dotenv').config();
const UserService = require('../services/user');
const { getHashedPassword, comparePassword } = require('../util/password');
const jwt = require('jsonwebtoken');
exports.sign_up = async (req, res) => {
	let email_user = await UserService.getUserByEmail(req.body.email);
	if (email_user) {
		res.json({
			message:'',
			error: 'Email is already existed.',
			data:{}
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
				error:'',
				data:{
					_id:new_user._id,
					email:new_user.email,
					display_name:new_user.display_name
				}
			});
		} else {
			res.json({
				message:'',
				error: 'Sign up failed',
				data:{}
			});
		}
	} catch (error) {
		res.status(500).json({
			message:'',
			error: 'Oh no, something went wrong.',
			data:{}
		});
	}
};

exports.sign_in = async (req, res) => {
	let user = await UserService.getUserByEmail(req.body.email);
	if (!user) {
		res.json({
			message: '',
			error: 'Email is not existed.',
			data:{}
		});
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
		res.json({
			message: 'Request succeed',
			error:'',
			data: {
				token,
				user: user_info,
			},
		});
	} else {
		res.json({
			message:'',
			error:'Email and password are not matched.',
			data:{}
		});
	}
};
