require('dotenv').config();
const QuestionService = require('../services/question');
const TagService = require('../services/tag');
const CategoryService = require('../services/category');
const jwt = require('jsonwebtoken');

const response_format = require('../util/response_format');
exports.addNewQuestion = async (req, res) => {
	let token = req.header('authorization');
	if (token) {
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		} else
			return res.json(
				response_format.error('Token format is not right.')
			);
	} else {
		return res.json(response_format.error('User must sign in.'));
	}
	let author;
	// if (token) {
	// 	let user;
	// 	try{
	let user = jwt.verify(token, process.env.PRIVATE_KEY);
	author = user._id;
	// 	}
	// 	catch (error){
	// 		return res.json(response_format.error('Token invalid.'));
	// 	}
	// 	if (user.email) {
	// 		let user_db = await UserService.getUserByEmail(user.email);
	// 		if (user_db){
	// 			author = user._id;
	// 		}
	// 		else{
	// 			return res.json(response_format.error('User does not exist.'));
	// 		}
	// 	} else {
	// 		return res.json(response_format.error('Token is not right.'));
	// 	}
	// } else {
	// 	return res.json(response_format.error('Cannot know what user is.'));
	// }
	let question = {
		title: req.body.title,
		content: req.body.content,
		author: author,
		category: req.body.category,
		tags: req.body.tags,
	};
	let index_of_tag_name;
	for (
		index_of_tag_name = 0;
		index_of_tag_name < question.tags.length;
		index_of_tag_name++
	) {
		question.tags[index_of_tag_name] = question.tags[index_of_tag_name]
			.toUpperCase()
			.replace(/  +/g, ' ');
		let new_tag = await TagService.getByName({
			name: question.tags[index_of_tag_name],
		});
		if (new_tag) {
			question.tags[index_of_tag_name] = new_tag._id;
		} else {
			new_tag = await TagService.create({
				name: question.tags[index_of_tag_name],
			});
			question.tags[index_of_tag_name] = new_tag._id;
		}
	}
	try {
		let new_question = await QuestionService.create(question);
		if (new_question) {
			for (
				index_of_tag_name = 0;
				index_of_tag_name < new_question.tags.length;
				index_of_tag_name++
			) {
				await TagService.addNewQuestion({
					question_id: new_question._id,
					tag_id: new_question.tags[index_of_tag_name],
				});
			}
			return res.json(
				response_format.success('Add new question succeed.', {
					_id: new_question._id,
				})
			);
		} else {
			return res.json(response_format.error('Add new question failed'));
		}
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
exports.editQuestion = async (req, res) => {
	let token = req.header('authorization');
	if (token) {
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		} else
			return res.json(
				response_format.error('Token format is not right.')
			);
	} else {
		return res.json(response_format.error('User must sign in.'));
	}
	let user = jwt.verify(token, process.env.PRIVATE_KEY);
	let data = {
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		tags: req.body.tags,
		question_id: req.params.question_id,
	};
	for (
		let index_of_tag_name = 0;
		index_of_tag_name < data.tags.length;
		index_of_tag_name++
	) {
		data.tags[index_of_tag_name] = data.tags[index_of_tag_name]
			.toUpperCase()
			.replace(/  +/g, ' ');
		let new_tag = await TagService.getByName({
			name: data.tags[index_of_tag_name],
		});
		if (new_tag) {
			data.tags[index_of_tag_name] = new_tag._id;
		} else {
			new_tag = await TagService.create({
				name: data.tags[index_of_tag_name],
			});
			data.tags[index_of_tag_name] = new_tag._id;
		}
	}
	let question = await QuestionService.getById(data.question_id);
	if (user._id != question.author.toString()) {
		return res.json(
			response_format.error(
				'User does not have rights to edit this question.'
			)
		);
	}
	if (question) {
		let index_of_tag_name;
		for (
			index_of_tag_name = 0;
			index_of_tag_name < question.tags.length;
			index_of_tag_name++
		) {
			await TagService.removeQuestion({
				question_id: question._id,
				tag_id: question.tags[index_of_tag_name],
			});
		}
	} else return res.json(response_format.error('Question does not exist.'));
	try {
		question = await QuestionService.update(data);
		let index_of_tag_name;
		for (
			index_of_tag_name = 0;
			index_of_tag_name < question.tags.length;
			index_of_tag_name++
		) {
			await TagService.addNewQuestion({
				question_id: question._id,
				tag_id: question.tags[index_of_tag_name],
			});
		}
		return res.json(
			response_format.success('Edit question succeed.', {
				_id: question._id,
			})
		);
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
exports.deleteQuestion = async (req, res) => {
	let token = req.header('authorization');
	if (token) {
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		} else
			return res.json(
				response_format.error('Token format is not right.')
			);
	} else {
		return res.json(response_format.error('User must sign in.'));
	}
	let user = jwt.verify(token, process.env.PRIVATE_KEY);
	let question;
	try {
		question = await QuestionService.getById(req.params.question_id);
	} catch (error) {
		return res.json(response_format.error('Question does not exist.'));
	}
	if (!question)
		return res.json(response_format.error('Question does not exist.'));
	if (user._id != question.author.toString()) {
		return res.json(
			response_format.error(
				'User does not have rights to delete this question.'
			)
		);
	}
	try {
		question = await QuestionService.delete(req.params.question_id);
		if (question) {
			return res.json(
				response_format.success('Delete question succeed.', {
					_id: question._id,
				})
			);
		} else
			return res.json(
				response_format.error('Cannot delete this question.')
			);
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
exports.getQuestions = async (req, res) => {
	let questions;
	try {
		questions = await QuestionService.getQuestionsByFilter(
			parseInt(req.query.page, 10),
			10,
			req.query.filter
		);
		let questions_index;
		for (questions_index=0;questions_index<questions.questions.length;questions_index++){
			let tags_index;
			let tags_data=[];
			let tag_data;
			for (tags_index=0;tags_index<questions.questions[questions_index].tags.length;tags_index++){
				tag_data = await TagService.getById({tag_id: questions.questions[questions_index].tags[tags_index]});
				tags_data.push({tag_id: tag_data._id, name: tag_data.name});
			}
			questions.questions[questions_index].tags = tags_data;
			let category_data = await CategoryService.getById(questions.questions[questions_index].category);
			let res_category = {category_id: category_data[0]._id, name: category_data[0].name, color: category_data[0].color};
			questions.questions[questions_index].category = res_category;
		}
		return res.json(
			response_format.success('Get question succeed.', questions)
		);
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
