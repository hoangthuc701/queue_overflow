const QuestionModel = require('../models/question');

class QuestionService {
	static async create({
		title,
		content,
		category,
		author,
		tags,
		attach_file,
	}) {
		let new_question;
		try {
			new_question = new QuestionModel({
				title,
				content,
				category,
				author,
				tags,
				attach_file,
			});
			await new_question.save();
		} catch (error) {
			throw new Error('Cannot create question');
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
				question.title = title;
				question.content = content;
				question.category = category;
				question.tags = tags;
				console.log('tuanquen2',question);
				const check = await question.save();
				console.log('tuanquen',check);
			}
		} catch (error) {
			throw new Error('Cannot edit question.');
		}
		return question;
	}
	static async delete(question_id) {
		try {
			const result = await QuestionModel.deleteOne({ _id: question_id });
			if (result.deletedCount>0) return true;
			return false;
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
