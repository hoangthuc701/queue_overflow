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
}
