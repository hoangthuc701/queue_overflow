const AnswerModel = require('../models/answer');
const QuestionModel = require('../models/question');

class AnswerService {
	static async create({ content, author, question }) {
		let new_answer;
		try {
			new_answer = new AnswerModel({ content, author, question });
			await new_answer.save();
			let update_question = await QuestionModel.findOne({_id: question});
			update_question.answers.push(new_answer._id);
			await update_question.save();
		} catch (error) {
			throw new Error('Cannot create new answer.');
		}
		return new_answer;
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
}

module.exports = AnswerService;
