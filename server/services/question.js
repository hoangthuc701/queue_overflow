const QuestionModel = require('../models/question');

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

	static async update({
		title,
		content,
		category,
		tags,
		question_id,
	}) {
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
			if (result.deletedCount > 0) return true;
			return false;
		} catch (error) {
			throw new Error('Cannot delete question.');
		}
	}
	static async getById(question_id) {
		let question;
		try {
			question = await QuestionModel.findOne({ _id: question_id }).exec();
		} catch (error) {
			throw new Error('Cannot get question.');
		}
		return question;
	}
	static async getQuestionsByFilter(offset, limit, filter) {
		// filter - 0: newest, 1: oldest, 2: category, 3: tags
		let count = await QuestionModel.countDocuments();
		let questions;
		switch (filter) {
		case 'newest':
			try {
				questions = await QuestionModel.find().lean().sort('-created_time')
					.skip((offset-1) * limit)
					.limit(limit)
					.exec();
			} catch (error) {
				throw new Error('Cannot get questions.');
			}
			break;
		case 'oldest':
			try {
				questions = await QuestionModel.find().lean()
					.sort('created_time')
					.skip((offset-1) * limit)
					.limit(limit)
					.exec();
			} catch (error) {
				throw new Error('Cannot get questions.');
			}
			break;
		case 'category':
			try {
				questions = await QuestionModel.find().lean()
					.sort({ category: -1 })
					.skip((offset-1) * limit)
					.limit(limit)
					.exec();
			} catch (error) {
				throw new Error('Cannot get questions.');
			}
			break;
		default:
			throw new Error('Not a filter.');
		}
		return {questions: questions, totalCount: count};
	}
	static async getByAuthorId(offset, author_id) {
		let questions;
		try {
			questions = await QuestionModel.find({ author: author_id })
				.skip(offset * 10)
				.limit(10)
				.exec();
		} catch (error) {
			throw new Error('Cannot get questions.');
		}
		return questions;
	}
}

module.exports = QuestionService;
