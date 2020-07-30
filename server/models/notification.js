const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	question: {
		type: mongoose.Types.ObjectId,
		ref: 'Question',
		required: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'Question',
		required: true,
	},
	is_read: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model('Notification', schema);
