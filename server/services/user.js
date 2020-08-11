const UserModel = require('../models/user');

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
		let user = await UserModel.findOne({ email });
		return user;
	}

	static async getUserById(id) {
		let user = await UserModel.findById(id);
		return user;
	}

	static async update(id, { email, hashed_password, display_name }) {
		try {
			let user = await UserModel.findById(id);
			user.email = email;
			user.hashed_password = hashed_password;
			user.display_name = display_name;
			await user.save();
		} catch {
			return false;
		}
		return true;
	}
}

module.exports = UserService;
