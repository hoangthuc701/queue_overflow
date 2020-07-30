const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	message: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	vote: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model('Answer', schema);
