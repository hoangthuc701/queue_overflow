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
	receiver: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	is_read: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model('Notification', schema);
