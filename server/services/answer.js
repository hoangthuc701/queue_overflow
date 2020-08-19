const AnswerModel = require('../models/answer');
const QuestionModel = require('../models/question');
const QuestionService = require('./question');

class AnswerService {
	static async create({ content, author, question }) {
		let new_answer;
		try {
			new_answer = new AnswerModel({ content, author, question });
			await new_answer.save();
			new_answer = await AnswerModel.findOne({ _id: new_answer._id })
				.lean()
				.exec();
			let update_question = await QuestionModel.findOne({
				_id: question,
			}).exec();
			update_question.answers.push(new_answer._id);
			await update_question.save();
		} catch (error) {
			throw new Error('Cannot create new answer.');
		}
		return new_answer;
	}
	static async delete(answer_id) {
		try {
			let answer = await AnswerModel.findOne({ _id: answer_id });
			if (answer) {
				let question = await QuestionModel.findOne({ _id: answer.question });
				question.answers.pull(answer_id);
				if (question.best_answer) {
					if (answer_id == question.best_answer.toString())
						question.best_answer = undefined;
				}
				await question.save();
			}
			const result = await AnswerModel.deleteOne({ _id: answer_id });
			if (result.deletedCount > 0) {
				return true;
			}
			return false;
		} catch (error) {
			throw new Error('Cannot delete answer.');
		}
	}
	static async getById(answer_id) {
		let answer;
		try {
			answer = await AnswerModel.findOne({ _id: answer_id }).exec();
		} catch (error) {
			throw new Error('Cannot get answer.');
		}
		return answer;
	}
	static async getByQuestionId(question_id) {
		let answers;
		try {
			answers = await AnswerModel.find({ question: question_id }).lean().exec();
		} catch (error) {
			throw new Error('Cannot get answers for this question.');
		}
		return answers;
	}
	static async likeAnswer(answer_id, user_id, type) {
		let answer;
		let data;
		try {
			answer = await AnswerModel.findOne({ _id: answer_id }).exec();
			data = await QuestionService.rate(answer, user_id, type);
		} catch (error) {
			throw new Error('You can not rate.');
		}
		return data;
	}
}

module.exports = AnswerService;
