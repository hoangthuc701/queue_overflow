require('dotenv').config();
const jwt = require('jsonwebtoken');

const response_format = require('../util/response_format');
const AnswerService = require('../services/answer');
exports.addNewAnswer = async (req, res) => {
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
	let answer = {
		content: req.body.content,
		author: author,
		question: req.params.question_id,
	};
	try {
		let new_answer = await AnswerService.create(answer);
		if (new_answer) {
			return res.json(
				response_format.success('Add new answer succeed.', {
					_id: answer._id,
				})
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
