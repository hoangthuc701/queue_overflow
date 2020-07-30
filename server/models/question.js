const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	answer: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Answer',
		},
	],
	best_answer: {
		type: mongoose.Types.ObjectId,
		ref: 'Answer',
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	followed_users: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
	category: {
		type: mongoose.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	tag: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Tag',
			required: true,
		},
	],
});

module.exports = mongoose.model('Question', schema);
