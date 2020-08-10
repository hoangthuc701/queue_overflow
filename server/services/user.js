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

	static async getUserByEmail(email)
	{
		let user = await UserModel.findOne({email});
		return user;
	}
}

module.exports = UserService;
