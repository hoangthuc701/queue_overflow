const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
	},
	question: {
		type: mongoose.Types.ObjectId,
		ref: 'Question',
	},
	receiver: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	is_read: {
		type: Boolean,
	},
});

module.exports = mongoose.model('Notification', schema);
