const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		answers: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Answer',
			},
		],
		best_answer: {
			type: mongoose.Types.ObjectId,
			ref: 'Answer',
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		followers: [
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
		tags: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Tag',
				required: true,
			},
		],
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

module.exports = mongoose.model('Question', schema);
