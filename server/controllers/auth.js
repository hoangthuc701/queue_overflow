require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require('../services/user');
const EmailService = require('../services/email');
const {
	getHashedPassword,
	comparePassword,
	generateRandomPassword,
} = require('../util/password');
const { createPasswordMail, createVerificationMail } = require('../util/email');
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
		if (!new_user) {
			res.json(response_format.error('Sign up failed'));
			return;
		}

		//send verification mail to user
		const hashed_code = await getHashedPassword(new_user._id);
		const link = process.env.VERIFICATION_PAGE_URL + '/' + hashed_code;
		EmailService.send(createVerificationMail(new_user.email, link));

		res.json(
			response_format.success(
				'Sign up success. The account activation mail has been sent to your email',
				{
					_id: new_user._id,
					email: new_user.email,
					display_name: new_user.display_name,
				}
			)
		);
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
	if (!user.verified) {
		return res.json(response_format.error('The account is not activated.'));
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

exports.forgotPassword = async (req, res) => {
	const email = req.body.email;
	const user = await UserService.getUserByEmail(email);
	if (!user) {
		res.json(response_format.error('Email is not exist.'));
		return;
	}
	const password = generateRandomPassword();
	const hashed_password = await getHashedPassword(password);

	await UserService.update(user._id, { hashed_password });
	const mail = createPasswordMail(email, user.display_name, password);
	EmailService.send(mail);
	res.json(
		response_format.success('Your new password has send to your email.', {})
	);
};
