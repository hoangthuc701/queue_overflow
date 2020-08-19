require('dotenv').config();
const QuestionService = require('../services/question');
const TagService = require('../services/tag');
const CategoryService = require('../services/category');
const UserService = require('../services/user');
const mongoose = require('mongoose');
const { verifyUser } = require('../util/auth');
const jwt = require('jsonwebtoken');

const response_format = require('../util/response_format');
const AnswerService = require('../services/answer');
const LIMIT = 10;
exports.addNewQuestion = async (req, res) => {
	let author;
	let user = req.res.user;
	author = user._id;
	let question = {
		title: req.body.title,
		content: req.body.content,
		author: author,
		category: req.body.category,
		tags: req.body.tags,
	};
	let tag_to_id = await tagNameToId(question.tags);
	question.tags = tag_to_id;
	try {
		let new_question = await QuestionService.create(question);
		if (new_question) {
			await Promise.all(
				new_question.tags.map(async (element) => {
					await TagService.addNewQuestion({
						question_id: new_question._id,
						tag_id: element,
					});
				})
			);
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
	checkObjectId(res, req.params.question_id);
	let data = {
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		tags: req.body.tags,
		question_id: req.params.question_id,
	};
	let question = await QuestionService.getById(data.question_id);
	if (!question)
		return res
			.status(500)
			.json(response_format.error('There is no question to edit.'));
	const is_verify = verifyUser(req, res, question.author.toString());
	if (!is_verify) return;
	let tag_to_id = await tagNameToId(data.tags);
	data.tags = tag_to_id;
	await Promise.all(
		question.tags.map(async (element) => {
			await TagService.removeQuestion({
				question_id: question._id,
				tag_id: element,
			});
		})
	);
	try {
		question = await QuestionService.update(data);
		await Promise.all(
			question.tags.map(async (element) => {
				await TagService.addNewQuestion({
					question_id: question._id,
					tag_id: element,
				});
			})
		);
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
	checkObjectId(res, req.params.question_id);
	let question;
	try {
		question = await QuestionService.getById(req.params.question_id);
	} catch (error) {
		return res.json(response_format.error('Question does not exist.'));
	}
	if (!question)
		return res.json(response_format.error('Question does not exist.'));
	const is_verify = verifyUser(req, res, question.author.toString());
	if (!is_verify) return;
	try {
		const is_delete = await QuestionService.delete(req.params.question_id);
		if (is_delete) {
			await Promise.all(
				question.tags.map(async (element) => {
					await TagService.removeQuestion({
						question_id: question._id,
						tag_id: element,
					});
				})
			);
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
			LIMIT,
			req.query.filter
		);
		if (!questions.questions)
			return res
				.status(500)
				.json(response_format.error('There is no question.'));
		questions = await displayQuestions(questions);
		return res.json(
			response_format.success('Get question succeed.', questions)
		);
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
exports.getQuestionById = async (req, res) => {
	checkObjectId(res, req.params.question_id);
	let token = req.header('Authorization');
	let user;
	if (token) {
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
			user = jwt.verify(token, process.env.PRIVATE_KEY);
		} else
			return res.json(
				response_format.error('Token format is not right.')
			);
	}
	let question;
	let answers;
	try {
		question = await QuestionService.getById(req.params.question_id);
		if (!question)
			return res
				.status(500)
				.json(response_format.error('There is no question.'));
		answers = await AnswerService.getByQuestionId(req.params.question_id);
		let answer_index;
		for (answer_index = 0; answer_index < answers.length; answer_index++) {
			if (!question.best_answer)
				answers[answer_index].isBestAnswer = false;
			else {
				if (
					answers[answer_index]._id.toString() ==
					question.best_answer.toString()
				)
					answers[answer_index].isBestAnswer = true;
				else answers[answer_index].isBestAnswer = false;
			}
			let author_data = await UserService.getUserById(
				answers[answer_index].author
			);
			answers[answer_index].author = {
				author_id: author_data._id,
				name: author_data.display_name,
				avatar: author_data.avatar,
			};
			answers[answer_index].rating_detail.totalLike =
				answers[answer_index].rating_detail.like_users.length;
			answers[answer_index].rating_detail.totalDislike =
				answers[answer_index].rating_detail.dislike_users.length;
			if (token) {
				answers[answer_index].vote = 'none';
				if (
					answers[answer_index].rating_detail.like_users.some(
						(user_id) => user_id.toString() == user._id
					)
				) {
					answers[answer_index].vote = 'like';
				}
				if (
					answers[answer_index].rating_detail.dislike_users.some(
						(user_id) => user_id.toString() == user._id
					)
				) {
					answers[answer_index].vote = 'dislike';
				}
			} else answers[answer_index].vote = 'none';
		}
		question.answers = answers;
		let author_data = await UserService.getUserById(question.author);
		question.author = {
			author_id: author_data._id,
			name: author_data.display_name,
			avatar: author_data.avatar,
		};
		let category_data = await CategoryService.getById(question.category);
		question.category = {
			category_id: category_data._id,
			name: category_data.name,
			color: category_data.color,
		};
		question.created_time = question.created_time
			.toISOString()
			.split('T')[0];
		question.updated_time = question.updated_time
			.toISOString()
			.split('T')[0];
		let tags_data = [];
		let tag_index;
		for (tag_index = 0; tag_index < question.tags.length; tag_index++) {
			let tag_data = await TagService.getById({
				tag_id: question.tags[tag_index],
			});
			tags_data.push({ tag_id: tag_data._id, name: tag_data.name });
		}
		question.tags = tags_data;
		question.rating_detail.totalLike =
			question.rating_detail.like_users.length;
		question.rating_detail.totalDislike =
			question.rating_detail.dislike_users.length;
		if (token) {
			question.vote = 'none';
			if (
				question.rating_detail.like_users.some(
					(user_id) => user_id.toString() == user._id
				)
			) {
				question.vote = 'like';
			}
			if (
				question.rating_detail.dislike_users.some(
					(user_id) => user_id.toString() == user._id
				)
			) {
				question.vote = 'dislike';
			}
		} else question.vote = 'none';
		return res.json(
			response_format.success('Get question succeed.', question)
		);
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
exports.getQuestionByAuthorId = async (req, res) => {
	checkObjectId(res, req.params.user_id);
	const is_verify = verifyUser(req, res, req.params.user_id);
	if (!is_verify) return;
	try {
		let questions = await QuestionService.getQuestionsByOtherId(
			req.query.page,
			LIMIT,
			req.params.user_id,
			'author'
		);
		if (!questions.questions)
			return res
				.status(500)
				.json(response_format.error('There is no question.'));
		let question_index;
		for (
			question_index = 0;
			question_index < questions.questions.length;
			question_index++
		) {
			let category_data = await CategoryService.getById(
				questions.questions[question_index].category
			);
			questions.questions[question_index].category = {
				category_id: category_data._id,
				name: category_data.name,
				color: category_data.color,
			};
			questions.questions[
				question_index
			].created_time = questions.questions[question_index].created_time
				.toISOString()
				.split('T')[0];
			questions.questions[
				question_index
			].updated_time = questions.questions[question_index].updated_time
				.toISOString()
				.split('T')[0];
		}
		return res.json(
			response_format.success('Get questions succeed.', questions)
		);
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
exports.likeQuestion = async (req, res) => {
	let user = req.res.user;
	try {
		let question = await QuestionService.likeQuestion(
			req.body.question_id,
			user._id,
			req.body.type
		);
		if (!question)
			return res.json(response_format.error('No question exists.'));
		return res.json(
			response_format.success('Like question succeed.', question)
		);
	} catch (error) {
		console.log(error);
		res.status(500).json(response_format.error(error.message));
	}
};
exports.getQuestionsByCategoryId = async (req, res) => {
	checkObjectId(res, req.params.category_id);
	let questions;
	let category;
	try {
		category = await CategoryService.getById(req.params.category_id);
		questions = await QuestionService.getQuestionsByOtherId(
			req.query.page,
			LIMIT,
			req.params.category_id,
			'category'
		);
		if (!questions.questions)
			return res
				.status(500)
				.json(response_format.error('There is no question.'));
		questions = await displayQuestions(questions);
		questions.category_info = category;
		return res.json(
			response_format.success('Get questions succeed.', questions)
		);
	} catch (error) {
		console.log(error);
		res.status(500).json(response_format.error(error.message));
	}
};
exports.getQuestionsByTagId = async (req, res) => {
	checkObjectId(res, req.params.tag_id);
	let questions;
	let tag;
	try {
		tag = await TagService.getById({ tag_id: req.params.tag_id });
		questions = await QuestionService.getQuestionsByOtherId(
			req.query.page,
			LIMIT,
			req.params.tag_id,
			'tags'
		);
		if (!questions.questions)
			return res
				.status(500)
				.json(response_format.error('There is no question.'));
		questions = await displayQuestions(questions);
		questions.tag_info = { tag_id: tag._id, name: tag.name };
		return res.json(
			response_format.success('Get questions succeed.', questions)
		);
	} catch (error) {
		console.log(error);
		res.status(500).json(response_format.error(error.message));
	}
};
exports.chooseBestAnswer = async (req, res) => {
	checkObjectId(res, req.params.question_id);
	checkObjectId(res, req.params.answer_id);
	let question;
	try {
		question = await QuestionService.getById(req.params.question_id);
		if (!question)
			return res.json(response_format.error('There is no question.'));
		let answer_index;
		let is_in_question = false;
		for (
			answer_index = 0;
			answer_index < question.answers.length;
			answer_index++
		) {
			if (
				question.answers[answer_index].toString() ==
				req.params.answer_id
			) {
				is_in_question = true;
				break;
			}
		}
		if (!is_in_question)
			return res.json(
				response_format.error(
					'This answer does not belong to this question.'
				)
			);
		const is_verify = verifyUser(req, res, question.author.toString());
		if (!is_verify) return;
		question = await QuestionService.chooseBestAnswer(
			req.params.question_id,
			req.params.answer_id
		);
		let answers = await AnswerService.getByQuestionId(
			req.params.question_id
		);
		for (answer_index = 0; answer_index < answers.length; answer_index++) {
			if (!question.best_answer)
				answers[answer_index].isBestAnswer = false;
			else {
				if (
					answers[answer_index]._id.toString() ==
					question.best_answer.toString()
				)
					answers[answer_index].isBestAnswer = true;
				else answers[answer_index].isBestAnswer = false;
			}

			let author_data = await UserService.getUserById(
				answers[answer_index].author
			);
			answers[answer_index].author = {
				author_id: author_data._id,
				name: author_data.display_name,
				avatar: author_data.avatar,
			};
			answers[answer_index].rating_detail.totalLike =
				answers[answer_index].rating_detail.like_users.length;
			answers[answer_index].rating_detail.totalDislike =
				answers[answer_index].rating_detail.dislike_users.length;
			answers[answer_index].created_time = answers[
				answer_index
			].created_time
				.toISOString()
				.split('T')[0];
			answers[answer_index].updated_time = answers[
				answer_index
			].updated_time
				.toISOString()
				.split('T')[0];
			if (is_verify) {
				answers[answer_index].vote = 'none';
				if (
					answers[answer_index].rating_detail.like_users.some(
						(user_id) => user_id.toString() == req.res.user._id
					)
				) {
					answers[answer_index].vote = 'like';
				}
				if (
					answers[answer_index].rating_detail.dislike_users.some(
						(user_id) => user_id.toString() == req.res.user._id
					)
				) {
					answers[answer_index].vote = 'dislike';
				}
			} else answers[answer_index].vote = 'none';
		}
		return res.json(
			response_format.success('Get questions succeed.', answers)
		);
	} catch (error) {
		console.log(error);
		res.status(500).json(response_format.error(error.message));
	}
};

exports.search = async (req, res) => {
	let  content  = req.query.content||'';
	let data = await QuestionService.searchQuestion();
	content = content.toLowerCase();

	const matched = (tag) => tag.name.toLowerCase().search(content) >= 0;
	data = data.filter((item) => {
		if (item.title.toLowerCase().search(content) >= 0) return true;
		if (item.category.name.toLowerCase().search(content) >= 0) return true;
		if (item.tags.some(matched)) return true;
		return false;
	});
	return res.json(
		response_format.success('Search questions succeed.', { questions:data, totalCount: data.length,search_info:{ keyword: content}  }
		)
	);
};

async function displayQuestions(data) {
	let question_index;
	for (
		question_index = 0;
		question_index < data.questions.length;
		question_index++
	) {
		data.questions[question_index].rating_detail.totalLike =
			data.questions[question_index].rating_detail.like_users.length;
		data.questions[question_index].rating_detail.totalDislike =
			data.questions[question_index].rating_detail.dislike_users.length;
		let tag_index;
		let tags_data = [];
		for (
			tag_index = 0;
			tag_index < data.questions[question_index].tags.length;
			tag_index++
		) {
			let tag_data = await TagService.getById({
				tag_id: data.questions[question_index].tags[tag_index],
			});
			tags_data.push({ tag_id: tag_data._id, name: tag_data.name });
		}
		data.questions[question_index].tags = tags_data;
		let author_data = await UserService.getUserById(
			data.questions[question_index].author
		);
		data.questions[question_index].author = {
			author_id: author_data._id,
			display_name: author_data.display_name,
			avatar: author_data.avatar,
		};
		let category = await CategoryService.getById(
			data.questions[question_index].category
		);
		data.questions[question_index].category = {
			category_id: category._id,
			name: category.name,
			color: category.color,
		};
		data.questions[question_index].created_time = data.questions[
			question_index
		].created_time
			.toISOString()
			.split('T')[0];
		data.questions[question_index].updated_time = data.questions[
			question_index
		].updated_time
			.toISOString()
			.split('T')[0];
	}
	return data;
}
function checkObjectId(res, objectId) {
	const isObjectId = mongoose.Types.ObjectId.isValid(objectId);
	if (!isObjectId)
		return res.json(response_format.error('Invalid objectId.'));
}
async function tagNameToId(tagArr) {
	return await Promise.all(
		tagArr.map(async (element, index) => {
			tagArr[index] = element
				.toUpperCase()
				.replace()
				.replace(/  +/g, ' ');
			let current_tag = await TagService.getByName({
				name: tagArr[index],
			});
			if (current_tag) {
				return current_tag._id;
			} else {
				let new_tag = await TagService.create({
					name: tagArr[index],
				});
				return new_tag._id;
			}
		})
	);
}
