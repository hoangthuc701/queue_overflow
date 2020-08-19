const QuestionModel = require('../models/question');
const AnswerModel = require('../models/answer');

class QuestionService {
	static async create({ title, content, author, category, tags }) {
		let new_question;
		try {
			new_question = new QuestionModel({
				title,
				content,
				author,
				category,
				tags,
			});
			await new_question.save();
		} catch (error) {
			console.error(error);
			throw new Error('Cannot create new question.');
		}
		return new_question;
	}

	static async update({ title, content, category, tags, question_id }) {
		let question;
		try {
			question = await QuestionModel.findOne({
				_id: question_id,
			}).exec();
			if (question) {
				if (title) {
					question.title = title;
				}
				if (content) {
					question.content = content;
				}
				if (category) {
					question.category = category;
				}
				if (tags) {
					question.tags = tags;
				}
				await question.save();
			}
		} catch (error) {
			throw new Error('Cannot edit question.');
		}
		return question;
	}
	static async delete(question_id) {
		try {
			const result = await QuestionModel.deleteOne({ _id: question_id });
			if (result.deletedCount > 0) {
				await AnswerModel.deleteMany({ question: question_id });
				return true;
			}
			return false;
		} catch (error) {
			throw new Error('Cannot delete question.');
		}
	}
	static async getById(question_id) {
		let question;
		try {
			question = await QuestionModel.findOne({ _id: question_id })
				.lean()
				.exec();
		} catch (error) {
			throw new Error('Cannot get question.');
		}
		return question;
	}
	static async getQuestionsByFilter(offset, limit, filter) {
		let count = await QuestionModel.countDocuments();
		let questions;
		switch (filter) {
		case 'newest':
			try {
				questions = await QuestionModel.find()
					.lean()
					.sort('-created_time')
					.skip((offset - 1) * limit)
					.limit(limit)
					.exec();
			} catch (error) {
				throw new Error('Cannot get questions.');
			}
			break;
		case 'oldest':
			try {
				questions = await QuestionModel.find()
					.lean()
					.sort('created_time')
					.skip((offset - 1) * limit)
					.limit(limit)
					.exec();
			} catch (error) {
				throw new Error('Cannot get questions.');
			}
			break;
		case 'category':
			try {
				questions = await QuestionModel.find()
					.lean()
					.sort({ category: -1 })
					.skip((offset - 1) * limit)
					.limit(limit)
					.exec();
			} catch (error) {
				throw new Error('Cannot get questions.');
			}
			break;
		default:
			throw new Error('Not a filter.');
		}
		return { questions: questions, totalCount: count };
	}
	static async likeQuestion(question_id, user_id, type) {
		let question;
		let data;
		try {
			question = await QuestionModel.findOne({ _id: question_id }).exec();
			data = await QuestionService.rate(question, user_id, type);
		} catch (error) {
			throw new Error('You can not rate.');
		}
		return data;
	}
	static async getQuestionsByOtherId(offset, limit, object_id, type) {
		let count = await QuestionModel.countDocuments({ [type]: object_id });
		let questions;
		try {
			questions = await QuestionModel.find({ [type]: object_id })
				.lean()
				.skip((offset - 1) * limit)
				.limit(limit)
				.exec();
		} catch (error) {
			throw new Error('Cannot get questions by ' + type + '.');
		}
		return { questions: questions, totalCount: count };
	}
	static rate(data, user_id, type) {
		if (!data) return null;
		let vote = 'none';
		let like_index;
		let is_like = false;
		let is_dislike = false;
		for (
			like_index = 0;
			like_index < data.rating_detail.like_users.length;
			like_index++
		) {
			if (
				data.rating_detail.like_users[like_index].toString() === user_id
			) {
				is_like = true;
				break;
			}
		}
		for (
			like_index = 0;
			like_index < data.rating_detail.dislike_users.length;
			like_index++
		) {
			if (
				data.rating_detail.dislike_users[like_index].toString() ===
				user_id
			) {
				is_dislike = true;
				break;
			}
		}
		type = parseInt(type, 10);
		if (!is_like && !is_dislike && type === 1) {
			vote = 'like';
			data.rating_detail.like_users.push(user_id);
			data.save();
		} else if (is_like && type === 1) {
			vote = 'none';
			data.rating_detail.like_users.pull(user_id);
			data.save();
		} else if (is_dislike && type === 1) {
			vote = 'like';
			data.rating_detail.dislike_users.pull(user_id);
			data.rating_detail.like_users.push(user_id);
			data.save();
		} else if (!is_like && !is_dislike && type === 0) {
			vote = 'dislike';
			data.rating_detail.dislike_users.push(user_id);
			data.save();
		} else if (is_like && type === 0) {
			vote = 'dislike';
			data.rating_detail.dislike_users.push(user_id);
			data.rating_detail.like_users.pull(user_id);
			data.save();
		} else if (is_dislike && type === 0) {
			vote = 'none';
			data.rating_detail.dislike_users.pull(user_id);
			data.save();
		}
		return {
			totalLike: data.rating_detail.like_users.length,
			totalDislike: data.rating_detail.dislike_users.length,
			vote: vote,
		};
	}
	static async chooseBestAnswer(question_id, answer_id) {
		let question;
		let answer;
		try {
			answer = await AnswerModel.findOne({ _id: answer_id }).exec();
			if (!answer) throw new Error('There is no answer.');
			question = await QuestionModel.findOne({ _id: question_id }).exec();
			if (!question.best_answer) question.best_answer = answer_id;
			else {
				if (question.best_answer.toString() === answer_id)
					question.best_answer = undefined;
				else question.best_answer = answer_id;
			}
			await question.save();
		} catch (error) {
			throw new Error(error.message);
		}
		return question;
	}
	static async searchQuestion() {
		const data = await QuestionModel.aggregate([
			{
				$lookup:{
					from:'users',
					localField: 'author',
					foreignField: '_id',
					as:'author'
				}
			},
			{
				$lookup:{
					from:'tags',
					localField: 'tags',
					foreignField: '_id',
					as:'tags'
				}
			},
			{
				$lookup:{
					from:'categories',
					localField: 'category',
					foreignField: '_id',
					as:'category'
				}
			},
			{
				'$unwind': '$category'
			},
			{
				'$unwind': '$author'
			},
			{
				$project:{
					_id:1,
					rating_detail:{
						totalLike: {  $size: '$rating_detail.like_users' },
						totalDislike: {  $size: '$rating_detail.dislike_users' } 
					},
					tags:{
						$map:{
							'input':'$tags',
							as: 'tag',
							in:{
								'tag_id':'$$tag._id',
								'name':'$$tag.name'
							}
						}
					},
					title:1,
					content:1,
					author:{
						author_id: '$author._id',
						display_name:1,
						avatar:1
					},
					answers:1,
					category:{
						category_id: '$category._id',
						name:1,
						color:1
					},
					created_time: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$created_time'
						}
					},
					updated_time:{
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$updated_time'
						}
					}
				}
			}
		]);
		return data;
	}
}

module.exports = QuestionService;
