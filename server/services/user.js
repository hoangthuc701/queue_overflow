const UserModel = require('../models/user');
const mongoose = require('mongoose');

class UserService {
	static async create({ email, hashed_password, display_name }) {
		let new_user;
		try {
			new_user = new UserModel({ email, hashed_password, display_name });
			await new_user.save();
		} catch (error) {
			console.error(error);
			throw new Error('Cannot create new account.');
		}
		return new_user;
	}

	static async getUserByEmail(email) {
		let user;
		try {
			user = await UserModel.findOne({ email });
		} catch (error) {
			console.error(error);
			throw new Error('Cannot get account.');
		}

		return user;
	}

	static async getUserById(id) {
		let user;
		if (mongoose.Types.ObjectId.isValid(id)) {
			try {
				user = await UserModel.findById(id);
			} catch (error) {
				console.error(error);
				throw new Error('Cannot get account.');
			}
		}

		return user;
	}

	static async update(id, { hashed_password, display_name }) {
		let user;
		try {
			user = await UserModel.findById(id);
			if (user) {
				user.hashed_password = hashed_password
					? hashed_password
					: user.hashed_password;
				user.display_name = display_name
					? display_name
					: user.display_name;
				await user.save();
			}
		} catch (error) {
			console.error(error);
			throw new Error('Cannot update account.');
		}
		return user;
	}
}

module.exports = UserService;
