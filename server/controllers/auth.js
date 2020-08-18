require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require('../services/user');
const EmailService = require('../services/email');
const { getHashedPassword, comparePassword } = require('../util/password');
const { createPasswordMail, createVerificationMail } = require('../util/email');
const response_format = require('../util/response_format');
const {
	generateCode,
	verifyCode,
	resetPasswordCryptr,
	activationCryptr,
} = require('../util/account');

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
		const code = await generateCode(new_user._id, activationCryptr);
		const link = process.env.VERIFICATION_PAGE_URL + '/' + code;
		EmailService.send(
			createVerificationMail(new_user.email, new_user.display_name, link)
		);

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
			expiresIn: '5h',
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

exports.sendResetPasswordMail = async (req, res) => {
	const email = req.body.email;
	const user = await UserService.getUserByEmail(email);
	if (!user) {
		res.json(response_format.error('The email is not exist.'));
		return;
	}
	if (!user.verified) {
		res.json(
			response_format.error(
				'This user is not activated. Please activate your account before you change password'
			)
		);
		return;
	}
	const code = generateCode(user._id, resetPasswordCryptr);
	const link = process.env.RESET_PASSWORD_PAGE_URL + '/' + code;
	const mail = createPasswordMail(email, user.display_name, link);
	EmailService.send(mail);
	res.json(
		response_format.success('Reset password mail has send to your email.')
	);
};

exports.resetPassword = async (req, res) => {
	const code = req.body.code;
	const password = req.body.password;

	const code_data = verifyCode(code, resetPasswordCryptr);
	console.log(code_data);
	if (!code_data) {
		res.json(response_format.error('This link is invalid.'));
		return;
	}
	if (code_data.expired) {
		res.json(response_format.error('This link has expired.'));
		return;
	}
	const user_id = code_data.id;
	const user = await UserService.getUserById(user_id);
	if (!user) {
		res.json(
			response_format.error(
				'The user you want to change password for is not exist.'
			)
		);
		return;
	}

	let hashed_password = await getHashedPassword(password);
	user.hashed_password = hashed_password;
	await user.save();
	res.json(response_format.success('The password has been changed'));
};

exports.activateAccount = async (req, res) => {
	const code = req.body.code;
	const code_data = verifyCode(code, activationCryptr);
	if (!code_data) {
		res.json(response_format.error('This link is invalid.'));
		return;
	}

	const user_id = code_data.id;
	const user = await UserService.getUserById(user_id);
	if (!user) {
		res.json(
			response_format.error('The user you want to activate is not exist.')
		);
		return;
	}
	user.verified = true;
	await user.save();

	res.json(response_format.success('Your account has been activated'));
};
