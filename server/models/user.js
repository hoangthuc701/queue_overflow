const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hashed_password: {
		type: String,
		required: true,
	},
	display_name: {
		type: String,
		required: true,
	},
	description: String,
	avatar: String,
	followed_questions: [{ type: mongoose.Types.ObjectId, ref: 'Question' }],
});

module.exports = mongoose.model('User', schema);
