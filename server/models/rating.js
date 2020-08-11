const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	message: {
		type: mongoose.Types.ObjectId,
	},
	message_type: {
		type: String,
		enum: ['question', 'answer'],
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	vote: {
		type: String,
		enum: ['like', 'dislike'],
	},
});

module.exports = mongoose.model('Rating', schema);
