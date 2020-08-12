const AnswerModel = require('../models/answer');

class AnswerService {
	static async create({ content, author, question }) {
		let new_answer;
		try {
			new_answer = new AnswerModel({ content, author, question });
			await new_answer.save();
		} catch (error) {
			throw new Error('Cannot create new answer.');
		}
		return new_answer;
	}
	static async getByQuestionId(question_id) {
		let answers;
		try {
			answers = AnswerModel.find({ question: question_id }).exec();
		} catch (error) {
			throw new Error('Cannot get answers for this question.');
		}
		return answers;
	}
}

module.exports = AnswerService;
