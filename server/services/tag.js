const TagModel = require('../models/tag');

class TagService {
	static async create({ name }) {
		let new_tag;
		try {
			new_tag = new TagModel({ name });
			await new_tag.save();
		} catch (error) {
			console.error(error);
			throw new Error('Cannot create new tag.');
		}
		return new_tag;
	}
	static async addNewQuestion({ question_id, tag_id }) {
		let tag;
		try {
			tag = TagModel.update(
				{ _id: tag_id },
				{ $push: { questions: question_id } }
			).exec();
		} catch (error) {
			throw new Error('Cannot add new question to tag.');
		}
		return tag;
	}
	static async removeQuestion({ question_id, tag_id }) {
		let tag;
		try {
			tag = TagModel.update(
				{ _id: tag_id },
				{ $pull: { questions: question_id } }
			).exec();
		} catch (error) {
			throw new Error('Cannot remove question from tag.');
		}
		return tag;
	}
	static async getById({ tag_id }) {
		let tag;
		try {
			tag = TagModel.findOne({ _id: tag_id }).exec();
		} catch (error) {
			throw new Error('Cannot get tag by Id.');
		}
		return tag;
	}
	static async getByName({ name }) {
		let tag;
		try {
			tag = TagModel.findOne({ name: name }).exec();
		} catch (error) {
			throw new Error('Cannot get tag.');
		}
		return tag;
	}
}

module.exports = TagService;
