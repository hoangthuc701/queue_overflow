require('dotenv').config();
const QuestionService = require('../services/question');
const response_format = require('../util/response_format');

exports.create = async (req, res) => {
	let new_question = {
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		author: req.body.author,
		tags: req.body.tags,
		attach_file: req.body.attach_file,
	};
	try {
		let new_question_created = await QuestionService.create(new_question);
		if (new_question_created) {
			res.json(
				response_format.success('Question Added.', {
					_id: new_question_created._id,
					title: new_question_created.title,
					content: new_question_created.content,
					category: new_question_created.category,
					author: new_question_created.author,
					tags: new_question_created.tags,
					attach_file: new_question_created.attach_file,
				})
			);
		} else {
			res.json(response_format.error('Cannot Create Question'));
		}
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
