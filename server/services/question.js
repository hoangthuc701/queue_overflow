const QuestionModel = require('../models/question');

class QuestionService {
	static async create({
		title,
		content,
		category_id,
		author_id,
		tag_ids,
		attach_file,
	}) {
		let new_question;
		try {
			new_question = new QuestionModel({
				title,
				content,
				category_id,
				author_id,
				tag_ids,
				attach_file,
			});
			await new_question.save();
		} catch (error) {
			throw new Error('Cannot create question');
		}
		return new_question;
	}

	static async update({ title, content, category_id, tag_ids, question_id }) {
		let question;
		try {
			question = await QuestionModel.findOne({
				_id: question_id,
			}).exec();
			if (question) {
				question.title = title;
				question.content = content;
				question.category_id = category_id;
				question.tag_ids = tag_ids;
				await question.save();
			}
		} catch (error) {
			throw new Error('Cannot edit question.');
		}
		return question;
	}
	static async delete(question_id) {
		try {
			await QuestionModel.deleteOne({ _id: question_id });
		} catch (error) {
			throw new Error('Cannot delete question.');
		}
	}
	static async getById(question_id) {
		let question;
		try {
			question = await QuestionModel.findOne({
				_id: question_id,
			}).exec();
		} catch (error) {
			throw new Error('Cannot get question.');
		}
		return question;
	}
	static async getAllQuestion() {
		let questions;
		try {
			questions = await QuestionModel.find({});
		} catch (error) {
			throw new Error('Cannot get question.');
		}
		return questions;
	}
	static async getByAuthorId(author_id) {
		let questions;
		try {
			questions = await QuestionModel.find({ author_id });
		} catch (error) {
			throw new Error('Cannot get question.');
		}
		return questions;
	}
}

module.exports = QuestionService;
