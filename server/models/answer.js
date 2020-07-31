const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	content: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	question: {
		type: mongoose.Types.ObjectId,
		ref: 'Question',
		required: true,
	},
});

module.exports = mongoose.model('Answer', schema);
