require('dotenv').config();

const response_format = require('../util/response_format');
const AnswerService = require('../services/answer');
const UserService = require('../services/user');
const QuestionService = require('../services/question');
const {verifyUser} = require ('../util/auth');
exports.addNewAnswer = async (req, res) => {
	let author;
	let user = req.res.user;
	author = user._id;
	let answer = {
		content: req.body.content,
		author: author,
		question: req.params.question_id,
	};
	try {
		let new_answer = await AnswerService.create(answer);
		if (new_answer) {
			let author_data = await UserService.getUserById(new_answer.author);
			new_answer.author = {
				author_id: author_data._id,
				name: author_data.display_name,
				avatar: author_data.avatar,
			};
			new_answer.rating_detail.totalLike =
				new_answer.rating_detail.like_users.length;
			new_answer.rating_detail.totalDislike =
				new_answer.rating_detail.dislike_users.length;
			let question = await QuestionService.getById(new_answer.question);
			if (!question.best_answer) new_answer.isBestAnswer = false;
			else {
				if (
					new_answer._id.toString() == question.best_answer.toString()
				)
					new_answer.isBestAnswer = true;
				else new_answer.isBestAnswer = false;
			}
			if (user) {
				new_answer.vote = 'none';
				let like_index;
				for (
					like_index = 0;
					like_index < new_answer.rating_detail.like_users.length;
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
					like_index < new_answer.rating_detail.dislike_users.length;
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
	let user = req.res.user;
	try {
		let answer = await AnswerService.likeAnswer(
			req.body.answer_id,
			user._id,
			req.body.type
		);
		if (!answer)
			return res.json(response_format.error('No answer exists.'));
		return res.json(
			response_format.success('Like answer succeed.', answer)
		);
	} catch (error) {
		console.log(error);
		res.status(500).json(response_format.error(error.message));
	}
};
exports.deleteAnswer = async (req, res) => {
	let answer;
	try {
		answer = await AnswerService.getById(req.params.answer_id);
	} catch (error) {
		return res.json(response_format.error('Question does not exist.'));
	}
	if (!answer)
		return res.json(response_format.error('Answer does not exist.'));
	const is_verify = verifyUser(req, res, answer.author.toString());
	if (!is_verify) return;
	try {
		const is_delete = await AnswerService.delete(req.params.answer_id);
		if (is_delete)
			return res.json(
				response_format.success('Delete answer succeed.', answer)
			);
		else return res.json(response_format.error('Delete answer failed.'));
	} catch (error) {
		console.log(error);
		res.status(500).json(response_format.error(error.message));
	}
};
