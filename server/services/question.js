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
		// filter - 0: newest, 1: oldest, 2: category, 3: tags
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
	static async getByAuthorId(offset, limit, author_id) {
		let count = await QuestionModel.countDocuments({ author: author_id });
		let questions;
		try {
			questions = await QuestionModel.find({ author: author_id })
				.lean()
				.skip((offset - 1) * limit)
				.limit(limit)
				.exec();
		} catch (error) {
			throw new Error('Cannot get questions.');
		}
		return { questions: questions, totalCount: count };
	}
	static async likeQuestion(question_id, user_id, type) {
		let question;
		let vote = 'none';
		try {
			question = await QuestionModel.findOne({ _id: question_id }).exec();
			if (question) {
				let like_index;
				let is_like = false;
				let is_dislike = false;
				for (
					like_index = 0;
					like_index < question.rating_detail.like_users.length;
					like_index++
				) {
					if (
						question.rating_detail.like_users[
							like_index
						].toString() === user_id
					) {
						is_like = true;
						break;
					}
				}
				for (
					like_index = 0;
					like_index < question.rating_detail.dislike_users.length;
					like_index++
				) {
					if (
						question.rating_detail.dislike_users[
							like_index
						].toString() === user_id
					) {
						is_dislike = true;
						break;
					}
				}
				if (parseInt(type, 10) === 1) {
					if (!is_like && !is_dislike) {
						vote = 'like';
						question.rating_detail.like_users.push(user_id);
						question.save();
					} else if (is_like) {
						vote = 'none';
						question.rating_detail.like_users.pull(user_id);
						question.save();
					} else if (is_dislike) {
						vote = 'like';
						question.rating_detail.dislike_users.pull(user_id);
						question.rating_detail.like_users.push(user_id);
						question.save();
					}
				} else {
					if(!is_like&&!is_dislike){
						vote = 'dislike';
						question.rating_detail.dislike_users.push(user_id);
						question.save();
					}
					else if(is_like){
						vote='dislike';
						question.rating_detail.dislike_users.push(user_id);
						question.rating_detail.like_users.pull(user_id);
						question.save();
					}
					else if(is_dislike){
						vote='none';
						question.rating_detail.dislike_users.pull(user_id);
						question.save();
					}
				}
			} else {
				throw new Error('There is no question.');
			}
		} catch (error) {
			throw new Error('You can not rate.');
		}
		return {
			totalLike: question.rating_detail.like_users.length,
			totalDislike: question.rating_detail.dislike_users.length,
			vote: vote,
		};
	}
	static async getQuestionsByCategory(offset, limit, category_id){
		let count = await QuestionModel.countDocuments({ category: category_id });
		let questions;
		try {
			questions = await QuestionModel.find({ category: category_id })
				.lean()
				.skip((offset - 1) * limit)
				.limit(limit)
				.exec();
		} catch (error) {
			throw new Error('Cannot get questions.');
		}
		return { questions: questions, totalCount: count };
	}
	static async getQuestionsByTag(offset, limit, tag_id){
		let count = await QuestionModel.countDocuments({ tags: tag_id });
		let questions;
		try {
			questions = await QuestionModel.find({ tags: tag_id })
				.lean()
				.skip((offset - 1) * limit)
				.limit(limit)
				.exec();
		} catch (error) {
			throw new Error('Cannot get questions.');
		}
		return { questions: questions, totalCount: count };
	}
	static async removeAnswer(question_id, answer_id){
		let question;
		try {
			question = QuestionModel.update(
				{ _id: question_id },
				{ $pull: { answers: answer_id } }
			).exec();
		} catch (error) {
			throw new Error('Cannot remove question from tag.');
		}
		return question;
	}
}

module.exports = QuestionService;
