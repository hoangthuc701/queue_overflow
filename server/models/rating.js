const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	message: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	message_type: {
		type: String,
		enum: ['question', 'answer'],
		required: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	vote: {
		type: String,
		enum: ['like', 'dislike'],
		required: true,
	},
});

module.exports = mongoose.model('Rating', schema);
