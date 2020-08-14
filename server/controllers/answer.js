require('dotenv').config();
const jwt = require('jsonwebtoken');

const response_format = require('../util/response_format');
const AnswerService = require('../services/answer');
const UserService = require('../services/user');
exports.addNewAnswer = async (req, res) => {
	let token = req.header('Authorization');
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
	let user = jwt.verify(token, process.env.PRIVATE_KEY);
	author = user._id;
	let answer = {
		content: req.body.content,
		author: author,
		question: req.params.question_id,
	};
	try {
		let new_answer = await AnswerService.create(answer);
		if (new_answer) {
			let author_data = await UserService.getUserById(
				new_answer.author
			);
			new_answer.author = {
				author_id: author_data._id,
				name: author_data.display_name,
				avatar: author_data.avatar,
			};
			new_answer.rating_detail.totalLike =
				new_answer.rating_detail.like_users.length;
			new_answer.rating_detail.totalDislike =
				new_answer.rating_detail.dislike_users.length;
			if (token) {
				new_answer.vote = 'none';
				let like_index;
				for (
					like_index = 0;
					like_index <
					new_answer.rating_detail.like_users.length;
					like_index++
				) {
					if (
						new_answer.rating_detail.like_users[
							like_index
						].toString() === user._id
					) {
						new_answer.vote = 'like';
						break;
					}
				}
				for (
					like_index = 0;
					like_index <
					new_answer.rating_detail.dislike_users.length;
					like_index++
				) {
					if (
						new_answer.rating_detail.dislike_users[
							like_index
						].toString() === user._id
					) {
						new_answer.vote = 'dislike';
						break;
					}
				}
			} else new_answer.vote = 'none';
			return res.json(
				response_format.success('Add new answer succeed.', new_answer)
			);
		} else {
			return res.json(response_format.error('Add new answer failed'));
		}
	} catch (error) {
		res.status(500).json(
			response_format.error('Oh no, something went wrong.')
		);
	}
};
exports.likeAnswer = async (req, res) => {
	let token = req.header('Authorization');
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
	try {
		let answer = await AnswerService.likeAnswer(req.body.answer_id, user._id, req.body.type);
		if (!answer) return res.json(
			response_format.error('No answer exists.')
		);
		return res.json(
			response_format.success('Like answer succeed.', answer)
		);
	} catch (error) {
		console.log(error);
		res.status(500).json(
			response_format.error(error.message)
		);
	}
};
exports.deleteAnswer = async (req, res) => {
	let token = req.header('Authorization');
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
	let answer;
	try {
		answer = await AnswerService.getById(req.params.answer_id);
	} catch (error) {
		return res.json(response_format.error('Question does not exist.'));
	}
	if (!answer)
		return res.json(response_format.error('Answer does not exist.'));
	if (user._id != answer.author.toString()) {
		return res.json(
			response_format.error(
				'User does not have rights to delete this answer.'
			)
		);
	}
	try {
		const is_delete = await AnswerService.delete(req.params.answer_id);
		if (is_delete)
			return res.json(
				response_format.success('Delete answer succeed.', answer)
			);
		else return res.json(
			response_format.error('Delete answer failed.')
		);
	} catch (error) {
		console.log(error);
		res.status(500).json(
			response_format.error(error.message)
		);
	}
};
