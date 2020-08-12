const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	name: {
		type: String,
	},
	questions: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Question',
		},
	],
});

module.exports = mongoose.model('Tag', schema);
