const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema(
	{
		content: {
			type: String,
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		question: {
			type: mongoose.Types.ObjectId,
			ref: 'Question',
		},
		rating_detail: {
			like_users: [
				{
					type: mongoose.Types.ObjectId,
					ref: 'User',
				},
			],
			dislike_users: [
				{
					type: mongoose.Types.ObjectId,
					ref: 'User',
				},
			],
		},
	},
	{
		timestamps: {
			createdAt: 'created_time',
			updatedAt: 'updated_time',
		},
	}
);

module.exports = mongoose.model('Answer', schema);
