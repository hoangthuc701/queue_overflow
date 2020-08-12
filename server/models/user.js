const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	email: {
		type: String,
	},
	hashed_password: {
		type: String,
	},
	display_name: {
		type: String,
	},
	description: String,
	avatar: String,
	notifications: [{ type: mongoose.Types.ObjectId, ref: 'Notification' }],
	followed_questions: [{ type: mongoose.Types.ObjectId, ref: 'Question' }],
});

module.exports = mongoose.model('User', schema);
